var express = require('express');
var router = express.Router();
var console = require('console');
var Utils = require('../lib/utils/utils');
var service = require('../lib/service/avro-schema-service');

router.get('/search', function (req, res) {
    var param = buildParam(req.query, ["dsId", "schemaName", "text", "pageSize", "pageNum"]);
    if (!param.pageSize) {
        param.pageSize = 10;
    }
    if (!param.pageNum) {
        param.pageNum = 1;
    }
    service.search(param, function searchAvroSchemas(err, response) {
        if(err) {
            res.json({status: 500, message: err.message});
            return;
        }
            res.json({status: 200, data: response.body});


    })
});

var buildParam = function (query, params) {
    var param = {};
    params.forEach(function (key) {
        if (query[key]) {
            param[key] = query[key];
        }
    });
    return param;
}

module.exports = router;
