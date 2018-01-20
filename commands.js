var fs = require('fs')
var chalk = require('chalk')
var request = require('request')
var commands ={}


commands.pwd = function(stdin, args, done){
    if(stdin && !args.lenght) done(stdin)
    else{
    let output ='';
    output+=process.cwd().trim()
    done(output)
    }
};
commands.process = function(stdin, args, done){
    if(stdin && !args.lenght) done(stdin)
    else{
        let output=''
        console.log(process)
        done(output);
    }
};
commands.date = (stdin, args, done)=> {
    if(stdin && !args.lenght) done(stdin)
    else{
    let output=''
    output+=Date().trim()
    done(output)
    }
};

commands.ls =(stdin, args, done)=>{
    if(stdin && !args.length) return done(stdin)
    else  fs.readdir('.', function(err, fileNames) {
        if (err) throw err;
          done(fileNames.join('\n')); 
        })  
};
commands.echo = (stdin, wordArr, done) => {
    if(stdin && !wordArr.length) return done(stdin)
    else produceOutput(wordArr)
    function produceOutput(wordArr){
        if(!wordArr) process.stdout.write('\n')
        let joinedWords= wordArr.join(' ')
        if(joinedWords[0]==='$' && process.env[joinedWords.slice(1)]) done(process.env[joinedWords.slice(1)])
        else done(joinedWords)
    }
};
commands.cat = (stdin, files, done)=>{
        if(stdin && !files) return done(stdin)
        let output=''
        // console.log('files-->f',files)/
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
commands.head= (stdin, file, done, n=5)=>{//
    if(stdin && !file.length) produceOutput(null,stdin)
    else fs.readFile(`./${file}`, {encoding:'utf8'}, produceOutput );
    function produceOutput(err,text){
        if(err) throw err         
        done(text.split('\n').slice(0,n).join('\n'));
    }
};
commands.tail= (stdin, file, done, n=5)=>{ 
    if(stdin && !file.length) produceOutput(null,stdin)
    else fs.readFile(`${file}`,{encoding: 'utf8'}, produceOutput)
    function produceOutput(err, text){
        if(err) throw err         
        done(text.split('\n').slice(-5).join('\n'))
    }
};
commands.sort = (stdin,file, done)=>{ ///what about lowerCase?????
   
    if(stdin && !file.length) produceOutput(null,stdin)
    
    else fs.readFile(`./${file}`,produceOutput)
    function produceOutput(err,data){
        let output=''
        if(err) throw err         
        let linesArr = data.toString().split('\n')
        let sortedLinesArr = linesArr.sort()
        // console.log(sortedLinesArr)       
        output+=sortedLinesArr.join('\n')
        done(output)
    }
};
commands.wc =(stdin, file, done)=>{
    if(stdin && !file.length) produceOutput(null, stdin)
    else fs.readFile(`./${file}`,produceOutput)
    function produceOutput(err,data){
            let output=''
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
    }
}
commands.uniq =(stdin, file, done)=>{
    if(stdin && !file.length) produceOutput(null, stdin)
    else fs.readFile(`./${file}`, produceOutput)
    function produceOutput(err,data){
        let output=''
   
        if(err) throw err 
        let resultArr = []
        let linesArr = data.toString().split('\n')
        
        for(var line of linesArr){
            if(!resultArr.includes(line)){ //includes makes the On more complex, we can optomize this more but at cost of readibility.
                resultArr.push(line)
            }
        }
        output+=resultArr.join('\n')
        done(output)
    }
};
commands.curl =(stdin,url, done)=>{ ///COME BACK TO THIS/
    
    if(stdin && !url.length) produceOutput(null, {statusCode:200}, stdin)
    else request(`http://${url[0]}`,produceOutput)
    function produceOutput(err,res,body){
        if(err) throw err
        process.stdout.write(`statusCode: ${res && res.statusCode} \n`)
        if(body) done(body) // prints the HTML for Google homepage
        
    }

}


module.exports=commands