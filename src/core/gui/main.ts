import GUI from "lil-gui"

export default class MainDebugGUI {
	gui = new GUI()
	config: any;

	constructor() {
		this.gui.add(document, 'title')
		console.log(`Inicializando MainDebugGUI`)

		this.gui.add({
			showLog: () => {

				this.printLog();
			},
		},'showLog')
	}

	addNewConfig(config: any) {
		this.config = config;
		Object.keys(config).map((c: string) => {
			this.gui.add(config, c)
		})
	}


	printLog() {
		console.log(this.config)
	}
}

