import log, { LogLevel } from "Logger";
import { ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE_MENU = "jekyll-menu";

export class JekyllMenu extends ItemView {
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType(): string {
        return VIEW_TYPE_MENU;
    }

    getDisplayText(): string {
        return "Teste"
    }

    async onOpen() {
        log(LogLevel.LOG, "Abriu view")
        const container = this.containerEl.children[1];
        container.empty();
        container.createEl("h4", { text: "Example view" });

        //.setIcon("hammer")
        //.setIcon("refresh-cw")
        //.setIcon("file-plus")
    }
    
    async onClose() {
        // Nothing to clean up.
    }
}