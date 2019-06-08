const chalk = require('chalk');
const shell = require('shelljs');
const log = console.log;

if (shell.cp('-R', 'projects/select/README.md', 'dist/select/README.md').code !== 0) {
  log(chalk.red('fail to copy readme file to package folder'));
}
