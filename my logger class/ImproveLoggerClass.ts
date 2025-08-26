import * as fs from 'fs';
import * as path from 'path';

type Level = "info" | "warn" | "error";

const logFilePath = path.join(__dirname, 'custom-log.txt');

class SimpleLogger {
    private writeToFile(message: string): void {
        const timestamp = new Date().toISOString();
        const logEntry = `${timestamp} - ${message}\n`;
        fs.appendFileSync(logFilePath, logEntry, 'utf8');
    }

    // using the DRY principle
    private log(level: Level, message: string, meta:Record<string, unknown>): void {
        const metaData = meta? JSON.stringify(meta) :""
        const fullMessage = `${level.toUpperCase()}: ${message} ${metaData}`;
        console.log(fullMessage)
        this.writeToFile(fullMessage)
    }

    info(message: string, meta:Record<string, unknown>): void {
        this.log('info', message, meta);
    }

    warn(message: string, meta:Record<string, unknown>): void {
        this.log('warn', message, meta);
    }

    error(message: string, meta:Record<string, unknown>): void {
        this.log('error', message, meta);
    }
}
export const logger = new SimpleLogger();