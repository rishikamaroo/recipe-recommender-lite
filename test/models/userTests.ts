/* Copyright (c) 2021 Rishika Maroo */

import expect = require('expect.js');
import * as typeorm from 'typeorm';
import { createStubInstance } from 'sinon';
import sinon from 'sinon';
import { createUserP, getUserLoginP, getUserP, updateUserP } from '../../src/models/user';
import { HTTPStatusCode } from '../../src/constants';

const sandbox = sinon.sandbox.create();
describe('users model', () => {
  createStubInstance(typeorm.EntityManager);
  const connection = createStubInstance(typeorm.Connection);
  sinon.stub(typeorm, 'getConnection').returns(connection);

  afterEach(() => {
    sandbox.restore();
  });

  const sampleUser = {
    id: 'd35cdbb4-cc0e-43b2-b43e-08495ae51234',
    name: 'Jane Doe',
    username: 'janedoeuser',
    password: 'janedoespassword',
    email: 'janedoeemail@gmail.com',
    phoneNumber: 123456,
    createdAt: new Date(),
  };

  it('creates a new user', async () => {
    const response = await createUserP(sampleUser);
    expect(response.id).to.be.eql(sampleUser.id);
  });

  it('gets a user', async () => {
    const response = await getUserP(sampleUser.id);
    expect(response!.id).to.be.eql(sampleUser.id);
    expect(response!.name).to.be.eql(sampleUser.name);
    expect(response!.username).to.be.eql(sampleUser.username);
    expect(response!.email).to.be.eql(sampleUser.email);
    expect(response!.phoneNumber).to.be.eql(sampleUser.phoneNumber);
  });

  it('patches new username to a user', async () => {
    sampleUser.username = 'new-username-1';
    const response = await updateUserP(sampleUser.id, sampleUser.username);
    expect(response!.username).to.be.eql(sampleUser.username);
    expect(response!.email).to.be.eql(sampleUser.email);
  });

  it('gets a user login', async () => {
    const response = await getUserLoginP(sampleUser.username, sampleUser.password);
    expect(response).to.be.eql(true);
  });

  it('does not get a user login with invalid password', async () => {
    const response = await getUserLoginP(sampleUser.username, 'some-random-password');
    expect(response).to.be.eql(false);
  });

  it('throws error when trying to login with invalid username', async () => {
    try {
      await getUserLoginP('some-user-name', sampleUser.password);
    } catch (error) {
      expect(error.message).to.be.eql('invalid input, please check username');
      expect(error.code).to.be.eql(HTTPStatusCode.BadRequest);
    }
  });

  it('throws error when trying to get a user with non-existant userid', async () => {
    try {
      await getUserP('d35cdbb4-cc0e-43b2-b43e-08495ae53bd1');
    } catch (error) {
      expect(error.message).to.be.eql(
        'no user record found for id: d35cdbb4-cc0e-43b2-b43e-08495ae53bd1',
      );
      expect(error.code).to.be.eql(HTTPStatusCode.NotFound);
    }
  });
});
