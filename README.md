# TPF Client Validator

## Execute Federated SPARQL queries against BigData sources and compare the results

You can execute SPARQL queries against Triple Pattern Fragments like this:
```bash
$ ./bin/ldf-client.js http://orbeon-bb.wmflabs.org/wdqs-sparql http://orbeon-bb.wmflabs.org/wdqs-sitelinks http://orbeon-bb.wmflabs.org/dbpedia-sparql queries/fed-1.sparql

```
The arguments to the `ldf-client` command are:

0. Any fragment of the dataset you want to query, in this case DBpedia and Wikidata.
0. A file with the query you want to execute (this can also be a string).

## Install the client

This client requires [Node.js](http://nodejs.org/) 0.10 or higher
and is tested on OSX and Linux.
To install, execute:
```bash
$ [sudo] npm install
```

##Install R
The validator requires R

The validation results are written to stdout in two JSON datasets, a merge and a diff.


