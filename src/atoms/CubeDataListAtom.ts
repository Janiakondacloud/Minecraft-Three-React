import {atom} from "recoil";
import {ICubeData} from "../interface/CubeData";

export const CubeDataListAtom = atom({
    key: 'CubeDataListAtom',
    default: [
    ] as ICubeData[]
})