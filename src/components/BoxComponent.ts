import { Component } from "../ecs/Component";

export type Box = {
	width: number;
	height: number;
	depth: number;
}

export const BoxComponent = Component.register<Box>();
