import { Scene } from "three";
import { Object3DComponent } from "../components/Object3DComponent";
import { Entity } from "../ecs/Entity";
import { System } from "../ecs/System";

export default class SceneObjectSystem extends System {

	private scene: Scene;

	constructor(scene: Scene) {
		super([
			Object3DComponent.type
		]);
		this.scene = scene;
	}

	enter(entity: Entity): void {
		let model = Object3DComponent.oneFrom(entity);
		if (this.scene.children.indexOf(model.data) < 0) {
			this.scene.add(model.data)
		}
	}

	public exit(entity: Entity): void {
		let model = Object3DComponent.oneFrom(entity)
		this.scene.remove(model.data)
	}

}
