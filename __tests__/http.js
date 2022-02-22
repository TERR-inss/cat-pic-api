const request = require('supertest');
const assert = require('assert');
const express = require('express');
const { doesNotMatch } = require('assert');
const app = express();

// configure tests to match active server
require('dotenv').config({ path: __dirname + '/../.env' });
const server = 'http://localhost:' + (process.env.PORT || 3333);

describe('Root route', () => {
  describe('/catPics', () => {
    describe('GET', () => {
      it('responds with 200 status and JSON content type', () => {
        return request(server)
          .get('/catPics')
          .expect('Content-Type', /json/)
          .expect(200);
      });

      it('responds with an array', () => {
        return request(server)
          .get('/catPics')
          .expect(200)
          .then(res => assert(Array.isArray(res.body) === true));
      });

      it('if the array has length, it only contains objects', () => {
        return request(server)
          .get('/catPics')
          .expect(200)
          .then(res => res.body.forEach(element => {
              assert(typeof element === 'object');
          }));
      });

      it('objects returned contain required fields', () => {
        return request(server)
          .get('/catPics')
          .expect(200)
          .then(res => res.body.forEach(element => {
              if (!Object.keys(element).includes("_id") ||
                  !Object.keys(element).includes("name") ||
                  !Object.keys(element).includes("description") ||
                  !Object.keys(element).includes("image") ||
                  !Object.keys(element).includes("last_modified")) throw err;
          }));
      });
    });

    describe('POST', () => {
        it('responds with 200 status and JSON content type', () => {
          return request(server)
            .get('/catPics')
            .expect('Content-Type', /json/)
            .expect(200);
        });
      });
  });
});