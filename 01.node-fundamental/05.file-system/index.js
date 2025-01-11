const path = require('path');
const fs = require('fs');

const folderPath = path.join(__dirname, 'data');

if(!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath);
    console.log('data folder created successfully.')
}

const filePath = path.join(folderPath, 'file-name.txt');

if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, 'hello form text file.')
    console.log('file created successfully.')
}


// fs.appendFileSync(filePath, "\nthis is the new line that we add to file text");

const fileContent = fs.readFileSync(filePath, 'utf8');
console.log(fileContent);


//async file

const asyncFilePath = path.join(folderPath, 'async-file.txt');

//write file
fs.writeFile(asyncFilePath, 'this is async file', (err)=>{
    if(err) throw err;
    console.log('async file created successfully.');

    //read file
    fs.readFile(asyncFilePath, 'utf8' ,(err, data)=>{
        if(err) throw err;
        console.log(data);

            //add some content to file
        fs.appendFile(asyncFilePath, '\nthis is the new line that added to the file',(err)=>{
            if(err) throw err;
            console.log('the new line added to aync file');
        })
    })


})