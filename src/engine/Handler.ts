import Config from "./Config";

export default class Handler {

	data: any = {};
	config?: Config;

	constructor() {
	}

	updateConfig(config:Config){
		this.config = config;
	}

	add(key: string, value: any) {
		this.data[key] = value;
	}

	public get(key: string) {
		return this.data[key]
	}

	has(key: string) {
		return this.get(key) !== undefined
	}

	keys(){
		return Object.keys(this.data)
	}
}

