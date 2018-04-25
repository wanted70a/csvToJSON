const fs = require('fs');
const path = require('path');
const readline = require('readline');
const uuidv1 = require('uuid/v1');

let JSONarray = [];
let lineNum = 0;
let tabelNames = [];

function MakeObj( keysArr, valuesArr ){
    for( let i=0; i<valuesArr.length; i++ ){
        this[`${tabelNames[i]}`] = valuesArr[i];
    }
}


function csvToJson(fileName='test.csv', delimiter=','){
    const rl = readline.createInterface({
      input: fs.createReadStream(fileName),
    });

    rl.on('line', function(line,){//read Line By Line
        let array = line.split(delimiter);
        if(lineNum === 0){
            tabelNames = array;
        }else{
            JSONarray.push( new MakeObj(tabelNames, array) )
        }
        lineNum+=1;
    });

    rl.on('close', function(){ //Finished Reading Line by Line
        const folderName = uuidv1();//generate folder name
        fs.mkdirSync(folderName);//make new folder to store website
        var JSONResult = JSON.stringify(JSONarray);
        fs.writeFileSync(path.join(__dirname, folderName, fileName), JSONResult);
        if(fileName === 'test.csv'){
            console.log('This was a test script\n', 'Put your csv file in folder with csvToJson.js and use this command:\n', '$ node csvToJson.js yourFileName delimiterInYourFile');
            console.log('Done, you can find json file here:\n', folderName+'/'+fileName);
        }else{
            console.log('Done, you can find json file here:\n', folderName+'/'+fileName);
        }
    });
}

csvToJson(process.argv[2], process.argv[3])
