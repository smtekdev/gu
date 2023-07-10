import React, { Suspense, useState, useRef } from 'react';
import { Ground } from './Ground';
import { useThree, Canvas } from '@react-three/fiber';
import './style.css';
import { OrbitControls, PerspectiveCamera, useGLTF, Environment } from '@react-three/drei';
import { Box } from '@react-three/drei';
import { useEffect } from 'react';

function CarShow() {
  const [guitHovered, setGuitHovered] = useState(false);
  const [woodHovered, setWoodHovered] = useState(false);
  const [electricHovered, setElectricHovered] = useState(false);
  const guit = useGLTF('./Guitar-Case.glb');
  const wood = useGLTF('./wooden.glb');
  const electric = useGLTF('./electric.glb');
  const { size } = useThree();
  const aspect = size.width / size.height;
  const cameraRef = useRef();

  useEffect(() => {
    cameraRef.current.aspect = aspect;
    cameraRef.current.updateProjectionMatrix();
  }, [aspect]);

  return (
    <>
      <OrbitControls
        target={[0, 0.35, 0]}
        minAzimuthAngle={-Math.PI / 2}
        maxAzimuthAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2.5}
      />
      <primitive
        object={guit.scene}
        position-z={1}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.0150}
        onPointerOver={() => {
          setGuitHovered(true);
          setWoodHovered(false);
          setElectricHovered(false);
        }}
        onPointerOut={() => {
          setGuitHovered(false);
          setWoodHovered(false);
          setElectricHovered(false);
        }}
      />
      <primitive
        object={wood.scene}
        position-x={-1.6}
        scale={0.5}
        onPointerOver={() => {
          setGuitHovered(false);
          setWoodHovered(true);
          setElectricHovered(true);
        }}
        onPointerOut={() => {
          setGuitHovered(false);
          setWoodHovered(false);
          setElectricHovered(false);
        }}
      />
      <primitive
        object={electric.scene}
        position-x={1.5}
        scale={0.02}
        onPointerOver={() => {
          setGuitHovered(false);
          setWoodHovered(true);
          setElectricHovered(true);
        }}
        onPointerOut={() => {
          setGuitHovered(false);
          setWoodHovered(false);
          setElectricHovered(false);
        }}
      />
      <PerspectiveCamera ref={cameraRef} makeDefault fov={50} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach="background" />
      <Environment preset="city" />
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground />
      <Box
        args={[0.1, 4, 0.9]}
        position={[0.0, 1, -3]}
        rotation-y={Math.PI / 2}
      >
        <meshStandardMaterial color={guitHovered ? '#FFD700' : (woodHovered || electricHovered) ? '#A32CC4' : '#FFD700'} />
      </Box>
      <Box
        args={[0.1, 4, 0.9]}
        position={[1.6, 1, -3]}
        rotation-y={Math.PI / 2}
      >
        <meshStandardMaterial color={woodHovered ? '#A32CC4' : (guitHovered || electricHovered) ? '#FFD700' : '#A32CC4'} />
      </Box>
      <Box
        args={[0.1, 4, 0.9]}
        position={[-1.6, 1, -3]}
        rotation-y={Math.PI / 2}
      >
        <meshStandardMaterial color={electricHovered ? '#A32CC4' : (guitHovered || woodHovered) ? '#FFD700' : '#A32CC4'} />
      </Box>
    </>
  );
}

function App() {
  return (
    <div className="canvas-container">
    <Suspense fallback={null}>
      <Canvas shadows camera={{ position: [3, 2, 5], fov: 50 }} resize={{ scroll: false }}>
        <CarShow />
      </Canvas>
    </Suspense>
    </div>
  );
}

export default App;
