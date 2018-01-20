var fs = require('fs')
var chalk = require('chalk')
var request = require('request')
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
};
commands.sort =(file)=>{
    fs.readFile(`./${file}`, (err, data)=>{
        if(err) throw err         
        let linesArr = data.toString().split('\n')
        let sortedLinesArr = linesArr.sort()
        // console.log(sortedLinesArr)       
        process.stdout.write(sortedLinesArr.join('\n'))
        process.stdout.write(chalk.red(prompt))
    })
};
commands.wc =(file)=>{
        fs.readFile(`./${file}`, (err, data)=>{
            if(err) throw err 
            let linesArr = data.toString().split('\n')
            let linesCounter = linesArr.length      
            let wordsCounter = 0

            for(var line of linesArr){
                let lineArr = line.split(' ')
                let wordsInLine = lineArr.length
                wordsCounter+=wordsInLine
            }      
            process.stdout.write(`lines-->${linesCounter.toString()} words-->${wordsCounter}`)
            process.stdout.write(chalk.red(prompt))
    })

};
commands.uniq =(file)=>{
    fs.readFile(`./${file}`, (err, data)=>{
        if(err) throw err 
        let resultArr = []
        let linesArr = data.toString().split('\n')
        
        for(var line of linesArr){
            if(!resultArr.includes(line)){
                resultArr.push(line)
            }
        }
        process.stdout.write(resultArr.join('\n'))
        process.stdout.write(chalk.red(prompt))
    })
};
commands.curl =(url)=>{
    console.log(url[0]) //remember arguments are coming in in an array
    request(`http://${url[0]}`,(err,res,body)=>{
        if(err) throw err
        process.stdout.write(`statusCode: ${res && res.statusCode}`)
        process.stdout.write(chalk.blue(`body: ${body}`)) // prints the HTML for Google homepage
        process.stdout.write(chalk.red(prompt))
    })
};

