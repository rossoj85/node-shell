var fs = require('fs')
var chalk = require('chalk')
var request = require('request')
var commands ={}
const prompt = chalk.red('\nWHAT? >')

var done = (output)=>{
    process.stdout.write(chalk.yellow(output))
    process.stdout.write(prompt)
}

commands.pwd = function(stdin,param){
    let output ='';
    output+=process.cwd().trim()
    done(output)
};
commands.process = function(stdin,param){
    let output=''
    console.log(process)
    done(output);
};
commands.date = (stdin,param)=> {
    let output=''
    output+=Date().trim()
    done(output)
};

commands.ls =(stdin,param)=>{
    let output=''
    fs.readdir(param, function(err, fileNames) {
    if (err) throw err;
     output+=fileNames.join('\n')
     done(output)
    })  
};
commands.echo = (stdin, wordArr) => {
    let output=''
    if(!wordArr) output+='\n'
    else{
    let joinedWords= wordArr.join(' ')
    if(joinedWords[0]==='$' && process.env[joinedWords.slice(1)]) output+=process.env[joinedWords.slice(1)]
    else output+=joinedWords
    }
    done(output)
};
commands.cat = (stdin, files)=>{
        let output=''
        // console.log('files-->f',files)
        let filesLength = files.length
        let counter = 0
    files.forEach( (file)=>{
        fs.readFile(`./${file}`, (err, data)=>{//the promt waits for the write to complete becasue the async thread takes int he entire function.
            if(err) throw err                   //however fi the promt was outside the calback it woudl execute immediately.
            output+=data.toString()+'\n'
            counter++
            if(counter===filesLength) done(output)
        })
    })
};
commands.head= (stdin,file, n=5)=>{
    let output=''
    fs.readFile(`./${file}`, (err, data)=>{
        if(err) throw err         
        let firstLinesArr = data.toString().split('\n').slice(0,n).join('\n')         
        output+=firstLinesArr
        done(output)
    })
};
commands.tail= (stdin,file, n=5)=>{ //TAKE ANOTHER LOOK AT THIS METHOD
    let output=''
    fs.readFile(`./${file}`, (err, data)=>{
        if(err) throw err         
        let lastLinesArr = data.toString().split('\n').slice(n).join('\n')         
        output+=lastLinesArr
        done(output)
    })
};
commands.sort =(stdin,file)=>{ ///what about lowerCase?????
    let output=''
    fs.readFile(`./${file}`, (err, data)=>{
        if(err) throw err         
        let linesArr = data.toString().split('\n')
        let sortedLinesArr = linesArr.sort()
        // console.log(sortedLinesArr)       
        output+=sortedLinesArr.join('\n')
        done(output)
    })
};
commands.wc =(stdin,file)=>{
    let output=''
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
            output+=`lines-->${linesCounter.toString()} words-->${wordsCounter}`
            done(output)
    })

};
commands.uniq =(stdin,file)=>{
    let output=''
    fs.readFile(`./${file}`, (err, data)=>{
        if(err) throw err 
        let resultArr = []
        let linesArr = data.toString().split('\n')
        
        for(var line of linesArr){
            if(!resultArr.includes(line)){
                resultArr.push(line)
            }
        }
        output+=resultArr.join('\n')
        done(output)
    })
};
commands.curl =(stdin, url)=>{ ///COME BACK TO THIS
     let output=''
    console.log(url[0]) //remember arguments are coming in in an array
    request(`http://${url[0]}`,(err,res,body)=>{
        if(err) throw err
        output+=`statusCode: ${res && res.statusCode}`+'\n'
        output+=chalk.blue(`body: ${body}`) // prints the HTML for Google homepage
 
        done(output)
    })
};



module.exports=commands