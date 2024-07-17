import { LOG_LEVEL } from "JekyllSupportPluginSettings";

export enum LogLevel {
    NONE = 0,
    ERROR = 1,
    WARN = 2,
    INFO = 3,
    LOG = 4,
    DEBUG = 5,
};

export default function log(level: LogLevel, ...messages: any[]): void {
    if (level <= LOG_LEVEL) {
        switch (level) {
            case LogLevel.ERROR:
                console.error(...messages);
                break;
            case LogLevel.WARN:
                console.warn(...messages);
                break;
            case LogLevel.INFO:
                console.info(...messages);
                break;
            case LogLevel.LOG:
                console.log(...messages);
                break;
            case LogLevel.DEBUG:
                console.debug(...messages);
                break;
        }
    }
}
