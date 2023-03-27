import { Component } from "./Component";
import { Entity } from "./Entity";
import { EventCallback, System } from "./System";
import ECSIterator from "../ecs/Iterator"


let NOW = Date.now !== undefined ? Date.now : new Date().getTime();

export default class ECS {
	public static System = System;
	public static Entity = Entity;
	public static Component = Component;

	private systems: System[] = [];
	private entities: Entity[] = [];

	private entitySystems: { [key: number]: System[] } = {};
	private entitySystemLastUpdate: { [key: number]: { [key: number]: number } } = {};
	private entitySystemLastUpdateGame: { [key: number]: { [key: number]: number } } = {};

	private entitySubscription: { [key: number]: () => void } = {};

	private gameTime: number = 0;
	private lastUpdate: number = NOW();
	public timeScale: number = 1;

	constructor(systems?: System[]) {
		if (systems) {
			systems.forEach((system) => {
				this.addSystem(system)
			})
		}
	}

	public addSystem(system: System) {
		if (!system) { return; }

		if (this.systems.indexOf(system) >= 0) { return; }

		this.systems.push(system);


		this.entities.forEach((entity: Entity) => {
			this.indexEntity(entity, system)
		})
	}

	public addEntity(entity: Entity) {
		if (!entity || this.entities.indexOf(entity) >= 0) {
			return;
		}

		this.entities.push(entity);
		this.entitySystemLastUpdate[entity.id] = {};
		this.entitySystemLastUpdateGame[entity.id] = {};

		//Remove subscriptions
		if (this.entitySubscription[entity.id]) {
			this.entitySubscription[entity.id]();
		}

		//Add new subscription
		this.entitySubscription[entity.id] = entity
			.subscribe((entity: Entity, added: any, removed: any) => {
				this.onEntityUpdate(entity, added, removed);
				this.indexEntity(entity)
			})
	}

	private onEntityUpdate(entity: Entity, added: any, removed: any) {

	}

	public query(componentTypes: number[]): ECSIterator<Entity> {
		let index = 0;
		let listAll = componentTypes.indexOf(-1) >= 0;

		return new ECSIterator<Entity>(() => {
			outside:
			for (let l = this.entities.length; index < l; index++) {
				let entity = this.entities[index];
				if (listAll) {
					return entity
				}

				const entityComponentIDs = this.getEntityComponentIDs(entity);

				for (var a = 0, j = componentTypes.length; a < j; a++) {
					if (entityComponentIDs.indexOf(componentTypes[a]) < 0) {
						continue outside;
					}
				}

				return entity;

			}
		})
	}

	private getEntityComponentIDs(entity: any): number[] {
		return [-1].concat(
			Object.keys((entity as any).components).map(v =>
				Number.parseInt(v, 10)
			)
		);

	}

	private systemTrigger(event: string, data: any) {
		this.systems.forEach((system) => {
			let callbacks: {
				[key: string]: Array<EventCallback>
			} = (system as any).callbacks;

			if (callbacks.hasOwnProperty(event) && callbacks[event].length > 0) {
				this.inject(system);
				let entitiesIterator = this.query((system as any).componentTypes);
				callbacks[event].forEach((callback) => {
					callback(data, entitiesIterator)
				})
			}
		})
	}

	private inject(system: System): System {
		(system as any).world = this;
		(system as any).trigger = this.systemTrigger;
		return system;
	}

	private indexEntity(entity: Entity, system?: System) {
		if (!this.entitySystems[entity.id]) {
			this.entitySystems[entity.id] = [];
		}

		if (system) {
			this.indexEntitySystem(entity, system)
		} else {
			this.systems.forEach((system) => {
				this.indexEntitySystem(entity, system)
			})
		}
	}

	private indexEntitySystem(entity: Entity, system: System) {
		const idx = this.entitySystems[system.id].indexOf(system);

		if (this.systems.indexOf(system) < 0) {
			if (idx >= 0) {
				this.entitySystems[entity.id].splice(idx, 1);
				delete this.entitySystemLastUpdate[entity.id][system.id];
				delete this.entitySystemLastUpdateGame[entity.id][system.id];
			}
			return;
		}

		const systemComponentTypes = (system as any).componentTypes;

		for (let a = 0, l = systemComponentTypes.lenght; a < l; a++) {
			let entityComponentIDs: number[] = [-1].concat(
				Object.keys((entity as any).components).map(v =>
					Number.parseInt(v, 10)
				)
			);
			if (entityComponentIDs.indexOf(systemComponentTypes[a] < 0)) {
				if (idx >= 0) {
					if (system.exit) {
						this.inject(system);
						system.exit(entity);
					}
				}
			}
		}
	}

	public update() {
		console.log("ECS::Update: call")
		let now = NOW()
		this.gameTime += (now - this.lastUpdate) + this.timeScale;

		let toCallAfterUpdateAll: {
			[key: string]: {
				system: System;
				entitites: Entity[];
			}
		} = {};

		this.entities.forEach((entity: Entity) => {
			if (!entity.active) {

			}

		})
	}

}
