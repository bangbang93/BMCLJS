/**
 * Created by bangbang on 14/05/23.
 */
var common = require('./common.js');
var path = require('path');
var fs = require('fs');
var async = require('async');

exports.getGameInfo = function(version, callback){
    console.log(version);
    fs.readdir(path.join(common.versionsDir, version), function(err, files){
        if (err){
            return callback(err);
        }
        console.log(files);
        var hasJsonFile = false;
        var jsonFileReg = /\.json$/g;
        for(var i=0;i<files.length;i++){
            if (!jsonFileReg.test(files[i])){
                files.splice(i, 1);
                console.log(files);
                i--;
            } else {
                files[i] = path.join(path.join(common.versionsDir, version), files[i]);
                if (!fs.statSync(files[i]).isFile()){
                    files.splice(i, 1);
                    console.log(files);
                    i--;
                }
            }
        }
        console.log(files);
        async.map(files, fs.readFile, function(err, data){
            if (err) {
                return callback(err);
            } else {
                if (data.length == 0){
                    return callback({
                        'error': '未找到版本相关的json文件'
                    });
                } else {
                    var gameInfo = JSON.parse(data[0].toString());
                    callback(null, gameInfo);
                }
            }
        })
    })
};
