import { Notice } from "obsidian";

export default class MetadataManager {
    updatingMetadata: boolean = false;

    async updateMetadata() {
		if (!this.updateMetadata) {
			this.updatingMetadata = true;
			new Notice("Update metadata");
			this.updatingMetadata = false;
		}
	}
};