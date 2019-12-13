const db = require('../data/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById
}

function find() {
    return db('users').select('id', 'username', 'password')
}

function findBy() {

}

async function add(user) {


}

function findById(id) {
    return db('users').where({ id }).first();
}