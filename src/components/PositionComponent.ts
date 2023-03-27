import { Component } from "../ecs/Component";

export type Position = {
	x: number;
	y: number;
	z: number;
}

export const PositionComponent = Component.register<Position>();
