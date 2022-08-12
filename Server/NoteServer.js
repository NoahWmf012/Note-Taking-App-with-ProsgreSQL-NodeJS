const { resolve } = require("path");

class NoteServer {
  constructor(knex) {
    this.knex = knex;
  }

  read(user) {
    return this.knex("users")
      .select("notes.content", "notes.id")
      .join("notes", "users.id", "notes.user_id")
      .where("username", user);
  }

  add(content, user) {
    return this.knex("users")
      .select("id")
      .where("username", user)
      .first()
      .then((data) => {
        return this.knex("notes").insert({
          user_id: data.id,
          content: content,
        });
      });
  }

  update(index, content, user) {
    return this.knex("users")
      .select("id")
      .where("username", user)
      .first()
      .then(() => {
        return this.knex("notes").where("id", index).update({
          content: content,
        });
      });
  }

  remove(index) {
    return this.knex("notes").where("id", index).del();
  }
}

module.exports = NoteServer;
