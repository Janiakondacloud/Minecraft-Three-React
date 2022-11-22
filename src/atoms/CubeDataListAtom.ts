import {atom} from "recoil";
import {nanoid} from "nanoid";
import textures from '../utils/loadTextures'
import {ICubeData} from "../interface/CubeData";

export const CubeDataListAtom = atom({
    key: 'CubeDataListAtom',
    default: [
    ] as ICubeData[]
})