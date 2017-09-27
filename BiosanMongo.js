const dbUrl = 'mongodb://172.16.0.106/mobile';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.createConnection(dbUrl);

class BiosanMongo {
  constructor(para) {
    this.schemaName = new Schema(para.schema, {collection: para.schemaName});
    this.modelName = db.model(para.modelName, this.schemaName);
  }

  save(data) {
    return new Promise((resolve, reject) => {
      let tmp = new this.modelName(data);
      tmp.save((err) => {
        if(err) {
          resolve(0);
        } else {
          resolve(1);
        }
      });
    });
  }

  find(conditions, fields, options) {
    return new Promise((resolve, reject) => {
      this.modelName.find(conditions, fields, options, (err, result) => {
        if (err) {
          reject(0);
        }else{
          if(result.length>0){
            resolve(result);
          } else {
            resolve(0);
          }
        }

      });
    });

  }

  update(conditions, update, options) {
    return new Promise((resolve, reject) => {
      this.modelName.update(conditions, update, options, (err,result) => {
        if(err) {
          resolve(0);
        } else {
          resolve(result.n);
        }
      });
    })
  }

  deleteMany(conditions) {
    return new Promise((resolve, reject)=> {
      this.modelName.deleteMany(conditions, function(error , result) {
        if(error) {
          resolve(0);
        } else {
          resolve(result.n);
        }
      });
    })
  }

}

module.exports = BiosanMongo;