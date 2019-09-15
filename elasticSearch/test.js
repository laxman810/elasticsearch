
'use strict'

let userListType = require('./elasticSearchModule');

let condition = {
    "query": {
        "bool": {
            "must": [
                { "match": { "_id": 123 } }
            ]
        }
    }
};

userListType.CustomeSelect(condition, (err, result) => {
    if (err) {
        console.log("error : ", err);
    } else {
        console.log(result);
    }
});