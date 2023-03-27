import { Component } from "../ecs/Component";
import { Entity } from "../ecs/Entity";
import { System } from "../ecs/System";

export default class LogSystem extends System {

	constructor() {
		// Logs all entities every 5 seconds (1/5 = 0.2 FPS)
		super([-1], (1 / 5)); 

		console.log("LogSystem: Start")
	}

	beforeUpdateAll(time: number): void {
		console.log('LogSystem: Before update', time);
	}

	update(time: number, delta: number, entity: Entity): void {
		console.log('LogSystem', entity);
	}

	afterUpdateAll(time: number, entities: Entity[]): void {
		console.log('LogSystem: After update', time, entities);
	}

	change(entity: Entity, added?: Component<any>, removed?: Component<any>): void {
		console.log('LogSystem::change', entity, added, removed);
	}
}

