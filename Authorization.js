const knexfile = require("./knexfile").development;

const knex = require("knex")(knexfile);

async function myAuthorizer(username, password, callback) {
  //'username' and 'password' are the input value in frontend
  //USER data
  let _user = await knex("note_users")
    .where(`username`, username)
    .then((data) => {
      return data;
    });

  if (_user[0].username === username && _user[0].password === password) {
    return callback(null, true);
  } else {
    return callback(null, false);
  }
}

module.exports = myAuthorizer;
