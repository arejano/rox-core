import Config from "../engine/Config";
import { CameraType } from "../enums/CameraType";
import { CameraConfigType } from "../types/CameraConfigType";
import { ConfigModel } from "../types/ConfigModel";
import { RendererConfig } from "../types/RendererConfig";
import { ShadowConfigType, ShadowDetails } from "../types/ShadowConfigType";
import { WindowConfig } from "../types/WindowConfig"

export default class PlaygroundConfig extends Config {
	constructor() {
		const window: WindowConfig = {
			resize: true,
			contextMenu: false,
			prventDefaultMouseEvents: true,
			showStatsOnStart: false
		}
		const renderer: RendererConfig = {
			domElementId: 'rox-core',
			sortObjects: true,
			antialias: true,
			logarithmicDepthBuffer: true,
			alpha: true,
			clearAlpha: 1,
			clearColor: 0x000000
		}
		const shadow: ShadowConfigType = {
			details: ShadowDetails.Low
		}
		const camera: CameraConfigType = {
			// Default camera type
			type: CameraType.Perspective,
			validCameraTypes: [CameraType.Perspective, CameraType.Orthographic],
			// Default camera field of view
			fov: 45,
			// Default camera near
			near: 0.1,
			// Default camera far
			far: 500,
			aspect: 2,
		}
		const fade = {
			// Scene transition fade color
			color: 'black',

			// Scene transition fade duration
			duration: 1000
		}
		const modifiers = {
			// Default modifier duration
			duration: 1000
		}
		const networking = {
			// the name of the query param used to get the roomName for MeshNetwork
			roomQueryParamName: 'room'
		}
		const ui = {
			// Order in which html elements are layered
			zIndex: {
				noWebGL: 1000000,
				dom: 10000,
				video: 10100,
				fade: 20000,
				orientation: 30000,
				stats: 100000,
				console: 200000
			},
			video: {
				// used internaly to hold the video container element
				containerKey: 'vrum.video.container',

				// used internally to lock one video at a time
				pendingRemovalKey: 'vrum.video.pendingRemoval',

				supportedFormats: ['mp4', 'ogg', 'ogv'],
			},
			addsScene: {
				// if the AddsScene is skippable by default
				skippable: true,

				// distance to center of the screen, where the panels are located
				cameraDistanceZ: 15,

				// how much the images are scaled, 1 img pixel to 1 three.js unit
				scaleFactor: 0.01,

				// the total time the item is displayed, including fade duration
				itemDisplayDurationSeconds: 5,

				// how long the fade in/out takes of the specific item
				fadeDurationMS: 1000,
			},
			videoScene: {
				// if the VideoScene is skippable by default
				skippable: true,
			}
		}
		// Video recorder settings
		const recorder = {
			verbose: false,
			display: true,
			framerate: 60,
			quality: 100,
			format: 'webm',
			frameLimit: 0,
			autoSaveTime: 0
		}

		const measure = {
			// width of the line drawns for debugging using Measure
			lineWidth: 1
		}
		super(
			window,
			renderer,
			shadow,
			camera,
		)
	}

}
