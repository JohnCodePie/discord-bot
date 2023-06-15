const Group = require("../../commons/group.js");
const groups = [];

module.exports = {
  async createGroup() {
    let newGroup = new Group();
    const id = newGroup.id;
    groups.push(newGroup);
    return id;
  },

  async getGroups() {
    return groups;
  },

  async getGroupById(id) {
    const group = groups.find((element) => {
      return element.getId() == id;
    });
    return group;
  },
};
