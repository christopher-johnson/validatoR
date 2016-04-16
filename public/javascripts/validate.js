    var fragmentsClient = new ldf.FragmentsClient('http://fragments.dbpedia.org/2014/en');
    var query = 'SELECT * { ?s ?p <http://dbpedia.org/resource/Belgium>. ?s ?p ?o } LIMIT 100',
        resultsIterator = new ldf.SparqlIterator(query, {fragmentsClient: fragmentsClient});
    //results.on('data', console.log);
    var lines = [];
    var resultCount = 0;
    resultsIterator.on('data', function (row) {
        resultCount++;
        for (var prop in row) {
            if (row.hasOwnProperty( prop )) {
                lines.push(prop + ': ' + row[prop]);
            }
        }
        //console.log(lines);
        // appendText(lines.join('\n'), '\n\n');
    });
    res.write(lines);
    resultsIterator.on('end', function () {
        resultCount || appendText(lines, '(This query has no results.)');
    });

    // Appends text to the given element
    function appendText(lines) {
        for (var i = 1, l = arguments.length; i < l; i++)
            lines.append((arguments[i] + '').replace(/(<)|(>)|(&)|(https?:\/\/[^\s<>]+)/g, escape));
        //res.write(lines);
        //compare(lines);
    }

    function compare(lines) {
        var opts = { cwd: './',
            env: process.env
        };
        opts.env['results'] = lines;

        var child = exec('Rscript test.R', opts, function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            res.write(stdout);
            res.end('<br>end of R script');
        });

