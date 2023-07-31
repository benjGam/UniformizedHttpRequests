#! /usr/bin/env node

import yargs from 'yargs';
import CommandManager from './command-management/command-manager';

const args = yargs(process.argv.slice(2)).argv['_'];

CommandManager.init().then(() => {
  CommandManager.dispatch(args);
});
