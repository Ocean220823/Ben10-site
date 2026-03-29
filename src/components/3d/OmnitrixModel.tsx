import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';

interface Props {
  hovered: boolean;
  setHovered: (h: boolean) => void;
  clicked: boolean;
  setClicked: (c: boolean) => void;
}

const OmnitrixModel = ({ hovered, setHovered, clicked, setClicked }: Props) => {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);

  const isHomePage = window.location.pathname === "/";
  // Persist audio objects across renders without causing re-renders
  const audioRefs = useRef<{ coreReady: HTMLAudioElement | null, activate: HTMLAudioElement | null, deactivate: HTMLAudioElement | null }>({
    coreReady: null,
    activate: null,
    deactivate: null
  });

  useEffect(() => {
    if (isHomePage) {
      audioRefs.current = {
        coreReady: new Audio("/Audios/core-ready.mp3"),
        activate: new Audio("/Audios/omnitrixActivated.mp3"),
        deactivate: new Audio("/Audios/omnitrixDeactivated.mp3")
      };

      const { coreReady } = audioRefs.current;
      if (coreReady) {
        // Execute immediately since React mount acts as our 'load' phase in SPA
        coreReady.volume = 0.6;
        coreReady.play().catch(() => {});
        
        // Backup listener just in case it mounted before DOM finished parsing natively
        window.addEventListener("load", () => {
          coreReady.play().catch(() => {});
        });
      }
    }

    return () => {
      // Pause tracks gracefully on unmount preventing overlapping memory ghosts
      if (audioRefs.current.coreReady) audioRefs.current.coreReady.pause();
      if (audioRefs.current.activate) audioRefs.current.activate.pause();
      if (audioRefs.current.deactivate) audioRefs.current.deactivate.pause();
    };
  }, [isHomePage]);

  useEffect(() => {
    const loader = new GLTFLoader();
    
    loader.load(
      "/models/omnitrix.glb", 
      (gltf: any) => {
        const loadedModel = gltf.scene;
        console.log("DEBUG: Omnitrix GLB Loaded", loadedModel);
        
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        loadedModel.position.sub(center);
        
        const size = box.getSize(new THREE.Vector3());
        const targetSize = 2.5;
        const scaleFactor = targetSize / Math.max(size.x, size.y, size.z);
        loadedModel.scale.setScalar(scaleFactor);
        
        loadedModel.traverse((child: THREE.Object3D) => {
           if ((child as THREE.Mesh).isMesh) {
               child.castShadow = true;
               child.receiveShadow = true;
           }
        });

        setModel(loadedModel);
      },
      undefined,
      (error: unknown) => {
         console.error("Failed to load GLB model at /models/omnitrix.glb", error);
      }
    );
  }, []);

  useEffect(() => {
    if (!modelRef.current || !model) return;
    
    gsap.killTweensOf(modelRef.current.position);

    if (clicked) {
      gsap.to(modelRef.current.position, { y: 0.8, duration: 0.4, ease: "back.out(1.5)" });
      
      model.traverse((child) => {
         if ((child as THREE.Mesh).isMesh) {
            const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
            if (mat && mat.emissive && (mat.emissive.r > 0 || mat.emissive.g > 0 || mat.emissive.b > 0)) {
               gsap.to(mat, { emissiveIntensity: 6, duration: 0.3 });
            }
         }
      });
    } else {
      gsap.to(modelRef.current.position, { y: 0, duration: 0.4, ease: "power2.in" });
      
      model.traverse((child) => {
         if ((child as THREE.Mesh).isMesh) {
            const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
            if (mat && mat.emissive && (mat.emissive.r > 0 || mat.emissive.g > 0 || mat.emissive.b > 0)) {
               gsap.to(mat, { emissiveIntensity: 1, duration: 0.4 });
            }
         }
      });
    }
  }, [clicked, model]);

  useFrame(() => {
    if (!groupRef.current) return;
    
    if (!hovered && !clicked) {
      groupRef.current.rotation.y += 0.006;
    }
    
    const targetScale = hovered ? 1.05 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    if (!clicked && model) {
      const targetGlow = hovered ? 3 : 1;
      model.traverse((child) => {
         if ((child as THREE.Mesh).isMesh) {
            const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
            if (mat && mat.emissive && (mat.emissive.r > 0 || mat.emissive.g > 0 || mat.emissive.b > 0)) {
               mat.emissiveIntensity += (targetGlow - mat.emissiveIntensity) * 0.1;
            }
         }
      });
    }
  });

  const handleOmnitrixClick = (e: any) => {
    e.stopPropagation();
    
    // Explicit route masking boundary
    if (!isHomePage) {
      setClicked(!clicked);
      return;
    }

    const { activate, deactivate } = audioRefs.current;
    if (activate && deactivate) {
      activate.pause();
      deactivate.pause();

      if (!clicked) { // 'clicked' tracks if the object is currently elevated (so clicking it will ACTIVATE it)
        activate.currentTime = 0;
        activate.play().catch(() => {});
      } else {
        deactivate.currentTime = 0;
        deactivate.play().catch(() => {});
      }
    }

    setClicked(!clicked);
  };

  return (
    <group scale={isHomePage ? 0.85 : 1}>
      <group 
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleOmnitrixClick}
      >
         <group ref={modelRef}>
            {model && <primitive object={model} />}
         </group>
      </group>
    </group>
  );
};

export default OmnitrixModel;
