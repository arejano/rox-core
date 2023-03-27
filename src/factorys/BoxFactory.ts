import * as THREE from "three"

export default class BoxFactory {
	mesh;
	constructor() {
		const boxWidth = 1;
		const boxHeight = 1;
		const boxDepth = 1;

		const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
		const material = new THREE.MeshPhongMaterial({ color: '#8AC' });

		this.mesh = new THREE.Mesh(geometry, material)
		this.mesh.position.set(0, 0, 0)
	}
}
