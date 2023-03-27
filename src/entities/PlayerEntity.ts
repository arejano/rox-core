import { Entity } from "../ecs/Entity";
import { Position, PositionComponent } from "../components/PositionComponent";

export default class PlayerEntity extends Entity {

	constructor(position: Position) {
		super();
		this.add(new PositionComponent(position));
	}
}
