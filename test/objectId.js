'use strict';

// Load modules

const Lab = require('@hapi/lab');
const Code = require('@hapi/code');
const ObjectId = require('bson').ObjectId;

const JoiObjectId = require('../');
const Joi = require('@hapi/joi').extend(JoiObjectId);

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

// Values used below

const id12 = "A1B2c3d4E5f6";
const id24 = "A1B2c3d4E5f6A1B2c3d4E5f6";
const lt12 = 'a1a1a1a1a1a';
const between = id12 + 'abcdef';
const gt24 = id24 + 'a';
const invalidInput = gt24;




describe('objectId', () => {

  it('does not fail on undefined', () => {
    Joi.objectId().validate(undefined, (err, value) => {
      expect(err).to.be.null();
      expect(value).to.be.undefined()
    });
  });

  it('fails on null', () => {
    Joi.objectId().validate(null, (err, value) => {
      expect(err).to.exist();
      expect(value).to.be.null();
    });
  });

  it('fails on boolean', () => {
    Joi.objectId().validate(true, (err, value) => {
      expect(err).to.exist();
      expect(value).to.equal(true);
    });

    Joi.objectId().validate(false, (err, value) => {
      expect(err).to.exist();
      expect(value).to.equal(false);
    });

  });

  it('fails when fewer than 12 characters', () => {
    Joi.objectId().validate(lt12, (err, value) => {
      expect(err).to.exist();
      expect(value).to.equal(lt12);
    });
  });

  it('fails when between 12 and 24 characters', () => {
    Joi.objectId().validate(between, (err, value) => {
      expect(err).to.exist();
      expect(value).to.equal(between);
    });
  });

  it('fails when greater than 24 characters', () => {

    Joi.objectId().validate(gt24, (err, value) => {
      expect(err).to.exist();
      expect(value).to.equal(gt24);
    });
  });

  it('fails on invalid input and convert disabled', () => {
    Joi.objectId().options({ convert: false }).validate(invalidInput, (err, value) => {
      expect(err).to.exist();
      expect(value).to.equal(invalidInput);
    });
  });

  it('succeeds on 12 character string', () => {
    Joi.objectId().validate(id12, (err, value) => {
      expect(err).to.not.exist();
      expect(value instanceof ObjectId).to.be.true();
    });
  });

  it('succeeds on 24 character string', () => {
    Joi.objectId().validate(id24, (err, value) => {
      expect(err).to.not.exist();
      expect(value instanceof ObjectId).to.be.true();
    });
  });

  it('matches the input string', () => {
    Joi.objectId().validate(id24, (err, value) => {
      expect(err).to.not.exist();
      expect(value instanceof ObjectId).to.be.true();
      expect(value.equals(id24)).to.be.true();
    });
  });

  it('succeeds on instance of ObjectId', () => {
    Joi.objectId().validate(ObjectId(id24), (err, value) => {
      expect(value instanceof ObjectId).to.be.true();
      expect(value.equals(ObjectId(id24))).to.be.true();
    });
  });

  it('succeeds on valid input and convert disabled', () => {
    Joi.objectId().options({ convert: false }).validate(id24, (err, value) => {
      expect(err).to.not.exist();
      expect(value).to.equal(id24);
    });
  });

  it('has a useful error message', () => {
    const result = Joi.objectId().validate(lt12);
    expect(result.error.message).to.equal('"value" must be a valid ObjectId');
  });

  it('returns the original value given an invalid input', () => {

    const result = Joi.objectId().validate(lt12);

    expect(result.value).to.equal(lt12);

  });
});
