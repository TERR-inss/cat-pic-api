const request = require('supertest');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// configure tests to match active server
require('dotenv').config({ path: __dirname + '/../.env' });
const server = 'http://localhost:' + (process.env.PORT || 3333);


describe('Basic suite', () => {
  describe('GET (ALL)', () => {
    it('responds with 200 status and JSON content type', () => {
      return request(server)
        .get('/catPics')
        .expect(200)
        .expect('Content-Type', /json/);
    });

    it('responds with an array', () => {
      return request(server)
        .get('/catPics')
        .then(res => assert(Array.isArray(res.body) === true));
    });
  });

  describe('GET (ONE)', () => {
    it('responds with 200 status and image/png content type', () => {
      return request(server)
        .get('/catPics/firstPic')
        .expect(200)
        .expect('Content-Type', 'image/png')
    });
  });

  describe('POST', () => {
    it('responds with 400 status when no request body included', () => {
      return request(server)
        .post('/catPics/testImage')
        .expect(400)
    });
  });

  describe('UPDATE', () => {
    it('responds with 500 status when request body has improper content type', () => {
      return request(server)
        .patch('/catPics/testImage')
        .send('testReqBodyString')
        .expect(500)
    });
  });

  describe('DELETE', () => {
    it('responds with 400 status when id matches no image in datastore', () => {
      return request(server)
        .delete('/catPics')
        .send('idStringMatchingNoImageInDatastore')
        .expect(400)
    });
  });
});