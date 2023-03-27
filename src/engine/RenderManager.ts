import * as THREE from "three"
import { Scene } from "three";
import { RendererConfig } from "../types/RendererConfig";
import { RenderSizeModel } from "../types/RenderSizeModel";

export default class RenderManager {
	renderer: any;
	constructor(
		renderConfig: RendererConfig,
		// uiConfig: UiConfigType,
	) {
		this.renderer = new THREE.WebGLRenderer(renderConfig);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor(renderConfig.clearColor)

		this.appendDom();
	}

	setRendererSize(size: RenderSizeModel) {
		this.renderer.setSize(size.width, size.height)
	}
	getSize() {
		return {
			width: 100,
			height: 100,
		}
	}

	appendDom() {
		document.body.appendChild(this.renderer.domElement)
	}

	public render(tpf: any, scene: Scene, camera: any) {
		this.renderer.render(scene,camera)
	}
}
