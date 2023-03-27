import { CameraType } from "../enums/CameraType";

export type ConfigModel = {
	cameraType: CameraType;
	fov: number;
	near: number;
	far: number,
	aspect: number,
}


