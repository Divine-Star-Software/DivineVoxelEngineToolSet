import { ParticleSystemData } from "./particles.js";

export const CreateScene = () => {
  const canvas = document.createElement("canvas");
  canvas.id = "renderCanvas";
  document.body.append(canvas);

  const engine = new BABYLON.Engine(canvas, false, {});
  //engine.setSize(1920, 1080);
  const scene = new BABYLON.Scene(engine);

  const light = new BABYLON.HemisphericLight(
    "",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  const camera = new BABYLON.FreeCamera("main", BABYLON.Vector3.Zero(), scene);
  camera.position.x = 0;
  camera.position.z = 0.1;
  camera.position.y = 0;

  camera.setTarget(BABYLON.Vector3.Zero());
  scene.activeCamera = camera;

  camera.attachControl(canvas, true);

  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0.5);

  const particleSystem = BABYLON.ParticleSystem.Parse(
    ParticleSystemData,
    scene,
    ""
  );
  particleSystem.emitter = new BABYLON.Vector3(0, 40, 20);
  const particleSystem2 = BABYLON.ParticleSystem.Parse(
    ParticleSystemData,
    scene,
    ""
  );
  particleSystem2.emitter = new BABYLON.Vector3(0, -20, -20);

  const updateSystem = (particleSystem: any) => {
    particleSystem.color1.r = Math.random();
    particleSystem.color1.g = Math.random();
    particleSystem.color1.b = Math.random();

    particleSystem.color2.r = Math.random();
    particleSystem.color2.g = Math.random();
    particleSystem.color2.b = Math.random();

    particleSystem.colorDead.r = Math.random();
    particleSystem.colorDead.g = Math.random();
    particleSystem.colorDead.b = Math.random();

    particleSystem.direction1.x = Math.random();
    particleSystem.direction1.y = Math.random();
    particleSystem.direction1.z = Math.random();

    particleSystem.direction2.x = Math.random();
    particleSystem.direction2.y = Math.random();
    particleSystem.direction2.z = Math.random();
  };
  setInterval(() => {
    updateSystem(particleSystem);
    updateSystem(particleSystem2);
  }, 500);
  particleSystem.isLocal = true;
  particleSystem.emitter = new BABYLON.Vector3(0, 0, -100);
  engine.runRenderLoop(() => {
    let t = performance.now();
    camera.rotation.z += 0.001;
    camera.rotation.x += 0.001;
    camera.rotation.y += 0.005;

    scene.render();
  });
};
