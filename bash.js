var chalk =require('chalk')
var commands = require('./commands')
const prompt = chalk.red('\nWHAT? >')

var done = (output)=>{
    process.stdout.write(output)
    process.stdout.write(prompt)
}
// console.log(fs.readdir.toString())
process.stdout.write(prompt)


process.stdin.on('data',function(data){
    var cmd = data.toString().trim();
    var cmdList = cmd.split(/\s*\|\s*/g)
    var multiCmd = cmd.split(' ')
   
    console.log(cmdList)
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