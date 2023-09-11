const Group = require("../../commons/group.js");
const { PrismaClient, Prisma } = require("@prisma/client");
const groups = [];
const prisma = new PrismaClient();
const UserManager = require("./userManager.js");

module.exports = {
  //creates new group and adds it to db and sets id to generated id from db and returns id
  async createGroup() {
    const createdGroup = await prisma.groups.create();
    const groupCopy = new Group(createdGroup.id);
    return groupCopy;
  },

  //get all participants from group by id and returns array of participants
  async getParticipantsByGroupID(groupId) {
    if (!(await this.checkIfGroupExists(groupId)))
      throw "Group does not exist!";
    const group = await prisma.users_groups.findMany({
      where: {
        group_id: parseInt(groupId),
      },
      include: {
        users: true,
      },
    });
    const participants = group.map((participant) => participant.users.name);
    return participants;
  },

  //check if user is already in group by id and name and returns boolean
  async checkIfUserIsInGroup(groupId, name) {
    const user = await UserManager.getUserByName(name);
    const group = await prisma.users_groups.findUnique({
      where: {
        user_id_group_id: {
          group_id: parseInt(groupId),
          user_id: user.id,
        },
      },
    });
    if (group) {
      return true;
    }
    return false;
  },

  async addParticipant(id, name) {
    const group = await this.getGroupById(id);

    //check if user exists if not create new user - need to do that because of discord, and i dont want that users need to register
    const user = await UserManager.checkUserExistsAndCreate(name);

    //check if user is already in group
    if (await this.checkIfUserIsInGroup(group.id, name))
      throw "User already in group!";

    const participation = await prisma.users_groups.create({
      data: {
        users: {
          connect: {
            id: user.id,
          },
        },
        groups: {
          connect: {
            id: group.id,
          },
        },
      },
    });
    return participation;
  },

  //check if group exists by id and returns boolean
  async checkIfGroupExists(id) {
    const group = await prisma.groups.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (group) {
      return true;
    }
    return false;
  },

  //removes specific participant from group by id and name
  async removeParticipant(groupid, name) {
    if (!(await this.checkIfGroupExists(groupid)))
      throw "Group does not exist!";

    if (!(await this.checkIfUserIsInGroup(groupid, name)))
      throw "User not in group!";

    const user = await UserManager.getUserByName(name);
    await prisma.users_groups.delete({
      where: {
        user_id_group_id: {
          group_id: parseInt(groupid),
          user_id: user.id,
        },
      },
    });
  },

  async getGroups() {
    return await prisma.groups.findMany();
  },

  // search db for group by id
  async getGroupById(id) {
    const group = await prisma.groups.findUniqueOrThrow({
      where: {
        id: parseInt(id),
      },
    });
    return group;
  },
};
