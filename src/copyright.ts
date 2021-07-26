/* Copyright (c) 2021 Rishika Maroo */

const command = 'copyright-header --fix --copyrightHolder "Rishika Maroo" --include ".ts"';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function addCopyright() {
  try {
    const { _stdout, _stderr } = await exec(command);
  } catch (err) {
    console.error(err);
  }
}

addCopyright();
