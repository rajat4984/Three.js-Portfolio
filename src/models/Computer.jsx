import React, { useRef, useEffect } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import computerScene from '../assets/3d/computer.glb';
import { a } from '@react-spring/three';
import { useFrame, useThree } from '@react-three/fiber';

const Computer = ({ isRotating, setIsRotating, ...props }) => {
  const { nodes, materials, animations } = useGLTF(computerScene);
  const computerRef = useRef();
  const { gl, viewport } = useThree();
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  console.log(animations,'animation')

  // const { actions } = useAnimations({ animations, computerRef });
  // console.log(actions,'actions')

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    // console.log(isRotating, 'in pointemove');
    if (isRotating) {
      console.log('Hello');
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;

      computerRef.current.rotation.z += delta * 0.05 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.05 * Math.PI;
    }
  };

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }
      computerRef.current.rotation.z += rotationSpeed.current;
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointermove', handlePointerMove);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  return (
    <a.group {...props} ref={computerRef}>
      <group>
        <group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_Keyboard_0.geometry}
            material={materials.Keyboard}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_Mouse_0.geometry}
            material={materials.Mouse}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_Tower_0.geometry}
            material={materials.Tower}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_Monitor_0.geometry}
            material={materials.Monitor}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_Screen_0.geometry}
            material={materials.Screen}
          />
        </group>
      </group>
    </a.group>
  );
};

export default Computer;
