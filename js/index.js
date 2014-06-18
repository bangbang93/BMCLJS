/**
 * Created by bangbang on 14-5-23.
 */
var path = require('path');
var common = require('./common.js');
var gameInfo = require('./gameInfo.js');

exports.refreshVersionList = function(callback){
    common.refreshVersionList(callback);
};

exports.getGameInfo = function(version, callback){
    gameInfo.getGameInfo(version, callback);
};