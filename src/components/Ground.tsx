import textures from "../utils/loadTextures";
import { usePlane } from "@react-three/cannon";
import { Mesh } from "three";
import { ThreeEvent } from "@react-three/fiber";

export const Ground = ({ addCube }: { addCube: Function }) => {
  const [ref] = usePlane<Mesh>(() => {
    return {
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -0.5, 0],
    };
  });
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    const [x, y, z] = Object.values(e.point).map((value) => Math.ceil(value));
    addCube(x, y, z);
  };
  return (
    <mesh ref={ref} onClick={handleClick}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={textures.groundTexture} />
    </mesh>
  );
};
