'use strict'

const configration = require('./configration');
var elasticsearch = require('elasticsearch');
var elasticClient;

var state = {
  connection: null,
}

exports.connect = function (done) {
  try {
    if (state.connection)
      return done()
    elasticClient = new elasticsearch.Client({
      host: configration.config.elasticSearchUrl,
      log: 'info'
    });

    state.connection = elasticClient;
    console.log("elasticsearch connected on url : ", configration.config.elasticSearchUrl);
    done();
  } catch (e) {
    console.log("elasticsearch connect exception ", e)
  }
}

exports.get = function () {
  return state.connection
}