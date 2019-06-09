const chalk = require('chalk');
const shell = require('shelljs');
const log = console.log;

if (shell.cp('-R', 'LICENSE', 'dist/select').code !== 0) {
  log(chalk.red('fail to copy LICENSE to package folder'));
}
