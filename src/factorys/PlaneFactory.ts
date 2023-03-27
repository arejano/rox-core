import * as THREE from "three"

export default class PlaneFactory {
	mesh;

	constructor() {
		const planeSize = 20;
		const loader = new THREE.TextureLoader();
		const texture = loader.load('../assets/checker.png');
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;
		const repeats = planeSize / 2;
		texture.repeat.set(repeats, repeats);

		const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
		const planeMat = new THREE.MeshPhongMaterial({
			map: texture,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(planeGeo, planeMat);
		this.mesh.rotation.x = Math.PI * -.5;
	}
}
