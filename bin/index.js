#!/usr/bin/env node
const ora = require('ora');
const cli = require('commander');
const prompts = require('prompts');
const cloneRepo = require('../src/clone');
const { version: VERSION } = require('../package.json');

cli.name('pro')
  .version(VERSION)
  .arguments('<lang> <dir>')
  .action(async (lang, dir) => {
    const { template } = await prompts({
      type: 'text',
      message: 'What template do you want to use?',
      name: 'template',
      initial: 'hkh12/progen'
    });
    if (!template) process.exit();
    try {
      const spinner = ora('Cloning from GitHub...').start();
      await cloneRepo(template, dir);
      spinner.stopAndPersist();
    } catch ({ message }) {
      console.log(message);
    }
  })
  .parse(process.argv);
