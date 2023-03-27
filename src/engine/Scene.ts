import * as THREE from "three"

export default class SceneManager {
	scene;
	constructor(
	) {
		this.scene = new THREE.Scene;
		this.scene.background = new THREE.Color('black')
	}

}
