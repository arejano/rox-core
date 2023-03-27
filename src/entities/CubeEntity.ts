import { Box, BoxComponent } from "../components/BoxComponent";
import { ColorComponent } from "../components/ColorComponent";
import { Entity } from "../ecs/Entity";

export default class CubeEntity extends Entity {

	constructor(cube: Box, color: string) {
		super();

		this.add(new BoxComponent(cube));
		this.add(new ColorComponent(color));
	}

}
