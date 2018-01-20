const chalk =require('chalk')
const commands = require('./commands')
const prompt = chalk.red('\nWHAT? >')
let cmdGroups =[]; //state of cmd groups that have to be processed one after another


//Outputs a prompt
process.stdout.write(prompt)


process.stdin.on('data',function(data){
    //this regex means split on pipe andd any amount of whitespace on either side
    //globally throughout the string
    cmdGroups=data.toString().trim().split(/\s*\|\s*/g) //1.) new keyboard input we split it on pipes
    const unsafeCommands= getUnsafe(cmdGroups)
    if(unsafeCommands.length){
        process.stderr.write(chalk.red(`command(s) not found: ${unsafeCommands.join(' ')}`))
        cmdGroups=[];
        done('')
    }else {
        execute(cmdGroups.shift()) //2. we execute the first item in command groups 
    }

});
function getUnsafe(cmdStrings){
    return cmdStrings
    .map(cmdString =>cmdString.split(' ')[0])
    .filter(cmd=>!commands[cmd])
}

function execute(cmdString, prevOutput){
    const tokens = cmdString.toString().trim().split(' ') //3. Takes what we jsut shifted off of command groups and splits it by white space (array)
    const cmd = tokens[0] //4. the first token is our command 
    const args = tokens.slice(1) //5. the remaining tokens are our argsremember args are being passed in as array, no args===empty array
    

    if(commands[cmd]) { //6 looks into our list of commands on our command object. If it is found it is executed. if it has input piped in it used that input(prev args)
        console.log('COMMAND FOUDN')
        commands[cmd](prevOutput,args,done)
    }
}

function done(output){
        if(cmdGroups.length){ //7. Checks to see if there is anthing left in cmdGroups. Remmeber comand groups was originaly the input string split
            execute(cmdGroups.shift(),output)  //by pipes into an array. If there is more than one item in cmdGroups it means that there was a pipe.
        }else{                                  //if there was is a pipe, it uses the output of one function as the input on the next.
        process.stdout.write(chalk.yellow(output))    // explaination abotu one hou into video. ``
        process.stdout.write(prompt)
        }
    }




  //be mindful of the input that a function requires
    // if(commands[cmd]) commands[cmd](cmd); ---changed this fucntion around to make ti more streamined