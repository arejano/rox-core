import * as THREE from "three"
import { CameraType } from "../enums/CameraType"
import { CameraConfigType } from "../types/CameraConfigType";
import { RenderSizeModel } from "../types/RenderSizeModel";


export default class CameraManager{
	camera:any;
	constructor(
		config:CameraConfigType,
		renderSize:RenderSizeModel
	) {

		if (config.type == CameraType.Perspective) {
			this.camera = new THREE.PerspectiveCamera(
				config.fov,
				renderSize.width / renderSize.height,
				config.near,
				config.far
			)
		}
		if (config.type == CameraType.Orthographic) {
			let mod = config.fov
			this.camera = new THREE.OrthographicCamera(
				renderSize.width / - mod,
				renderSize.width / mod,
				renderSize.height / mod,
				renderSize.height / - mod,
				config.near,
				config.far
			)
		}

		this.camera.position.set(0,10,20)
	}
}
