import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";
import { BoxComponent } from "../components/BoxComponent";
import { ColorComponent } from "../components/ColorComponent";
import { Object3DComponent } from "../components/Object3DComponent";
import { Component } from "../ecs/Component";
import { Entity } from "../ecs/Entity";
import { System } from "../ecs/System";

export default class PlayerFactorySystem extends System {
	constructor() {
		super([
			BoxComponent.type,
			ColorComponent.type
		])
	}

	public enter(entity: Entity): void {
		let object = Object3DComponent.oneFrom(entity)
		if (!object) {
			const box = BoxComponent.oneFrom(entity).data;
			const color = ColorComponent.oneFrom(entity).data;

			const geometry = new BoxGeometry(box.width, box.height, box.depth);
			const material = new MeshPhongMaterial({ color: color });
			const cube = new Mesh(geometry, material)

			entity.add(new Object3DComponent(cube));
		}
	}

	public change(entity: Entity, added?: Component<any> | undefined, removed?: Component<any> | undefined): void {
		console.log('PlayerFactorySystem::Change', entity, added, removed)
	}


}
