import Handler from "../engine/Handler"
import RenderManager from "../engine/RenderManager";
import SceneManager from "../engine/Scene";
import CameraManager from "../utils/CameraUtils";
import PlaygroundConfig from "./PlaygroundConfig";

export default class PlaygroundHandler extends Handler {

	constructor() {
		//Config
		const config = new PlaygroundConfig();
		super();

		//Render
		const render = new RenderManager(config.renderer);
		render.name = "PlaygroundRender"

		//Camera 
		const camera = new CameraManager(config.camera, render.getSize())

		const scene = new SceneManager();

		this.add('camera', camera.camera)
		this.add('render', render)
		this.add('renderer', render.renderer)
		this.add('scene',scene.scene)
	}

}
