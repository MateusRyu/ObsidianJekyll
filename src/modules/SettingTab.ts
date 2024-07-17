import { App, PluginSettingTab, Setting } from "obsidian";
import JekyllSupportPlugin from "main";
import log, { LogLevel } from "Logger";

export default class SettingTab extends PluginSettingTab {
	plugin: JekyllSupportPlugin;

	constructor(app: App, plugin: JekyllSupportPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
		const body = containerEl.createDiv();
		body.createEl("h1", { text: this.plugin.manifest.name });
		body.createEl("hr");
		const fileManager = body.createDiv();
		fileManager.createEl("h2", { text: "File Manager"});
		new Setting(fileManager)
			.setName("Auto rename new file")
			.setDesc("Prepend today data at filename and sanitize to Jekyll")
			.addToggle((toggle) =>
				toggle
				  .setValue(this.plugin.settings.enableAutoRename)
				  .onChange(async (value) => {
					this.plugin.settings.enableAutoRename = value;
					log(LogLevel.LOG, value)
					await this.plugin.saveSettings();
				  })
			);

		new Setting(fileManager)
			.setName("Filename date format")
			.setDesc("Default date format")
			.addText((text) =>
				text
				.setPlaceholder("YYYY-MM-DD")
				.setValue(this.plugin.settings.filenameDateFormat)
				.onChange(async (value) => {
					this.plugin.settings.filenameDateFormat = value;
					await this.plugin.saveSettings();
				})
			);
	}
}
