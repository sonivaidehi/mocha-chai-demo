
const { expect } = require('chai');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const apiCall = require('../utils/apiCall');
const httpMethod = 'POST';
const url = `http://localhost:${process.env.PORT}/register`;
let result;
describe('Test cases for Register API', async () => {
  it('Valid Request : 200 - SUCCESS', async () => {
    const data = {
      'firstName': 'John',
      'lastName': 'Doe',
      'email': 'john.doe@gmail.com',
      'mobileNo': '+91-1234567890'
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(200);
    expect(result.code).to.be.a('string').to.be.eql('SUCCESS');
    expect(result.response).to.have.property('data').to.not.null;
    const response = result.response.data;
    expect(response).to.have.property('firstName').to.be.a('string').to.be.eql(data.firstName);
    expect(response).to.have.property('lastName').to.be.a('string').to.be.eql(data.lastName);
    expect(response).to.have.property('email').to.be.a('string').to.be.eql(data.email);
    expect(response).to.have.property('mobileNo').to.be.a('string').to.be.eql(data.mobileNo);
    expect(response).to.have.property('isActive').to.be.a('boolean').to.be.eql(true);
    expect(response).to.have.property('isDeleted').to.be.a('boolean').to.be.eql(false);
    expect(response).to.have.property('id').to.be.a('string');
  });

  it('Without firstName key in request body : 400 - BAD_REQUEST ', async () => {
    const data = {
      'lastName': 'doe',
      'email': 'john.doe@gmail.com',
      'mobileNo': '+91-1234567890'
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(400);
    expect(result.code).to.be.a('string').to.be.eql('BAD_REQUEST');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Without lastName key in request body : 400 - BAD_REQUEST ', async () => {
    const data = {
      'firstName': 'john',
      'email': 'john.doe@gmail.com',
      'mobileNo': '+91-1234567890'
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(400);
    expect(result.code).to.be.a('string').to.be.eql('BAD_REQUEST');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Without email key in request body : 400 - BAD_REQUEST ', async () => {
    const data = {
      'firstName': 'john',
      'lastName': 'doe',
      'mobileNo': '+91-1234567890'
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(400);
    expect(result.code).to.be.a('string').to.be.eql('BAD_REQUEST');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Without mobileNo key in request body : 400 - BAD_REQUEST ', async () => {
    const data = {
      'firstName': 'john',
      'lastName': 'doe',
      'email': 'john.doe@gmail.com'
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(400);
    expect(result.code).to.be.a('string').to.be.eql('BAD_REQUEST');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Empty request body : 400 - BAD_REQUEST ', async () => {
    const data = {};

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(400);
    expect(result.code).to.be.a('string').to.be.eql('BAD_REQUEST');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Invalid firstName - 2 characters only : 422 - VALIDATION_ERROR ', async () => {
    const data = {
      'firstName': 'ab',
      'lastName': 'doe',
      'email': 'john.doe@gmail.com',
      'mobileNo': '+91-1234567890'
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(422);
    expect(result.code).to.be.a('string').to.be.eql('VALIDATION_ERROR');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Invalid firstName - Passing number : 422 - VALIDATION_ERROR ', async () => {
    const data = {
      'firstName': 124,
      'lastName': 'doe',
      'email': 'john.doe@gmail.com',
      'mobileNo': '+91-1234567890'
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(422);
    expect(result.code).to.be.a('string').to.be.eql('VALIDATION_ERROR');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Invalid firstName - Passing null : 400 - BAD_REQUEST ', async () => {
    const data = {
      'firstName': null,
      'lastName': 'doe',
      'email': 'john.doe@gmail.com',
      'mobileNo': '+91-1234567890'
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(400);
    expect(result.code).to.be.a('string').to.be.eql('BAD_REQUEST');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Invalid firstName - 2 characters only : 422 - VALIDATION_ERROR ', async () => {
    const data = {
      'firstName': 'john',
      'lastName': 'ab',
      'email': 'john.doe@gmail.com',
      'mobileNo': '+91-1234567890'
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(422);
    expect(result.code).to.be.a('string').to.be.eql('VALIDATION_ERROR');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Invalid firstName - Passing number : 422 - VALIDATION_ERROR ', async () => {
    const data = {
      'firstName': 'john',
      'lastName': 123,
      'email': 'john.doe@gmail.com',
      'mobileNo': '+91-1234567890'
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(422);
    expect(result.code).to.be.a('string').to.be.eql('VALIDATION_ERROR');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Invalid firstName - Passing null : 400 - BAD_REQUEST ', async () => {
    const data = {
      'firstName': 'john',
      'lastName': null,
      'email': 'john.doe@gmail.com',
      'mobileNo': '+91-1234567890'
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(400);
    expect(result.code).to.be.a('string').to.be.eql('BAD_REQUEST');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Invalid email - Invalid format : 422 - VALIDATION_ERROR', async () => {
    const data = {
      'firstName': 'John',
      'lastName': 'Doe',
      'email': 'john.doe',
      'mobileNo': '+91-1234567890'
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(422);
    expect(result.code).to.be.a('string').to.be.eql('VALIDATION_ERROR');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Invalid email - Passing null : 400 - BAD_REQUEST', async () => {
    const data = {
      'firstName': 'John',
      'lastName': 'Doe',
      'email': null,
      'mobileNo': '+91-1234567890'
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(400);
    expect(result.code).to.be.a('string').to.be.eql('BAD_REQUEST');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Invalid email - Passing number : 422 - VALIDATION_ERROR', async () => {
    const data = {
      'firstName': 'John',
      'lastName': 'Doe',
      'email': 112,
      'mobileNo': '+91-1234567890'
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(422);
    expect(result.code).to.be.a('string').to.be.eql('VALIDATION_ERROR');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Invalid mobileNo - Invalid format : 422 - VALIDATION_ERROR', async () => {
    const data = {
      'firstName': 'John',
      'lastName': 'Doe',
      'email': 'john.doe@gmail.com',
      'mobileNo': '0-1234567890'
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(422);
    expect(result.code).to.be.a('string').to.be.eql('VALIDATION_ERROR');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Invalid mobileNo - Passing null : 400 - BAD_REQUEST', async () => {
    const data = {
      'firstName': 'John',
      'lastName': 'Doe',
      'email': 'john.doe@gmail.com',
      'mobileNo': null
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(400);
    expect(result.code).to.be.a('string').to.be.eql('BAD_REQUEST');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Invalid mobileNo - Passing number : 422 - VALIDATION_ERROR', async () => {
    const data = {
      'firstName': 'John',
      'lastName': 'Doe',
      'email': 'john.doe@gmail.com',
      'mobileNo': 123
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(422);
    expect(result.code).to.be.a('string').to.be.eql('VALIDATION_ERROR');
    expect(result.response).to.have.property('data').to.be.null;
  });

  it('Duplicate Request : 422 - VALIDATION_ERROR', async () => {
    const data = {
      'firstName': 'John',
      'lastName': 'Doe',
      'email': 'john.doe@gmail.com',
      'mobileNo': '+91-1234567890'
    };

    result = await apiCall(url, data, httpMethod);
    expect(result.status).to.equal(422);
    expect(result.code).to.be.a('string').to.be.eql('VALIDATION_ERROR');
    expect(result.response).to.have.property('data').to.be.null;
  });
});
