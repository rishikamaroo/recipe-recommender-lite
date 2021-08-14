/* Copyright (c) 2021 Rishika Maroo */

import expect = require('expect.js');
import request from 'supertest';
import sinon from 'sinon';
import mongoose from 'mongoose';

const sandbox = sinon.sandbox.create();
import * as app from '../../src/app';
import { HTTPStatusCode, HttpStatusMessage } from '../../src/constants';
import { NotFoundError } from '../../src/utils/error';

describe('post /comment', () => {
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
    text: 'indian masala pasta',
    createdAt: '2021-07-27T21:37:25.536Z',
    updatedAt: '2021-07-27T21:37:25.536Z',
    __v: 0,
  };

  it('should POST /recipe/:id', async function () {
    sandbox.stub(mongoose.Model, 'create').resolves(sampleRecipe);
    const res = await request(app.server)
      .post('/api/v1/recipe')
      .send({ text: 'indian masala pasta' });
    const text = JSON.parse(res.text);
    expect(text.status).to.be.eql(HTTPStatusCode.Created);
    expect(text.body[0].id).to.be.eql(sampleRecipe.id);
    expect(text.body[0].text).to.be.eql(sampleRecipe.text);
  });

  it('should GET /recipe/:id ', async function () {
    sandbox.stub(mongoose.Model, 'findOne').resolves(sampleRecipe);
    const res = await request(app.server).get(
      '/api/v1/recipe/ee9323b2-251c-44be-97e4-ff2a6403b890',
    );
    const text = JSON.parse(res.text);
    expect(text.status).to.be.eql(HTTPStatusCode.OK);
    expect(text.body[0].id).to.be.eql(sampleRecipe.id);
    expect(text.body[0].text).to.be.eql(sampleRecipe.text);
  });

  it('should PATCH /recipe/:id ', async function () {
    const updatedRecipe = Object.assign({}, sampleRecipe);
    const newText = 'some new recipe';
    updatedRecipe.text = newText;
    sandbox.stub(mongoose.Model, 'findOneAndUpdate').resolves(updatedRecipe);
    const res = await request(app.server)
      .patch('/api/v1/recipe/ee9323b2-251c-44be-97e4-ff2a6403b890')
      .send({ text: newText });
    const text = JSON.parse(res.text);
    expect(text.status).to.be.eql(HTTPStatusCode.OK);
    expect(text.body[0].text).to.not.eql(sampleRecipe.text);
    expect(text.body[0].text).to.be.eql(updatedRecipe.text);
  });

  it('should DELETE /recipe/:id ', async function () {
    sandbox.stub(mongoose.Model, 'deleteOne').resolves({ deleteCount: 1 });
    const res = await request(app.server).delete(
      '/api/v1/recipe/ee9323b2-251c-44be-97e4-ff2a6403b890',
    );
    const text = JSON.parse(res.text);
    expect(text.status).to.be.eql(HTTPStatusCode.OK);
  });

  it('throws error when trying to find non-existent recipe', async () => {
    try {
      const error = new NotFoundError(
        'no record found for id: ee9323b2-251c-44be-97e4-ff2a640-fake',
      );
      sandbox.stub(mongoose.Model, 'findOne').throws(error);
      const res = await request(app.server).get(
        '/api/v1/recipe/ee9323b2-251c-44be-97e4-ff2a6403b890',
      );
    } catch (err) {
      expect(err.message).to.eql('no record found for id: ee9323b2-251c-44be-97e4-ff2a640-fake');
    }
  });

  it('fails validation when trying to post recipe with invalid text', async () => {
    const res = await request(app.server)
      .post('/api/v1/recipe')
      .send({ recipeText: 'indian masala pasta' });
    const text = JSON.parse(res.text);
    expect(text.status).to.be.eql(HTTPStatusCode.BadRequest);
    expect(text.message).to.be.eql(HttpStatusMessage.BadRequestError);
    expect(text.body[0].err).to.be.eql('"text" is required');
  });

  it('fails validation when trying to patch recipe with invalid text', async () => {
    const res = await request(app.server)
      .patch('/api/v1/recipe/ee9323b2-251c-44be-97e4-ff2a6403b890')
      .send({ recipeText: 'indian masala pasta' });
    const text = JSON.parse(res.text);
    expect(text.status).to.be.eql(HTTPStatusCode.BadRequest);
    expect(text.message).to.be.eql(HttpStatusMessage.BadRequestError);
    expect(text.body[0].err).to.be.eql('"text" is required');
  });

  it('fails validation when trying to post recipe with extra params', async () => {
    const res = await request(app.server)
      .post('/api/v1/recipe')
      .send({ text: 'indian masala pasta', someText: 'extra text' });
    const text = JSON.parse(res.text);
    expect(text.status).to.be.eql(HTTPStatusCode.BadRequest);
    expect(text.message).to.be.eql(HttpStatusMessage.BadRequestError);
    expect(text.body[0].err).to.be.eql('"someText" is not allowed');
  });

  it('fails validation when trying to patch recipe with extra params', async () => {
    const res = await request(app.server)
      .patch('/api/v1/recipe/ee9323b2-251c-44be-97e4-ff2a6403b890')
      .send({ text: 'indian masala pasta', someText: 'extra text' });
    const text = JSON.parse(res.text);
    expect(text.status).to.be.eql(HTTPStatusCode.BadRequest);
    expect(text.message).to.be.eql(HttpStatusMessage.BadRequestError);
    expect(text.body[0].err).to.be.eql('"someText" is not allowed');
  });
});
