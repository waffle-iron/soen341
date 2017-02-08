/**
 * Created by Kim on 2/1/2017.
 */
var argv = require('minimist')(process.argv.slice(2));
var configFile = require(__dirname + '/temp_userDB.json');

var config = function() {
    var env = process.env.NODE_ENV || argv.env || "users";

    return configFile[env];
};


module.exports = config;