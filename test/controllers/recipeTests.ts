/* Copyright (c) 2021 Rishika Maroo */

import expect = require('expect.js');
import sinon from 'sinon';
import mongoose from 'mongoose';
import mocks from 'node-mocks-http';
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  patchRecipe,
} from '../../src/controllers/recipe';
import { CustomError, InvalidRequestError, NotFoundError } from '../../src/utils/error';

const sandbox = sinon.sandbox.create();

describe('recipe controller', () => {
  beforeEach(function (done) {
    /* eslint-disable no-console */
    console.log = function () {};
    /* eslint-disable no-console */
    done();
  });
  afterEach(() => {
    sandbox.restore();
  });

  const sampleRecipe = {
    _id: '61007c9520191d18e01688ac',
    id: 'ee9323b2-251c-44be-97e4-ff2a6403b890',
    text: 'thin crust pizza',
    createdAt: '2021-07-27T21:37:25.536Z',
    updatedAt: '2021-07-27T21:37:25.536Z',
    __v: 0,
  };

  it('createRecipe', async () => {
    const req = mocks.createRequest();
    const res = mocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });
    res.on('send', () => {
      const response = res._getJSONData();
      expect(response.status).to.be.eql(201);
      expect(response.message).to.be.eql('Success');
      expect(response.body[0].id).to.be.eql(sampleRecipe.id);
      expect(response.body[0].text).to.be.eql(sampleRecipe.text);
    });

    const modelFunction = sandbox.stub(mongoose.Model, 'create').resolves(sampleRecipe);
    createRecipe(req, res, {} as any);
    expect(modelFunction.calledOnce).to.be.eql(true);
  });

  it('getRecipe', async () => {
    const req = mocks.createRequest();
    const res = mocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });
    res.on('send', () => {
      const response = res._getJSONData();
      expect(response.status).to.be.eql(200);
      expect(response.message).to.be.eql('Success');
      expect(response.body[0].id).to.be.eql(sampleRecipe.id);
      expect(response.body[0].text).to.be.eql(sampleRecipe.text);
    });

    const modelFunction = sandbox.stub(mongoose.Model, 'findOne').resolves(sampleRecipe);
    getRecipe(req, res, {} as any);
    expect(modelFunction.calledOnce).to.be.eql(true);
  });

  it('getAllRecipes', async () => {
    const req = mocks.createRequest();
    const res = mocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });
    res.on('send', () => {
      const response = res._getJSONData();
      expect(response.status).to.be.eql(200);
      expect(response.message).to.be.eql('Success');
      expect(response.body[0][0].id).to.be.eql(sampleRecipe.id);
      expect(response.body[0][0].text).to.be.eql(sampleRecipe.text);
    });

    const modelFunction = sandbox.stub(mongoose.Model, 'find').resolves([sampleRecipe]);
    getRecipes(req, res, {} as any);
    expect(modelFunction.calledOnce).to.be.eql(true);
  });

  it('patchRecipe', async () => {
    const req = mocks.createRequest();
    const res = mocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });
    res.on('send', () => {
      const response = res._getJSONData();
      expect(response.status).to.be.eql(200);
      expect(response.message).to.be.eql('Success');
      expect(response.body[0].id).to.be.eql(sampleRecipe.id);
      expect(response.body[0].text).to.be.eql(sampleRecipe.text);
    });

    const modelFunction = sandbox.stub(mongoose.Model, 'findOneAndUpdate').resolves(sampleRecipe);
    patchRecipe(req, res, {} as any);
    expect(modelFunction.calledOnce).to.be.eql(true);
  });

  it('deleteRecipe', async () => {
    const req = mocks.createRequest();
    const res = mocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });
    res.on('send', () => {
      const response = res._getJSONData();
      expect(response.status).to.be.eql(200);
      expect(response.message).to.be.eql('Success');
    });

    const modelFunction = sandbox.stub(mongoose.Model, 'deleteOne').resolves(sampleRecipe);
    deleteRecipe(req, res, {} as any);
    expect(modelFunction.calledOnce).to.be.eql(true);
  });

  it('throws error when trying to delete non-existent recipe', async () => {
    const req = mocks.createRequest();
    const res = mocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });
    res.on('send', () => {
      const response = res._getJSONData();
      expect(response.body[0].err.code).to.be.eql(404);
      expect(response.body[0].err.message).to.be.eql(
        'the record you are trying to remove does not exist with id: ee9323b2-251c-44be-97e4-ff2a640-fake',
      );
    });

    const error = new NotFoundError(
      'the record you are trying to remove does not exist with id: ee9323b2-251c-44be-97e4-ff2a640-fake',
    );
    const modelFunction = sandbox.stub(mongoose.Model, 'deleteOne').throws(error);
    deleteRecipe(req, res, {} as any);
    expect(modelFunction.calledOnce).to.be.eql(true);
  });

  it('throws error when trying to find non-existent recipe', async () => {
    const req = mocks.createRequest();
    const res = mocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });
    res.on('send', () => {
      const response = res._getJSONData();
      expect(response.body[0].err.code).to.be.eql(404);
      expect(response.body[0].err.message).to.be.eql(
        'no record found for id: ee9323b2-251c-44be-97e4-ff2a640-fake',
      );
    });

    const error = new NotFoundError('no record found for id: ee9323b2-251c-44be-97e4-ff2a640-fake');
    const modelFunction = sandbox.stub(mongoose.Model, 'deleteOne').throws(error);
    deleteRecipe(req, res, {} as any);
    expect(modelFunction.calledOnce).to.be.eql(true);
  });

  it('throws error while patching text to a recipe', async () => {
    const req = mocks.createRequest();
    const res = mocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });
    res.on('send', () => {
      const response = res._getJSONData();
      expect(response.body[0].err.code).to.be.eql(500);
      expect(response.body[0].err.message).to.be.eql('error while patching text to a recipe');
    });

    const error = new CustomError('error while patching text to a recipe', 500);
    const modelFunction = sandbox.stub(mongoose.Model, 'findOneAndUpdate').throws(error);
    patchRecipe(req, res, {} as any);
    expect(modelFunction.calledOnce).to.be.eql(true);
  });

  it('throws error while creating a recipe', async () => {
    const req = mocks.createRequest();
    const res = mocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });
    res.on('send', async () => {
      const response = JSON.parse(res._getData());
      expect(response.body[0].err.code).to.be.eql(400);
      expect(response.body[0].err.message).to.be.eql('error while creating a recipe');
    });

    const error = new InvalidRequestError('error while creating a recipe');
    const modelFunction = sandbox.stub(mongoose.Model, 'create').throws(error);
    createRecipe(req, res, {} as any);
    expect(modelFunction.calledOnce).to.be.eql(true);
  });
});
