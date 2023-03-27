export default class Engine {
	running: boolean = false;
	frameIndex = null;
	uptime: number = 0;
	time = undefined;

	constructor() {
		this.tick = this.tick.bind(this)
	}

	start() {
	}

	tick() {
		if (!this.running) {
			return;
		}


		// requestAnimationFrame(this.tick)
	}

}


