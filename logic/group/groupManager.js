const Group = require("../../commons/group.js");
const groups = [];

module.exports = {
  async createGroup() {
    let newGroup = new Group();
    const id = newGroup.id;
    groups.push(newGroup);
    return id;
  },

  //removes specific participant from group by id and name
  async removeParticipants(id, name) {
    const group = groups.find((element) => {
      return element.getId() == id;
    });
    if (!group) {
      return;
    }
    group.removeParticipant(name);
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
