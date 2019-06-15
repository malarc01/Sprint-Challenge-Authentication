const info = require('../database/dbConfig')



module.exports = {
  add,
  find,
  findBy,
  findById,
}

function find(){
  return info('users').select('id','username')
}

function findBy(filter){
  return info('users').where(filter)
}

async function add(user) {
  const [id] = await info('users').insert(user);

  return findById(id);
}

function findById(id){
  return info('users')
  .select('id', 'username')
  .where({id})
  .first();
}