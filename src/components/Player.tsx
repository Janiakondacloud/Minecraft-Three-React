import {useSphere} from "@react-three/cannon";
import {Mesh, Vector3} from "three";
import {useEffect, useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import {useKeyboard} from "../hooks/useKeyboard";
const SPEED = 5
const JUMP_FORCE = 3
export const Player = () => {
    const actions = useKeyboard();
    const {camera} = useThree()
    const [ref, api] = useSphere<Mesh>(() => {
        return {
            mass: 1,
            type: 'Dynamic',
            position: [0, 3, 0]
        }
    })
    const pos = useRef([0, 0, 0])
    useEffect(() => {
        api.position.subscribe(position => {
            pos.current = position
        })
    }, [])
    //各方向上的速度
    const vel = useRef([0, 0, 0])
    useEffect(() => {
        api.velocity.subscribe(velocity => {
            vel.current = velocity
        })
    }, [])
    useFrame(() => {
        //camera
        camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]))

        //directions
        //x 1 right
        //x -1 left
        //z 1 back
        //z -1 front
        const frontDirection = new Vector3(0,0,0)
        if(actions.moveForward){
            frontDirection.setZ(-1)
        }else if (actions.moveBackward){
            frontDirection.setZ(1)
        }
        const sideDirection = new Vector3(0,0,0)
        if(actions.moveRight){
            sideDirection.setX(1)
        }else if(actions.moveLeft){
            sideDirection.setX(-1)
        }
        const finalDirection = new Vector3()
        //vectorA add vectorB
        finalDirection.addVectors(frontDirection,sideDirection)
        //vectors multiply number
        finalDirection.multiplyScalar(SPEED)
        //let the direction rotates by the camera rotate vector
        finalDirection.applyEuler(camera.rotation)
        api.velocity.set(finalDirection.x,vel.current[1],finalDirection.z)
        //jump
        if (actions.jump && Math.abs(vel.current[1]) < 0.01) {
            api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2])
        }
    })
    return (
        <mesh ref={ref}></mesh>
    )

}