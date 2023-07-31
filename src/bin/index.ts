#! /usr/bin/env node

import sayHello from '../sayHello';
import yargs from 'yargs';

const args = yargs(process.argv.slice(2)).argv['_'];

const fileName = args[0];

if (fileName == undefined) {
  console.log('Vous devez donner le nom du fichier à générer');
} else {
  sayHello(fileName);
}
