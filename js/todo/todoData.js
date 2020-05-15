const fs = require('fs');
const path = require('path');
const datajson = require('./data/todo.json');

export default class Data {

    Lists;

    constructor(){}

    getData(){
        this.Lists = datajson;

        return this.Lists;
    }

    writeData(data){
        fs.writeFile(path.join(__dirname, 'data/todo.json'), data, function (err) {
            if (err) throw err;
          });
    }
}