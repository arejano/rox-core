
import * as THREE from "three"

export default class SphereFactory{
	mesh;

	constructor() {
		const sphereRadius = 3;
		const sphereWidthDivisions = 32;
		const sphereHeightDivisions = 16;
		const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
		const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
		this.mesh = new THREE.Mesh(sphereGeo, sphereMat);
		this.mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
	}
}


