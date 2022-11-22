import { useBox } from "@react-three/cannon";
import { Mesh, Texture } from "three";
import textures from "../utils/loadTextures";
import { ThreeEvent } from "@react-three/fiber";
import { useRecoilState } from "recoil";
import { CubeDataListAtom } from "../atoms/CubeDataListAtom";
import { useEffect, useState } from "react";

export const Cube = ({
  position,
  textureName,
  addCube,
}: {
  position: [x: number, y: number, z: number];
  textureName: string;
  addCube: Function;
}) => {
  const [hoverFlag, setHoverFlag] = useState(false);
  const [ref] = useBox<Mesh>(() => {
    return {
      type: "Static",
      position,
    };
  });
  const [cubeDataList, setCubeDataList] = useRecoilState(CubeDataListAtom);
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!e.faceIndex) {
      return;
    }
    //一个正方形由6个面 12个三角形组成 这里的faceIndex是三角形的index
    const cubeFaceIndex = Math.floor(e.faceIndex / 2);
    const [x, y, z] = Object.values(ref.current!.position);
    if (e.nativeEvent.altKey) {
      const newCubeDataList = cubeDataList.filter((cubeData) => {
        const [cubeDataX, cubeDataY, cubeDataZ] = cubeData.position;
        return cubeDataX !== x || cubeDataY !== y || cubeDataZ !== z;
      });
      setCubeDataList(newCubeDataList);
      return;
    }
    if (cubeFaceIndex == 0) {
      addCube(x + 1, y, z);
      return;
    }
    if (cubeFaceIndex == 1) {
      addCube(x - 1, y, z);
      return;
    }
    if (cubeFaceIndex == 2) {
      addCube(x, y + 1, z);
      return;
    }
    if (cubeFaceIndex == 3) {
      addCube(x, y - 1, z);
      return;
    }
    if (cubeFaceIndex == 4) {
      addCube(x, y, z + 1);
      return;
    }
    if (cubeFaceIndex == 5) {
      addCube(x, y, z - 1);
      return;
    }
  };
  const texture = textures[textureName as keyof typeof textures];

  return (
    <mesh
      ref={ref}
      onClick={handleClick}
      onPointerMove={(e) => {
        e.stopPropagation();
        setHoverFlag(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHoverFlag(false);
      }}
    >
      <boxGeometry />
      <meshStandardMaterial
        opacity={textureName === "glassTexture" ? 0.7 : 1}
        transparent={true}
        map={texture}
        color={hoverFlag ? "gray" : "white"}
      />
    </mesh>
  );
};
