const db = require('../config/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  updateUser
};

function getUsers(filter) {
  if(!filter){
    return db('volunteers')
  } else {
    return db('volunteers').where(filter);
  }
  
}

async function add(volunteer) {
  const [oktaid] = await db('volunteers').insert(volunteer, '*');
  return await findById(oktaid)
}

function findById(id) {
  return db('volunteers')
    .where(id)
    .first();
}

async function updateUser(updateInfo, currentInfo, id) {
  const { 
    email = currentInfo.email,
    fname = currentInfo.fname,
    lname = currentInfo.lname,
    profile_img_url = currentInfo.profile_img_url,
    city = currentInfo.city,
    state = currentInfo.state,
    country = currentInfo.country } = updateInfo
  const update = {email, fname, lname, profile_img_url, city, state, country}

  await db('volunteers').update(update).where("oktaid", id)

  return await findById(id)
}