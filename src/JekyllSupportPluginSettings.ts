import { LogLevel } from "Logger";

export const LOG_LEVEL: LogLevel = LogLevel.LOG;

export default interface JekyllSupportPluginSettings {
	enableAutoRename: boolean;
	filenameDateFormat: string;
}

export const DEFAULT_SETTINGS: JekyllSupportPluginSettings = {
	enableAutoRename: true,
	filenameDateFormat: 'YYYY-MM-DD'
}