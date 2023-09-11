//a common class for user related functions and data like: name, id, etc.
class User {
  id = 0;
  name = "";

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }
}

module.exports = User;
