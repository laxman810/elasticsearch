
'use strict'

const elasticClient = require('./elasticSearchConnection');
const tablename = 'userList';
const indexName = "users";
const version = 382;

function findMatch(data, callback) {

    let condition = {
        "query": {
            "bool": {
                "must": [
                    {
                        "match": {
                            "gender": data.gender
                        }
                    },
                    {
                        "range": {
                            "height": {
                                "gte": data.heightMin,
                                "lte": data.heightMax
                            }
                        }
                    },
                    {
                        "range": {
                            "dob": {
                                "gte": data.dobMin,
                                "lte": data.dobMax
                            }
                        }
                    }
                ],
                "filter": {
                    "geo_distance": {
                        "distance": data.distanceMax,
                        "location": {
                            "lat": data.latitude,
                            "lon": data.longitude
                        }
                    }
                }
            }
        },
        "sort": [
            {
                "_geo_distance": {
                    "location": {
                        "lat": data.latitude,
                        "lon": data.longitude
                    },
                    "order": "asc",
                    "unit": "km",
                    "distance_type": "plane"
                }
            }
        ],
        "_source": [
            "firstName", "contactNumber", "gender", "registeredTimestamp",
            "profilePic", "otherImages", "email", "dob", "about",
            "onlineStatus", "height", "location", "firebaseTopic"
        ]
    }
    elasticClient.get().search({
        index: indexName,
        type: tablename,
        body: condition
    }, function (err, result) {
        callback(err, result);
    });
}

function Select(data, callback) {
    elasticClient.get().search({
        index: indexName,
        type: tablename,
        body: {
            "query": {
                "match": data
            }
        }
    }, function (err, result) {
        callback(err, result);
    });
}

function CustomeSelect(data, callback) {
    elasticClient.get().search({
        index: indexName,
        type: tablename,
        body: data
    }, function (err, result) {
        callback(err, result);
    });
}
function Insert(data, callback) {
    let _id = "" + data._id;
    delete data._id;
    elasticClient.get().index({
        index: indexName,
        type: tablename,
        id: _id,
        body: data
    }, (err, result) => {
        callback(err, result);
    });
}

function UpdateWithPush(_id, field, value, callback) {

    elasticClient.get().update({
        index: indexName,
        type: tablename,
        id: _id,
        retry_on_conflict: 5,
        body: {
            "script": "ctx._source." + field + ".add('" + value + "')"
        }
    }, (err, results) => {
        callback(err, results)
    })
}

function UpdateWithPull(_id, field, value, callback) {

    elasticClient.get().update({
        index: indexName,
        type: tablename,
        id: _id,
        retry_on_conflict: 5,
        body: {
            "script": "ctx._source." + field + ".remove(ctx._source." + field + ".indexOf('" + value + "'))"
        }
    }, (err, results) => {
        callback(err, results);
    })
}

function Update(_id, data, callback) {

    elasticClient.get().update({
        index: indexName,
        type: tablename,
        id: _id,
        retry_on_conflict: 5,
        body: {
            doc: data,
            doc_as_upsert: true
        }
    }, (err, results) => {
        callback(err, results)
    })
}

function updateByQuery(tablename, data, condition, callback) {
    elasticClient.get().updateByQuery({
        index: indexName,
        type: tablename,
        version: version,
        body: {
            query: {
                match:
                    { "term": { "userId": "59bb9b3ed5e9cb3fed133b76" } },
                "script": { "inline": "ctx._source.currentlyActive = false" }
            },
        }
    }, (err, results) => {
        callback(err, results)
    })
}

function Delete(tablename, condition, callback) {
    elasticClient.get().deleteByQuery({
        index: indexName,
        type: tablename,
        version: version,
        body: {
            query: {
                match: condition
            }
        }
    }, (err, results) => {
        callback(err, results)
    })
}


module.exports = {
    CustomeSelect, Select, Insert, Update, updateByQuery, Delete, findMatch,
    UpdateWithPush, UpdateWithPull
};