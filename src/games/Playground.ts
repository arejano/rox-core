import Engine from "../engine/Engine";
import BoxFactory from "../factorys/BoxFactory";
import PlaygroundHandler from "./PlaygroundHandler";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as THREE from "three"
import LighFactory from "../factorys/LightFactory";
import SphereFactory from "../factorys/SphereFactory";
import SkyBoxFactory from "../factorys/SkyBoxFactory";
import PlaneFactory from "../factorys/PlaneFactory";

import SceneObjectSystem from "../systems/SceneObjectSystem";
import ECS from "../ecs/ECS";
import LogSystem from "../systems/LogSystem";
import PlayerFactorySystem from "../systems/PlayerFactorySystem";
import CubeEntity from "../entities/CubeEntity";

export default class Playground extends Engine {
	handler = new PlaygroundHandler();
	renderer: any;
	renderManager: any;
	camera: any;
	scene: any;
	controls: any;
	world: any;

	delta:number = 0;
	clock = new THREE.Clock();

	constructor() {
		super();
		console.log(this.clock)
	}

	start() {
		this.running = true;
		this.renderManager = this.handler.data['render'];
		this.renderer = this.handler.data['renderer']
		this.camera = this.handler.data['camera'];
		this.scene = this.handler.data['scene']

		console.log(this.renderManager)

		this.world = new ECS([
			new SceneObjectSystem(this.scene),
			new LogSystem(),
			new PlayerFactorySystem()
		])

		this.world.addEntity(new CubeEntity({
			width: 10,
			height: 10,
			depth: 10
		}, "#000FFF"));


		this.world.addEntity(new CubeEntity({
			width: 10,
			height: 10,
			depth: 10
		}, "#000FFF"));

		this.controls = new OrbitControls(this.camera, this.renderer.domElement)

		this.scene.add(new BoxFactory().mesh)

		const cubeSize = 2;
		const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
		const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
		const mesh2 = new THREE.Mesh(cubeGeo, cubeMat);
		mesh2.position.set(cubeSize + 1, cubeSize / 2, 0);
		this.scene.add(mesh2);

		//Sphere
		{
			this.scene.add(new SphereFactory().mesh)
		}

		//Light
		{
			const light = new LighFactory();
			this.scene.add(light.light);
			this.scene.add(light.light.target);
		}


		//SkyBox
		{
			// this.scene.add(new SkyBoxFactory().mesh)
		}

		//Plane
		{
			this.scene.add(new PlaneFactory().mesh)
		}

		setTimeout(() => {
			// this.running = false;
		}, 3600)
		this.tick()
	}

	tick() {
		if (this.running) {
			requestAnimationFrame(this.tick)
			this.delta += this.clock.getDelta();
			if (this.delta > (1 / 60)) {
				this.controls.update();
				this.world.update();
				this.renderManager.render(this.getTimePerFrame(), this.scene, this.camera);
			}
		}
	}

	private getTimePerFrame() {
		const now = new Date().getTime()
		const tpf = (now - (this.time || now)) / 1000
		this.time = now;
		this.uptime += tpf;
		return tpf
	}
}
