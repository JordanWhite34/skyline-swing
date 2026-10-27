import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/loaders/GLTFLoader.js';
import { clone as cloneSkeleton } from 'https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/utils/SkeletonUtils.js';

const loader = new GLTFLoader();
for (const kind of ['sedan', 'taxi', 'van', 'firetruck']) {
  loader.load(`assets/kenney-cars/${kind}.glb`, gltf => {
    window.installCityVehicle?.(kind, gltf.scene);
  }, undefined, error => console.warn(`City vehicle ${kind} could not be loaded:`, error));
}
loader.load('assets/kenney-roads/light-curved.glb', gltf => {
  window.installStreetLamp?.(gltf.scene);
}, undefined, error => console.warn('Street lamp could not be loaded:', error));
loader.load('assets/kenney-roads/traffic-light.glb', gltf => {
  window.installTrafficLights?.(gltf.scene);
}, undefined, error => console.warn('Traffic signal could not be loaded:', error));
loader.load('assets/gobkit/corgi.glb', gltf => {
  window.installDogModel?.(gltf.scene, gltf.animations, cloneSkeleton);
}, undefined, error => console.warn('Dog model could not be loaded:', error));

for (const [variant, name] of ['building-type-a', 'building-type-b', 'building-type-c'].entries()) {
  loader.load(`assets/kenney-suburbs/${name}.glb`, gltf => {
    window.installSuburbModel?.(variant, gltf.scene);
  }, undefined, error => console.warn(`Suburban model ${name} could not be loaded:`, error));
}
