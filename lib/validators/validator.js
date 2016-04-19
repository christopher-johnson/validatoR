var fs = require('fs'),
    path = require('path');

exports.validate = function(config, outFile) {
    var data = '';
    var xpPath = '../' + config.paths.exportDir;
    var xp = path.join(__dirname, xpPath + outFile);
    rs = fs.createReadStream(xp);
    rs.on('data', function(chunk) {
        data += chunk;
    });
    rs.on('end',function(){
        var opts = { cwd: './Rscripts',
            env: process.env
        };
        opts.env['results'] = data;
        opts.env['exportsDir'] = path.join(__dirname, xpPath);
        opts.env['outFile'] = outFile;

        exports.series([
            'Rscript diff_s1-s2.R',
            'Rscript diff_s2-s1.R',
            'Rscript merge.R'
        ], opts, function(err){
            console.log('executed R scripts');
        });
    });
    rs.on('error', function(err){
        console.log(err.stack);
    });
};

exports.series = function(cmds, opts, cb){
    var execNext = function(){
        exports.exec(cmds.shift(), opts, function(err){
            if (err) {
                cb(err);
            } else {
                if (cmds.length) execNext();
                else cb(null);
            }
        });
    };
    execNext();
};

// execute a single shell command where "cmd" is a string
exports.exec = function(cmd, opts, cb){
    var child_process = require('child_process');
    var parts = cmd.split(/\s+/g);
    var p = child_process.spawn(parts[0], parts.slice(1), opts, {stdio: 'inherit'});
    p.on('exit', function(code){
        var err = null;
        if (code) {
            err = new Error('command "'+ cmd +'" exited with wrong status code "'+ code +'"');
            err.code = code;
            err.cmd = cmd;
        }
        if (cb) cb(err);
    });
};
