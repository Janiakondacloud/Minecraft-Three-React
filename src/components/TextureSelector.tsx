import {selector, useRecoilState} from "recoil";
import {CubeTextureAtom} from "../atoms/CubeTextureAtom";
import {useKeyboard} from "../hooks/useKeyboard";
import {useEffect} from "react";
import dirtImage from "../images/dirt.jpeg";
import glassImage from "../images/glass.png";
import logImage from "../images/log.jpeg";
import woodImage from "../images/wood.png";
import grassImage from "../images/grass.jpeg";

export const TextureSelector = () => {
    const images = {
        glass: glassImage,
        log: logImage,
        wood: woodImage,
        dirt: dirtImage,
        grass: grassImage,
    };
    const [cubeTexture, setCubeTexture] = useRecoilState(CubeTextureAtom);
    const {dirtTexture, glassTexture, logTexture, woodTexture, grassTexture} =
        useKeyboard();
    useEffect(() => {
        if (dirtTexture) {
            setCubeTexture("dirtTexture");
        } else if (glassTexture) {
            setCubeTexture("glassTexture");
        } else if (logTexture) {
            setCubeTexture("logTexture");
        } else if (woodTexture) {
            setCubeTexture("woodTexture");
        } else if (grassTexture) {
            setCubeTexture("grassTexture");
        }
    }, [dirtTexture, glassTexture, logTexture, woodTexture, grassTexture]);
    return (
        <div className="texture-selector">
            {Object.keys(images).map((k) => {
                return (
                    <img
                        src={images[k as keyof typeof images]}
                        className={cubeTexture.includes(k) ? "is-active" : ""}
                    />
                );
            })}
        </div>
    );
};
