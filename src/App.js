import React, { Suspense } from 'react';
import { Ground } from './Ground';
import { Canvas } from '@react-three/fiber';
import "./style.css";
import { OrbitControls, PerspectiveCamera, useGLTF, Environment} from '@react-three/drei';
import { Box } from '@react-three/drei';
function CarShow(){
  const guit = useGLTF("./Guitar-Case.glb");
  const wood = useGLTF("./wooden.glb");
  const electric = useGLTF("./electric.glb");
  return(
    <>
    <OrbitControls target={[0, 0.35, 0]}  
            minAzimuthAngle={-Math.PI / 2} // Restrict rotation to -90 degrees (left) to 90 degrees (right)
            maxAzimuthAngle={Math.PI / 2} // Restrict rotation to -90 degrees (left) to 90 degrees (right)
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2.5}
    />
    <primitive object={guit.scene} position-z={1} rotation={[0, Math.PI / 2, 0]} scale={0.0150} />
    <primitive object={wood.scene} position-x={-1.6}  scale={0.5} />
    <primitive object={electric.scene} position-x={1.5} scale={0.02} />
    <PerspectiveCamera makeDefault fov={50} position={[3,2,5]} />
    <color args={[0, 0, 0]} attach="background" />
    <Environment preset={"city"} />
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
       <Box args={[0.1, 4, 0.9]} position={[0.0, 1, -3]} rotation-y={Math.PI / 2}>
        <meshStandardMaterial color="#FFD700" />
      </Box>
      <Box args={[0.1, 4, 0.9]} position={[1.6, 1, -3]} rotation-y={Math.PI / 2}>
        <meshStandardMaterial color="#A32CC4" />
      </Box>
      <Box args={[0.1, 4, 0.9]} position={[-1.6, 1, -3]} rotation-y={Math.PI / 2}>
        <meshStandardMaterial color="#A32CC4" />
      </Box>
    </>
  )
}
function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;