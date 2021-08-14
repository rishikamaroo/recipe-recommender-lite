/* Copyright (c) 2021 Rishika Maroo */

import expect = require('expect.js');
import sinon from 'sinon';
import mongoose from 'mongoose';
import { createRecipeP, deleteRecipeP, getRecipeP, patchRecipeP } from '../../src/models/recipe';
import { CustomError, InvalidRequestError, NotFoundError } from '../../src/utils/error';

const sandbox = sinon.sandbox.create();

describe('recipe model', async () => {
  afterEach(() => {
    sandbox.restore();
  });

  const sampleRecipe = {
    _id: '61007c9520191d18e01688ac',
    id: 'ee9323b2-251c-44be-97e4-ff2a6403b890',
    text: 'indian masala pasta',
    createdAt: '2021-07-27T21:37:25.536Z',
    updatedAt: '2021-07-27T21:37:25.536Z',
    __v: 0,
  };

  it('creates a new recipe', async () => {
    sandbox.stub(mongoose.Model, 'create').resolves(sampleRecipe);
    const response = await createRecipeP(
      'ee9323b2-251c-44be-97e4-ff2a6403b890',
      'indian masala pasta',
    );
    expect(response.text).to.eql('indian masala pasta');
  });

  it('Gets a recipe', async () => {
    sandbox.stub(mongoose.Model, 'findOne').resolves(sampleRecipe);
    const response = await getRecipeP('ee9323b2-251c-44be-97e4-ff2a6403b890');
    expect(response.text).to.eql('indian masala pasta');
  });

  it('Patches text to a recipe', async () => {
    const newText = 'new indian recipe';
    sampleRecipe.text = newText;
    sandbox.stub(mongoose.Model, 'findOneAndUpdate').resolves(sampleRecipe);
    const response = await patchRecipeP('ee9323b2-251c-44be-97e4-ff2a6403b890', newText);
    expect(response.text).to.not.eql('indian masala pasta');
    expect(response.text).to.eql(newText);
  });

  it('deletes a recipe', async () => {
    const newText = 'new indian recipe';
    sandbox.stub(mongoose.Model, 'deleteOne').resolves({ deleteCount: 1 });
    const response = await deleteRecipeP('ee9323b2-251c-44be-97e4-ff2a6403b890');
  });

  it('throws error when trying to find non-existent recipe', async () => {
    try {
      const error = new NotFoundError(
        'no record found for id: ee9323b2-251c-44be-97e4-ff2a640-fake',
      );
      sandbox.stub(mongoose.Model, 'findOne').throws(error);
      const response = await getRecipeP('ee9323b2-251c-44be-97e4-ff2a640-fake');
    } catch (err) {
      expect(err.message).to.eql('no record found for id: ee9323b2-251c-44be-97e4-ff2a640-fake');
    }
  });

  it('throws error when trying to delete non-existent recipe', async () => {
    try {
      const error = new NotFoundError(
        'the record you are trying to remove does not exist with id: ee9323b2-251c-44be-97e4-ff2a640-fake',
      );
      sandbox.stub(mongoose.Model, 'deleteOne').throws(error);
      const response = await deleteRecipeP('ee9323b2-251c-44be-97e4-ff2a640-fake');
    } catch (err) {
      expect(err.message).to.eql(
        'the record you are trying to remove does not exist with id: ee9323b2-251c-44be-97e4-ff2a640-fake',
      );
    }
  });

  it('throws error while creating a recipe', async () => {
    try {
      const error = new InvalidRequestError('error while creating a recipe');
      sandbox.stub(mongoose.Model, 'create').throws(error);
      const response = await createRecipeP('id', '');
    } catch (err) {
      expect(err.message).to.eql('error while creating a recipe');
    }
  });

  it('throws error while patching text to a recipe', async () => {
    try {
      const error = new CustomError('error while patching text to a recipe');
      sandbox.stub(mongoose.Model, 'findOneAndUpdate').throws(error);
      const response = await patchRecipeP('id', 'invalid-text');
    } catch (err) {
      expect(err.message).to.eql('error while patching text to a recipe');
    }
  });
});
