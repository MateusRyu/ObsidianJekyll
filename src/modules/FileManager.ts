import { Vault } from "obsidian";

export type fileName = string;

export default class FileManager {
    private vault: Vault;

    generateJekyllFilename(title: String): fileName {
		const date = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
		const sanitizedTitle = title.toLowerCase().replace(/\s+/g, '-'); // convert space character to underscore
        const filename: fileName = `${date}-${sanitizedTitle}.md`;
		return filename;
	}

	createJekyllFile(title: string): void {
		const fileName = this.generateJekyllFilename(title);
		this.vault.create(fileName, "# My New Post\n\nContent goes here...");
	}
}