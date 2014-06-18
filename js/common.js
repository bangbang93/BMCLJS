/**
 * Created by bangbang on 14/05/23.
 */
var path = require('path');
var fs = require('fs');

exports.currectDir = path.join(__dirname,'..');
exports.minecraftDir = path.join(exports.currectDir, '.minecraft');
exports.versionsDir = path.join(exports.minecraftDir, 'versions');

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
