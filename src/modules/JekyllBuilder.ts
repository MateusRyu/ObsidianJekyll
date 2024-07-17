import { exec } from 'child_process';
import log, { LogLevel } from 'Logger';

interface ExecError {
    message: string;
}

type ExecErrorOrNull = ExecError | null;

interface ExecResult {
    error: ExecErrorOrNull;
    stdout: string;
    stderr: string;
}

type ExecCallback = (error: ExecErrorOrNull, stdout: string, stderr: string) => void;


export default class JekyllBuilder {
    private basePath: string;

    constructor(basePath: string) {
        this.basePath = basePath;
    }

    public async buildJekyll(): Promise<void> {
        this.executeCommand(`cd "${this.basePath}" && jekyll build`, (error, stdout, stderr) => {
            if (error) {
                // Jekyll error
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Error: ${stderr}`);
                return;
            }
            log(LogLevel.LOG, `Result: ${stdout}`);
        });
    }

    private executeCommand(command: string, callback: ExecCallback): void {
        exec(command, (error: ExecError | null, stdout: string, stderr: string) => {
            callback(error, stdout, stderr);
        });
    }
}
