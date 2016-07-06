'use strict';
import db from '../db.js';

const UserModel = {
  addUser: user => {
    console.log();
    // console.log(db().then(conn => conn.collection('users').insertOne(user)));
    return db().then(conn => conn.collection('users').insertOne(user)).then((result) => {
      if(!result.insertedCount) return Promise.reject();
      return Promise.resolve(result);
    });
  }
};

export default UserModel;
