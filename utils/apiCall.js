const _ = require('lodash');
const axios = require('axios');

const defaultAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
});

async function apiCall (url, data, method, options = {}, header = {}) {
  try {
    const res = await defaultAxios({
      method,
      url,
      header,
      data,
    });
    return {
      response: res.data,
      status: res.status,
      code: res.data.status
    };
  } catch (err) {
    return {
      response: err.response.data,
      status: err.response.status,
      code: err.response.data.status 
    };
  }
}

module.exports = apiCall;