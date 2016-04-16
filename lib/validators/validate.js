var Readable = require('stream').Readable;
var util = require('util');

module.exports = Validator;

function Validator(options) {
    if (! (this instanceof Validator)) return new Validator(options);
    if (! options) options = {};
    options.objectMode = true;
    Readable.call(this, options);
}

util.inherits(Validator, Readable);

Validator.prototype._read = function read() {
    var self = this;

    executeRscript(function(err, data) {
        if (err) self.emit('error', err);
        else self.push(data);
    });
};

Validator.prototype._validate(data, callback) {
    var opts = { cwd: './',
        env: process.env
    };
    opts.env['results'] = data;

    var child = exec('Rscript test.R', opts, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    })

