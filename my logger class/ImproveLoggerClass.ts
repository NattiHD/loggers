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
    private log(level: Level, message: string): void {
        const fullMessage = `${level.toUpperCase()}: ${message}`;
        console.log(fullMessage); // נשתמש ב-console.log לכולם בינתיים
        this.writeToFile(fullMessage);
    }

    info(message: string): void {
        this.log('info', message);
    }

    warn(message: string): void {
        this.log('warn', message);
    }

    error(message: string): void {
        this.log('error', message);
    }
}
export const logger = new SimpleLogger();