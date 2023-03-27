import { Entity } from "./Entity";
import constants from "./contants";
import copy from "../utils/copy";

export type ComponentClassType<P> = (new (data: P) => Component<P>) & {
	type: number;
	allFrom(entity: Entity): Component<P>[];
	oneFrom(entity: Entity): Component<P>;

}

export abstract class Component<T> {

	public static register<P>(): ComponentClassType<P> {
		const typeID = constants.SEQ_COMPONENT++;

		class ComponentImpl extends Component<P> {
			static allFrom(entity: Entity): ComponentImpl[] {
				let components: ComponentImpl[] = (entity as any).components[typeID];
				return components || [];
			}

			static oneFrom(entity: Entity): ComponentImpl | undefined {
				let components = ComponentImpl.allFrom(entity);
				if (components && components.length > 0) {
					return components[0]
				}
				return undefined;
			}

			constructor(data: P) {
				super(typeID, data);
			}
		}

		return (ComponentImpl as any) as ComponentClassType<P>;
	}

	public type: number;
	public data: T;

	public attr: {
		[key: string]: any
	} = {}

	constructor(type: number, data: T) {
		this.type = type;
		this.data = data;
	}

	copy(source: Component<T>): void {
		this.type = source.type;
		this.data = copy(source.data)
	}
}
