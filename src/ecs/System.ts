import ECS from ".";
import { Component } from "./Component";
import constants from "./contants";
import { Entity } from "./Entity";

export type EventCallback = (data: any, entities: Iterator<Entity>) => void;

export abstract class System {
	private readonly componentTypes: number[] = [];

	private readonly callbacks: { [key: string]: Array<EventCallback> } = {};
	public readonly id: number;
	public frequence: number;
	protected world: ECS = undefined as any;

	protected trigger: (event: string, data: any) => void = undefined as any;
	public beforeUpdateAll?(time: number): void;
	public update?(time: number, delta: number, entity: Entity): void;
	public afterUpdateAll?(time: number, entities: Entity[]): void;
	public change?(entity: Entity, added?: Component<any>, removed?: Component<any>): void;

	public enter?(entity: Entity): void;
	public exit?(entity: Entity): void;

	constructor(componentTypes: number[], frequence: number = 0) {
		this.id = constants.SEQ_SYSTEM++;
		this.frequence = frequence;
		this.componentTypes = componentTypes;
	}

	protected query(componentTypes: number[]): Iterator<Entity> {
		return this.world.query(componentTypes)
	}

	protected listenTo(event: string, callback: EventCallback, once?: boolean) {
		if (!this.callbacks.hasOwnProperty(event)) {
			this.callbacks[event] = [];
		}

		if (once) {
			let tmp = callback.bind(this);

			callback = (data: any, entities: Iterator<Entity>) => {

				tmp(data, entities);

				let idx = this.callbacks[event].indexOf(callback);
				if (idx >= 0) {
					this.callbacks[event].splice(idx, 1);
				}
				if (this.callbacks[event].length === 0) {
					delete this.callbacks[event];
				}
			}
		}

		this.callbacks[event].push(callback);
	}
}
