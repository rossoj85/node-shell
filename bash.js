const chalk =require('chalk')
const commands = require('./commands')
const prompt = chalk.red('\nWHAT? >')
let cmdGroups =[]; //state of cmd groups that have to be processed one after another


//Outputs a prompt
process.stdout.write(prompt)


process.stdin.on('data',function(data){

    //this regex means split on pipe andd any amount of whitespace on either side
    //globally throughout the string
    cmdGroups=data.toString().trim().split(/\s*\|\s*/g)
    execute(cmdGroups.shift())




});

function execute(cmdString, prevOutput){
    const tokens = cmdString.toString().trim().split(' ')
    const cmd = tokens[0]
    const args = tokens.slice(1) //remember args are being passed in as array, no args===empty array
    

    if(commands[cmd]) {
        console.log('COMMAND FOUDN')
        commands[cmd](prevOutput,args,done)
    }
}

function done(output){
        if(cmdGroups.length){
            execute(cmdGroups.shift(),output)
        }else{
        process.stdout.write(chalk.yellow(output))
        process.stdout.write(prompt)
        }
    }




  //be mindful of the input that a function requires
    // if(commands[cmd]) commands[cmd](cmd); ---changed this fucntion around to make ti more streamined