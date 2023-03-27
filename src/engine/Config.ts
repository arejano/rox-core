import { CameraConfigType } from "../types/CameraConfigType";
import { ConfigModel } from "../types/ConfigModel";
import { EngineConfig } from "../types/EngineConfig";
import { MeasureConfigType } from "../types/MeasureConfigType";
import { NetworkingConfigType } from "../types/NetworkingConfigType";
import { RendererConfig } from "../types/RendererConfig";
import { ShadowConfigType } from "../types/ShadowConfigType";
import { UiConfigType } from "../types/UiConfigType";
import { WindowConfig } from "../types/WindowConfig";

export default class Config {
	engine: EngineConfig = {
		debug: false,
		fixedFPS: 60,
	};
	camera: CameraConfigType;
	fade?: FadeConfigType;
	measures?:MeasureConfigType;
	modifiers?: ModifiersConfigType;
	networking?: NetworkingConfigType;
	recorder?: RecorderConfigType;
	renderer: RendererConfig;
	shadow: ShadowConfigType;
	ui?: UiConfigType;
	window: WindowConfig;

	constructor(
		window: WindowConfig,
		renderer: RendererConfig,
		shadow: ShadowConfigType,
		camera: CameraConfigType,
	) {
		this.window = window;
		this.renderer = renderer;
		this.shadow = shadow;
		this.camera = camera;
	}

	get() {
	}
}
