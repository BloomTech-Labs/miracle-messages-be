const db = require('../config/dbConfig.js');

module.exports = {
  add,
  getUsers,
  findById,
  updateUser,
  deleteUser
};

function getUsers(filter) {
  if(!filter){
    return db('volunteers')
  } else {
    return db('volunteers').where(filter).first();
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


//destructures the update info and places default values 
//submits update info and returns user
async function updateUser(updateInfo, currentInfo, id) {
  const { 
    email = currentInfo.email,
    name = currentInfo.name,
    profile_img_url = currentInfo.profile_img_url,
    city = currentInfo.city,
    state = currentInfo.state,
    country = currentInfo.country } = updateInfo
  const update = {email, name, profile_img_url, city, state, country}

  await db('volunteers').update(update).where("oktaid", id)

  return await findById({"oktaid" : id})
}


function deleteUser(id) {
  return db('volunteers')
    .where("oktaid", id)
    .del();
}