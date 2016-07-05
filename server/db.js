'use strict';
import { connect } from 'mongodb';

const conn = new Promise((resolve, reject) => {
  connect('mongodb://db:27017/myanimelist', (err, db) => {
    if(err) return reject(err);
    return resolve(db);
  });
});

export default function db(){
  return conn;
};
