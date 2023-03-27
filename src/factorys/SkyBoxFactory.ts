import * as THREE from "three"

export default class SkyBoxFactory {
	mesh;

	constructor() {
		const skyboxGeo = new THREE.BoxGeometry(10, 10, 10);
		this.mesh = new THREE.Mesh(skyboxGeo);
		this.mesh.name = "sky"
	}

	animate(){
		this.mesh.rotation.x += 0.005
		this.mesh.rotation.y += 0.005
	}
}


