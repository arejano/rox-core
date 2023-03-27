import { CameraType } from "../enums/CameraType";

export type CameraConfigType = {
	type: CameraType;
	validCameraTypes: CameraType[];
	near:number,
	fov: number,
	far: number,
	aspect:number,
}
