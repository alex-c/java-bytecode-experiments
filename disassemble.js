const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

//Path to javap
const javap = '"C:/Program Files/Java/jdk1.8.0_191/bin/javap.exe"';

//Function to synchronously gets all class files in directory and subdirectories
function listClassFiles(directory, files) {
    files = files || [];
    let localFiles = fs.readdirSync(directory);
    localFiles.forEach(function(file) {
        if (fs.statSync(path.join(directory, file)).isDirectory()) {
            files = listClassFiles(path.join(directory, file), files);
        } else {
            if (file.split('.').pop() == "class") {
                files.push(path.join(directory, file));
            }
        }
    });
    return files;
};

//Find class files
const classFiles = listClassFiles(path.join(__dirname, 'java_src'));

if (classFiles.length > 0) {

    console.log(`Found ${classFiles.length} class files.`);

    //Disassemble each class file
    classFiles.forEach(function(file, index) {

        //Find class name and set target file
        const name = file.split('\\').pop().split('.').shift();
        const target = path.join(__dirname, `bytecode/${name}.txt`);

        //Prepare CMD
        const cmd = `${javap} -c ${file} > ${target}`;
        console.log(`Executing: ${cmd}`);

        //Execute CMD
        exec(cmd, function(error, stdout, stderr) {
            if (error) {
                console.error(`Error while attempting to disassemble '${source}'.`, error);
            }
        });
    });

} else {
    console.log('No class files found...');
}
