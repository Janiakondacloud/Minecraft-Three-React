import { NearestFilter, RepeatWrapping, TextureLoader } from "three";
import grassImage from "../images/grass.jpeg";
import dirtImage from "../images/dirt.jpeg";
import glassImage from "../images/glass.png";
import logImage from "../images/log.jpeg";
import woodImage from "../images/wood.png";
//the plane texture
const groundTexture = new TextureLoader().load(grassImage);
const grassTexture = new TextureLoader().load(grassImage);
groundTexture.magFilter = NearestFilter;
groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;
groundTexture.repeat.set(100, 100);
//the cube texture
const dirtTexture = new TextureLoader().load(dirtImage);
const glassTexture = new TextureLoader().load(glassImage);
const logTexture = new TextureLoader().load(logImage);
const woodTexture = new TextureLoader().load(woodImage);

dirtTexture.magFilter = NearestFilter;
glassTexture.magFilter = NearestFilter;
logTexture.magFilter = NearestFilter;
woodTexture.magFilter = NearestFilter;
export default {
  groundTexture,
  dirtTexture,
  glassTexture,
  logTexture,
  woodTexture,
  grassTexture,
};
