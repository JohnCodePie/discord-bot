class Group {
  id = 0;
  participants = [];

  constructor() {
    this.id = Math.floor(Math.random() * 10000);
  }

  addParticipant(name) {
    this.participants.push(name);
  }

  // removes specific participant from group by name
  removeParticipant(name) {
    const index = this.participants.indexOf(name);
    if (index > -1) {
      this.participants.splice(index, 1);
    }
  }

  getId() {
    return this.id;
  }

  getParticipants() {
    return this.participants;
  }
}

module.exports = Group;
