const { resolve } = require("path");

class NoteServer {
  constructor(file, fs) {
    this.file = file;
    this.fs = fs;
    this.note = {};
    this.init();
  }

  init() {
    new Promise((resolve, reject) => {
      this.read().then((data) => {
        this.note = data;
      });
    });
  }

  read() {
    return new Promise((resolve, reject) => {
      this.fs.readFile(this.file, "utf-8", (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(data));
      });
    });
  }

  write() {
    return new Promise((resolve, reject) => {
      this.fs.writeFile(this.file, JSON.stringify(this.note), (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  showAll(user) {
    return this.read().then(() => {
      if (this.note[user] === undefined) {
        return [];
      }
      return this.note[user];
    });
  }

  add(content, user) {
    if (this.note[user] === undefined) {
      this.note[user] = [];
    }
    this.note[user].push(content);
    return this.write();
  }

  update(index, content, user) {
    if (this.note[user] === undefined) {
      throw new Error("The user doesn't exist.");
    }
    if (this.note[user].length <= index) {
      throw new Error("Cannot find the note.");
    }
    this.note[user][index] = content;
    return this.write();
  }

  remove(index, user) {
    if (this.note[user] === undefined) {
      throw new Error("The user doesn't exist.");
    }
    if (this.note[user].length <= index) {
      throw new Error("Cannot find the note.");
    }
    this.note[user].splice(index, 1);
    return this.write();
  }
}

module.exports = NoteServer;
