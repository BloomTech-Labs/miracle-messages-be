const db = require('../config/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  updateUser
};

function find() {
  return db('volunteers').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('volunteers').where(filter);
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
  const { profile_img_url = currentInfo.profile_img_url,
    city = currentInfo.city,
    state = currentInfo.state,
    country = currentInfo.country } = updateInfo
  const update = {profile_img_url,city, state, country}

  await db('volunteers').update(update).where("oktaid", id)

  return await findById(id)
}