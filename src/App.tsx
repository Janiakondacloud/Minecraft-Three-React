import './App.css'
import {Canvas, ThreeEvent} from "@react-three/fiber";
import {PointerLockControls, Sky} from "@react-three/drei";
import {Physics} from "@react-three/cannon";
import {useRecoilState} from "recoil";


import {Ground} from "./components/Ground";
import {Player} from "./components/Player";
import {Cube} from "./components/Cube";
import {Menu} from "./components/Menu";
import {CubeDataListAtom} from "./atoms/CubeDataListAtom";
import {ICubeData} from "./interface/CubeData";
import {nanoid} from "nanoid";
import {CubeTextureAtom} from "./atoms/CubeTextureAtom";
import {TextureSelector} from "./components/TextureSelector";



function App() {
    const [cubeDataList, setCubeDataList] = useRecoilState(CubeDataListAtom)
    const [cubeTexture, setCubeTexture] = useRecoilState(CubeTextureAtom)
    const addCube = (x: number, y: number, z: number) => {
        const newCube: ICubeData =
            {
                id: nanoid(),
                position: [x, y, z],
                textureName: cubeTexture
            }
        setCubeDataList(cubeDataList.concat(newCube))
    }
    return (
        <>
            <Canvas>
                <Sky/>
                <ambientLight intensity={0.5}/>
                <PointerLockControls/>
                <Physics>
                    <Player/>
                    {cubeDataList.map(cubeData => (
                        <Cube addCube={addCube} key={cubeData.id} position={cubeData.position} textureName={cubeData.textureName}/>
                    ))}
                    <Ground addCube={addCube}/>
                </Physics>
            </Canvas>
            <div className="center">+</div>
            <TextureSelector/>
            <Menu/>
        </>
    )
}

export default App
