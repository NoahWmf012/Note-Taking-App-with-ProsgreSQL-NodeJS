const fs = require("fs");

function myAuthorizer(username, password, callback) {
  //'username' and 'password' are the input value in frontend
  //USER data
  const USERS = fs.readFileSync(
    "./Stores/user.json",
    "utf-8",
    async (err, data) => {
      if (err) {
        throw err;
      }

      return await data;
    }
  );
  let parsed = JSON.parse(USERS);
  let user = parsed.users.filter((user) => user.username == username);

  if (user[0].username === username && user[0].password === password) {
    return callback(null, true);
  } else {
    return callback(null, false);
  }
}

module.exports = myAuthorizer;
