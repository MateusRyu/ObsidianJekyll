import { Plugin, FileSystemAdapter, PluginManifest, WorkspaceLeaf, Notice, MetadataCache, CachedMetadata } from 'obsidian';
import { DEFAULT_SETTINGS } from 'JekyllSupportPluginSettings';
import JekyllSupportPluginSettings from 'JekyllSupportPluginSettings';
import SettingTab from 'modules/SettingTab';
import getCommands from 'getCommands';
import log, { LogLevel } from 'Logger';
import { JekyllMenu, VIEW_TYPE_MENU } from 'views/JekyllMenu';

export default class JekyllSupportPlugin extends Plugin {
	
	settings: JekyllSupportPluginSettings;
	manifest: PluginManifest = {
		id: 'obsidian-jekyll',
		name: "Obsidian Jekyll",
		author: 'Mateus Ryu Yamaguchi',
		version: '1.0.0',
		minAppVersion: '',
		description: ''
	};
	private basePath: string;
		
	async onload() {
		log(LogLevel.LOG, 'loading plugin..');
		const adapter = this.app.vault.adapter as FileSystemAdapter;
		const vaultBasePath = adapter.getBasePath();
		this.basePath = vaultBasePath;
		await this.loadSettings();

		const jekyllGraph = this.addRibbonIcon('git-branch-plus', 'Open Jekyll graph menu', (event: MouseEvent) => {
			this.activateGraph();
		});

		this.registerView(
			VIEW_TYPE_MENU,
			(leaf) => new JekyllMenu(leaf)
		  );
	  
		this.addRibbonIcon("test-tubes", "Open Jekyll Menu", () => {
			this.activateMenu();
		});

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		getCommands().forEach(command => {
			this.addCommand(command);
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			log(LogLevel.DEBUG, 'click', evt);
		});
		log(LogLevel.LOG, 'plugin loaded!');
	}

	onunload() {
		log(LogLevel.LOG, 'unloading plugin..');
		log(LogLevel.LOG, 'Clear Interval');
		this.registerInterval(window.setInterval(() => log(LogLevel.LOG, 'setInterval'), 5 * 60 * 1000));
		log(LogLevel.LOG, 'plugin unloaded!');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async activateMenu() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_MENU);

		if (leaves.length > 0) {
			leaf = leaves[0];
		} else {
			leaf = workspace.getRightLeaf(false);
			await leaf?.setViewState({ type: VIEW_TYPE_MENU, active: true});
		}
		
		if (leaf) {
			workspace.revealLeaf(leaf);
		}
	}

	async activateGraph() {

	}
}
