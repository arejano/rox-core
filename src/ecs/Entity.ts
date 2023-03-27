import { Component } from "./Component";
import constants from "./contants";

export type Subscription = (entity: Entity, added?: Component<any>, removed?: Component<any>) => void;

export abstract class Entity {

	active: boolean = true;

	public id: number = 0;
	private subscriptions: Array<Subscription> = [];

	private components: {
		[key: number]: Component<any>[]
	} = {};

	constructor() {
		this.id = constants.SEQ_ENTITY++;
	}

    /**
     * Allows interested parties to receive information when this entity's component list is updated
     *
     * @param handler
     */
	public subscribe(handler: Subscription): () => Entity {
		this.subscriptions.push(handler);

		return () => {
			const idx = this.subscriptions.indexOf(handler);
			if (idx >= 0) {
				this.subscriptions.splice(idx, 1);
			}
			return this;
		}
	}

	public add(component: Component<any>) {
		const type = component.type;
		if (!this.components[type]) {
			this.components[type] = [];
		}

		if (this.components[type].indexOf(component) >= 0) {
			return
		}

		this.components[type].push(component);

		this.subscriptions.forEach(cb => cb(this, component, undefined));
	}

	public remove(component: Component<any>): void {
		const type = component.type;
		if (!this.components[type]) {
			return;
		}

		const idx = this.components[type].indexOf(component);
		if (idx >= 0) {
			this.components[type].splice(idx, 1);
			if (this.components[type].length < 1) {
				delete this.components[type];
			}

			this.subscriptions.forEach(cb => cb(this, undefined, component));
		}
	}
}
