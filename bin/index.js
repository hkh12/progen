#!/usr/bin/env node
import cli from 'commander';
import prompts from 'prompts';
import ora from 'ora';
import cloneRepo from '../src/clone';
import packageJson from '../package.json';

cli.name('pro')
  .version(packageJson.version)
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
