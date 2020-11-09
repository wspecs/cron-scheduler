require('dotenv').config();
const cron = require('node-cron');
const fs = require('fs');
const shell = require('shelljs');

function getConfig() {
	try {
		return JSON.parse(fs.readFileSync(process.env.CRON_CONFIG, 'utf-8'));
	} catch (e) {
		console.log('Unable to parse config file');
		process.exit(1);
	}
}

const config = getConfig();
for (const schedule of Object.keys(config)) {
	cron.schedule(schedule, () => {
		console.log('running', config[schedule].name);
		shell.exec(config[schedule].command);
	});
}