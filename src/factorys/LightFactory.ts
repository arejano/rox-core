
import * as THREE from "three"

export default class LighFactory {
	color;
	intensity;
	light;

	constructor() {
		this.color = 0xFFFFFF;
		this.intensity = 1;

		this.light = new THREE.DirectionalLight(this.color, this.intensity);

		this.light.position.set(0, 10, 0)
		this.light.target.position.set(-5, 0, 0);
	}
}
