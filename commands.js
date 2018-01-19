var fs = require('fs')
var chalk = require('chalk')
var commands ={}
const prompt = chalk.red('\nWHAT? >')

commands.pwd = function(param){
   process.stdout.write(process.cwd().trim())
   process.stdout.write(chalk.red(prompt));
};
commands.process = function(param){
    console.log(process)
    process.stdout.write(chalk.red(prompt));
};
commands.date = (param)=> {
    process.stdout.write(Date().trim())
    process.stdout.write(chalk.red(prompt));
};

commands.ls =(param)=>{
    fs.readdir('.', function(err, fileNames) {
    if (err) throw err;
      process.stdout.write(fileNames.join('\n'));
      process.stdout.write(chalk.red(prompt));
    })  
};
commands.echo = (wordArr) => {
    if(!wordArr) process.stdout.write('\n')
    let joinedWords= wordArr.join(' ')
    if(joinedWords[0]==='$' && process.env[joinedWords.slice(1)]) process.stdout.write(process.env[joinedWords.slice(1)])
    else process.stdout.write(joinedWords)
};
commands.cat = (files)=>{
        // console.log('files-->f',files)
        let filesLength = files.length
        let counter = 0
    files.forEach( (file)=>{
        fs.readFile(`./${file}`, (err, data)=>{//the promt waits for the write to complete becasue the async thread takes int he entire function.
            if(err) throw err                   //however fi the promt was outside the calback it woudl execute immediately.
            process.stdout.write(data.toString()+'\n')
            counter++
            if(counter===filesLength) process.stdout.write(chalk.red(prompt))
        })
    })
};
commands.head= (file, n=5)=>{
    fs.readFile(`./${file}`, (err, data)=>{
        if(err) throw err         
        let firstLinesArr = data.toString().split('\n').slice(0,n).join('\n')         
        process.stdout.write(firstLinesArr)
        process.stdout.write(chalk.red(prompt))
    })
};
commands.tail= (file, n=5)=>{
    fs.readFile(`./${file}`, (err, data)=>{
        if(err) throw err         
        let lastLinesArr = data.toString().split('\n').slice(n).join('\n')         
        process.stdout.write(lastLinesArr)
        process.stdout.write(chalk.red(prompt))
    })
}


module.exports=commands