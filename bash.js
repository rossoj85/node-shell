var chalk =require('chalk')
var commands = require('./commands')
// var fs = require('fs')
const prompt = chalk.red('\nWHAT? >')

// console.log(fs.readdir.toString())
process.stdout.write(prompt)


process.stdin.on('data',function(data){
    var cmd = data.toString().trim();
    var multiCmd = cmd.split(' ')
   
    if (multiCmd.length>1 && commands[multiCmd[0]]) {
        console.log('hit!!!')
        commands[multiCmd[0]](multiCmd.slice(1))
    }

    else if (commands[cmd]) commands[cmd]()

    else {
        process.stdout.write('You typed: ' + cmd);
        process.stdout.write(prompt);
}
});








  //be mindful of the input that a function requires
    // if(commands[cmd]) commands[cmd](cmd); ---changed this fucntion around to make ti more streamined