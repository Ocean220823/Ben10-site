import { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from '@react-three/drei';

interface MeshProps {
  modelPath: string;
  hovered: boolean;
}

const VariantParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesData = useMemo(() => {
    const particleCount = 80;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 4;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
        pos.array[i * 3 + 1] += Math.sin(Date.now() * 0.001 + i) * 0.002;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          args={[particlesData, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color={0x00ff88} size={0.05} transparent opacity={0.8} />
    </points>
  );
};

const VariantMesh = ({ modelPath, hovered }: MeshProps) => {
  // @ts-ignore
  const gltf = useLoader(GLTFLoader, modelPath);
  const rootRef = useRef<THREE.Group>(null);
  const pivotRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  const clonedScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useEffect(() => {
    if (!clonedScene || !pivotRef.current) return;
    
    // 1. Calculate native geometry bounds
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // 2. Correct model position relative to true center (PIVOT PATTERN)
    clonedScene.position.set(-center.x, -center.y, -center.z);

    // 3. Normalize scale solely on the dedicated pivot
    const originalMaxDim = Math.max(size.x, size.y, size.z);
    const normalizedMaxDim = 2.2; 
    const scale = normalizedMaxDim / originalMaxDim;
    pivotRef.current.scale.setScalar(scale);

    // Force Visibility Fix
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.visible = true;
        child.frustumCulled = false;
      }
    });

    // Camera safety fix
    const distance = normalizedMaxDim * 2.5;
    camera.position.set(0, normalizedMaxDim * 0.8, distance);
    camera.lookAt(0, 0, 0);

  }, [clonedScene, camera]);

  // Handle prop-based hover targeting strictly the root container
  useEffect(() => {
    if (!rootRef.current) return;
    
    if (hovered) {
      gsap.to(rootRef.current.scale, {
        x: 1.1, y: 1.1, z: 1.1,
        duration: 0.3, ease: "power2.out"
      });
      clonedScene.traverse((child: any) => {
        if (child.isMesh && child.material && child.material.emissive && child.material.emissive.getHex() !== 0x000000) {
          if (child.userData.originalEmissiveIntensity === undefined) {
             child.userData.originalEmissiveIntensity = child.material.emissiveIntensity || 1;
          }
           gsap.to(child.material, {
            emissiveIntensity: child.userData.originalEmissiveIntensity * 3,
            duration: 0.3
          });
        }
      });
    } else {
      gsap.to(rootRef.current.scale, {
        x: 1.0, y: 1.0, z: 1.0,
        duration: 0.3, ease: "power2.out"
      });
      clonedScene.traverse((child: any) => {
        if (child.isMesh && child.material && child.userData.originalEmissiveIntensity !== undefined) {
          gsap.to(child.material, {
            emissiveIntensity: child.userData.originalEmissiveIntensity,
            duration: 0.3
          });
        }
      });
    }
  }, [hovered, clonedScene]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    const startY = rootRef.current!.position.y;
    gsap.timeline()
      .to(rootRef.current!.position, {
        y: startY + 0.3, duration: 0.15, ease: "power2.out"
      })
      .to(rootRef.current!.position, {
        y: startY, duration: 0.3, ease: "bounce.out"
      });
      
    clonedScene.traverse((child: any) => {
      if (child.isMesh && child.material && child.material.emissive && child.material.emissive.getHex() !== 0x000000) {
        const base = child.userData.originalEmissiveIntensity || 1;
        gsap.timeline()
          .to(child.material, { emissiveIntensity: base * 8, duration: 0.1 })
          .to(child.material, { emissiveIntensity: base * (hovered ? 3 : 1), duration: 0.4 });
      }
    });
  };

  return (
    <group ref={rootRef} onClick={handleClick}>
      <group ref={pivotRef}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
};

export default function OmnitrixVariantCanvas({ modelPath }: { modelPath: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="w-full h-full absolute inset-0 z-0 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 1.2, 3], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={1.5} color="#ffffff" />
        <pointLight position={[2, 2, 2]} intensity={4} color="#00ff00" />
        
        <Suspense fallback={null}>
          <VariantMesh modelPath={modelPath} hovered={hovered} />
        </Suspense>

        <VariantParticles />
        
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05}
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={hovered ? 4 : 2}
        />
      </Canvas>
    </div>
  );
}
