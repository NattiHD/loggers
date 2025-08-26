import * as fs from 'fs';
import * as path from 'path';

//Note: I wrote the initial sketch and then passed it on to AI,
//which commented on singletons and synchronous writing.
//So it improved my understanding and writing.
//I wrote the comments on the code myself after understanding.

// the path of the log
const logFilePath = path.join(__dirname, 'custom-log.txt');

class SimpleLogger {
    //The log file should work according to the singleton feature,
    //so that there is only a single instance of the class and only
    //in it will all the records be recorded without creating another file.

    private writeToFile(message: string): void {
        const timestamp = new Date().toISOString()
        const logEntry = `${timestamp} - ${message}\n`
        //Using the sync operation so that even when a crash occurs,
        //the problem will be written to a file and then the crash will occur,
        //so we can know what caused the crash.
        fs.appendFileSync(logFilePath, logEntry, 'utf8')
    }


    info(message: string): void {
        const fullMessage = `INFO: ${message}`
        console.log(fullMessage)
        this.writeToFile(fullMessage)
    }


    error(message: string): void {
        const fullMessage = `ERROR: ${message}`
        console.error(fullMessage)
        this.writeToFile(fullMessage)
    }
}

// create a single instance of the logger for export
export const logger = new SimpleLogger()