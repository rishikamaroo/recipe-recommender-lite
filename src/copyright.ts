/* Copyright (c) 2021 Rishika Maroo */

const command = 'copyright-header --fix --copyrightHolder "Rishika Maroo" --include ".ts"';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function addCopyright() {
  try {
    const { stdout, stderr } = await exec(command);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (err) {
    console.error(err);
  }
}

addCopyright();
