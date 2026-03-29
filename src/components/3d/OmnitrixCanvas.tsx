import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import OmnitrixModel from './OmnitrixModel';

interface Props {
  clicked: boolean;
  setClicked: (c: boolean) => void;
}

const OmnitrixCanvas = ({ clicked, setClicked }: Props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 1.5, 4], fov: 45 }} 
        gl={{ alpha: true, antialias: true }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
      >
        {/* Soft white ambient light */}
        <ambientLight intensity={1} color="#ffffff" />
        {/* Green tint point light to enhance glow */}
        <pointLight position={[2, 2, 2]} intensity={3} color="#00ff00" />
        
        <Environment preset="city" />
        
        {/* Swirling energy particles */}
        <Sparkles count={clicked ? 200 : 40} scale={10} size={clicked ? 12 : 4} speed={clicked ? 1.5 : 0.2} opacity={0.6} color="#00FF00" />
        
        <Float speed={hovered ? 2 : 1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <OmnitrixModel hovered={hovered} setHovered={setHovered} clicked={clicked} setClicked={setClicked} />
        </Float>
        
        <ContactShadows position={[0, -3, 0]} opacity={0.8} scale={15} blur={2.5} far={5} color={clicked ? "#00FF00" : "#000000"} />
        
        <EffectComposer>
           <Bloom luminanceThreshold={1} mipmapBlur intensity={1.2} />
        </EffectComposer>

        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          autoRotate={!hovered && !clicked}
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
};

export default OmnitrixCanvas;
