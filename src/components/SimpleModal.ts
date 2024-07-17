import { App, Modal } from "obsidian";

export default class SimpleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText('opened!');
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}