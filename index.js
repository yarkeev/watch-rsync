#!/usr/bin/env node

const path = require('path');
const exec = require('child_process').exec;
const chokidar = require('chokidar');
const commander = require('commander');

let options = commander
        .option('-s, --source <source>', 'source path')
        .option('-d, --dest <dest>', 'destination path')
        .parse(process.argv);

chokidar.watch(path.resolve(options.source), {
        ignored: /(^|[\/\\])\../
}).on('change', (path) => {
        console.log(`change: ${path}`);

        exec(`rsync -r ${options.source} ${options.dest}`, (err, stdout) => {
                if (err) {
                        console.log(err);
                } else {
                        console.log('DODE', stdout);
                }
        });

});
