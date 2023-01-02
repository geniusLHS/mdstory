#!/usr/bin/env node

const { program } = require('commander');
const { init, token, write, update } = require('../src/index.js');

program.version('1.0.0', '-v, --version').usage('[option]');

program.command('init').action((options) => {
  init();
});

program
  .command('token')
  .option('-c, --code <code>', 'write authentication code')
  .action((options) => {
    token(options.code);
  });

program
  .command('write')
  .requiredOption('-p, --path <path>', 'file path')
  .action((options) => {
    write(options.path);
  });

program
  .command('update')
  .requiredOption('-i, --id <id>', 'post id')
  .requiredOption('-p, --path <path>', 'file path')
  .action((options) => {
    update(options.path, options.id);
  });

program.parse(process.argv);
