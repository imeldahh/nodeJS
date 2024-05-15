const path = require("node:path");
const { v4: uuid } = require("uuid");
const fs = require("node:fs");
const fsPromise = require("node:fs/promises")
const format = require("date-format");

const eventLogger = async (message, filename) => {
    let datetime = format("dd MM yyy \t hh:mm:ss", new Date());
    let event = `${datetime}\t ${uuid()} \t ${message}\n`;
    try {
        if (fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsPromise.appendFile(path.join(__dirname, '..', 'logs', filename), event)
        }
        else {
            fs.mkdir(path.join(__dirname, "..", "logs"), (error) =>{
                if(error) throw error;
            })
        }
    } catch (error) {
        console.log(`${error.name}: ${error.message}`)
    }
}

const logger = (req, res, next) => {
    eventLogger(`${req.method} \t ${req.headers.origin} \t ${req.url}`, 'eventsLogs.txt');
    next();
}

module.exports = {
    eventLogger,
    logger
};