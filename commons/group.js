class Group {
  id = 0;
  participants = [];

  constructor() {
    this.id = Math.floor(Math.random() * 10000);
  }

  addParticipant(name) {
    this.participants.push(name);
  }

  getId() {
    return this.id;
  }

  getParticipants() {
    return this.participants;
  }
}

module.exports = Group;
