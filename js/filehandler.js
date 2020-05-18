const fs = require('fs');
const path = require('path');

export default class Data {
    Lists;
    path;

    constructor(path){
        this.path = path.toString();
    }

    // reading file data
    getData(){
        this.Lists = fs.readFileSync(this.path, 'utf8');
        this.Lists = JSON.parse(this.Lists);

        return this.Lists;
    }

    // writing data back to file 
    writeData(data){
        fs.writeFile(path.join(__dirname, this.path), data, function (err) {
            if (err) throw err;
          });
    }
}