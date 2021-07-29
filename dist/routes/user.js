"use strict";
/* Copyright (c) 2021 Rishika Maroo */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const joiSchemaValidation_1 = require("../middleware/joiSchemaValidation");
const router = express_1.Router();
router.post('/', joiSchemaValidation_1.validateUserPostRequestBody, user_1.signup);
router.get('/:id', user_1.getUser);
router.patch('/:id', joiSchemaValidation_1.validateUserPatchRequestBody, user_1.patchUser);
exports.default = router;
