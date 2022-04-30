const {
  findAllResolver,
  findOneResolver,
} = require("../../../sequelize/helper/resolvers");

const resolvers = {
  Query: {
    roles: async (parent, args, context, info) => {
      try {
        return await findAllResolver(parent, args, context, info, "roles");
      } catch (err) {
        console.log(err);
      }
    },
    role: async (parent, args, context, info) => {
      try {
        return await findOneResolver(parent, args, context, info, "roles");
      } catch (err) {
        console.log(err);
      }
    },
  },
  Role: {
    users: async (parent, args, context, info) => {
      try {
        if (!parent.dataValues.id) {
          throw new "role_id absent";
        }
        const response = await findAllResolver(
          parent,
          args,
          context,
          info,
          "users",
          {
            role_id: parent.dataValues.id,
          }
        );
        return response;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = resolvers;
