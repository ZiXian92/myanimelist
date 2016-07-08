'use strict';
import { ObjectId } from 'mongodb';
import db from '../helpers/db.js';

const UserModel = {
  /**
   * Adds the given user.
   * @param {{username: string, password: string, admin: bool}} user
   * @return {Promise}
   */
  addUser: user => {
    return db().then(conn => conn.collection('users').insertOne(user)).then((result) => {
      console.log(result);
      if(!result.insertedCount) return Promise.reject();
      return Promise.resolve(result);
    });
  },

  /**
   * Gets the user with the given username.
   * Note that here it is assumed that all names are unique
   * since there is at most 1 user.
   * @param {string} username
   * @return {Promise}
   */
  getUserByName: username => {
    return db().then(conn => conn.collection('users').find({username: username}).limit(1).next()).then(user => {
      if(!user) return Promise.reject({ status: 404 });
      else return Promise.resolve(user);
    }, err => Promise.reject({ status: 500 }));
  },

  getUserById: id =>
    db().then(conn => conn.collection('users').find({_id: new ObjectId(id) }).limit(1).next()).then(user => {
      console.log(typeof id);
      if(!user) return Promise.reject({status: 404});
      return user;
    }, err => Promise.reject({status: 500}))
};

export default UserModel;
