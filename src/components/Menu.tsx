import {useRecoilState} from "recoil";
import {CubeDataListAtom} from "../atoms/CubeDataListAtom";
import {useEffect} from "react";

export const Menu = () => {
    const [cubeDataList, setCubeDataList] = useRecoilState(CubeDataListAtom)
    const handleSaveBtnClick = () => {
        localStorage.setItem('cubeDataList', JSON.stringify(cubeDataList))
    }
    const handleResetBtnClick = () => {
        setCubeDataList([])
    }
    useEffect(() => {
        let cubeDataListString = localStorage.getItem('cubeDataList')
        if (!cubeDataListString) {
            cubeDataListString = '[]'
        }
        setCubeDataList(JSON.parse(cubeDataListString))
    }, [])
    return (
        <div className="menu-btn">
            <button onClick={handleSaveBtnClick}>Save</button>
            <button onClick={handleResetBtnClick}>Reset</button>
        </div>
    )
}