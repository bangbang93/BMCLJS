/**
 * Created by bangbang on 14-5-23.
 */
var fs = require('fs');
var path = require('path');

exports.currectDir = path.join(__dirname,'..');

exports.refreshVersionList = function(callback){
    fs.readdir(exports.currectDir + '/.minecraft/versions',function(err, files){
        if (err){
            return callback(err);
        } else {
            var result = [];
            files.forEach(function(file){
                var stat = fs.statSync(exports.currectDir + '/.minecraft/versions/' + file);
                if (stat.isDirectory()){
                    result.push(file);
                }
            });
            return callback(null, result);
        }
    });
};