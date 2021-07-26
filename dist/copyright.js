"use strict";
/* Copyright (c) 2021 Rishika Maroo */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Script to add copyright headers
 */
const command = 'copyright-header --fix --copyrightHolder "Rishika Maroo" --include ".ts"';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
function addCopyright() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { _stdout, _stderr } = yield exec(command);
        }
        catch (err) {
            console.error(err);
        }
    });
}
addCopyright();
