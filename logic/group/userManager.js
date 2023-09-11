const User = require("../../commons/user.js");
const { PrismaClient, Prisma } = require("@prisma/client");
const groups = [];
const prisma = new PrismaClient();

//manager to crud users in db
module.exports = {
  //create new user by name and returns user
  async createUser(name) {
    const createdUser = await prisma.users.create({
      data: {
        name: name,
      },
    });
    const userCopy = new User(createdUser.id, createdUser.name);
    return userCopy;
  },

  //get user by name and returns user
  async getUserByName(name) {
    const user = await prisma.users.findUniqueOrThrow({
      where: {
        name: name,
      },
    });
    const userCopy = new User(user.id, user.name);
    return userCopy;
  },

  //check if user exists by id and returns boolean
  async checkIfUserExistsByID(id) {
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (user) {
      return true;
    }
    return false;
  },

  async checkIfUserExistsByName(name) {
    const user = await prisma.users.findUnique({
      where: {
        name: name,
      },
    });
    if (user) {
      return true;
    }
    return false;
  },

  //get group by user id and returns array of groups
  async getGroupsByUserID(userId) {
    if (!(await this.checkIfUserExistsByID(userId)))
      throw "User does not exist! If you are new to the bot please write /register first!";

    const groups = await prisma.users_groups.findMany({
      where: {
        user_id: parseInt(userId),
      },
      include: {
        groups: true,
      },
    });
    const groupsCopy = groups.map((group) => group.groups.id);
    return groupsCopy;
  },

  //check if user exists by name if not create new user and returns user
  async checkUserExistsAndCreate(name) {
    if (!(await this.checkIfUserExistsByName(name))) {
      const createdUser = await this.createUser(name);
      return createdUser;
    } else {
      const user = await this.getUserByName(name);
      return user;
    }
  },
};
