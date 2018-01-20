'use strict';

module.exports = function(routes) {

    let columns = ['', 'Name', 'Path'];

    let Table = require('cli-table');

    let table = new Table({
        style: {
            head: ['green'],
            compact: true
        },
        head: columns
    });

    console.log('\n*********************************************************');
    console.log('\t\tAPIs for this service ');
    console.log('**********************************************************\n');

    for (let key in routes) {
        if (routes.hasOwnProperty(key)) {
            let val = routes[key];
            let row = {};
            let version;
            let path;

            for (let index in val.versions) {

                version = val.versions[index];

                // simplify the version number (if possible)
                // and avoid replacing ".0" in say 1.0.2
                if (version.slice(-2) === '.0') {
                    version = version.replace(new RegExp('.0', 'g'), '');
                }
            }

            path = '/v' + version + val.spec.path;

            row[val.method]  = [val.name, path];
            table.push(row);
        }
    }

    console.log(table.toString());
    return table;
};
