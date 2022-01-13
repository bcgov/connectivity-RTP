const fs = require('fs');
const path = require('path');
const _ = require('lodash');

class Query {
  constructor(pgPool, req) {
    this.pgPool = pgPool;
    this.req = req;
  }
}

const files = fs.readdirSync(__dirname);

files.forEach(file => {
  if (file !== 'index.js') {
    _.each(require(path.join(__dirname, file)), (val, key) => {
      const func = val.bind(null);
      Query.prototype[key] = function (...args) {
        return func(this.pgPool, ...args, this.req);
      };
    });
  }
});

module.exports = Query;
