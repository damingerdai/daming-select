const chalk = require('chalk');
const shell = require('shelljs');
const log = console.log;

if (shell.cp('-R', 'CHANGELOG.md', 'dist/@daminggerdai/select').code !== 0) {
  log(chalk.red('fail to copy CHANGELOG.md to package folder'));
}
