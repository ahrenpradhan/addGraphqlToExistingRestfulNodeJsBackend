const fs = require("fs");
const path = require("path");
const { verifyToken } = require("./authenticate");
const merge = require("lodash/merge");
const { ApolloServer, gql } = require("apollo-server-express");
// const resolvers = require("./api/resolvers");
// const typeDefs = gql(
//   fs.readFileSync(`${__dirname}/api/typeDefs.graphql`, { encoding: "utf-8" })
// );

const baseTypeDefs = gql`
  type Query
`;

const startGraphqlServer = ({
  app,
  typeDefs = {},
  resolvers = {},
  context = {},
  path = null,
}) => {
  const server = new ApolloServer({ typeDefs, resolvers, context });
  server.applyMiddleware({ app, path: `/graphql/${path}` });
  console.log(
    `        |- GraphQl endpoint for database ${path} is exposed at /graphql/${path}\n`
  );
};

const CURRENT_FOLDER_PATH = `${__dirname}/`;
const initApolloServer = ({ app = null }) => {
  if (app === null) {
    console.log("Express instance not provided in the initializer");
  } else {
    console.log(`|-- Initiallizing graphql instance --|`);
    fs.readdirSync(CURRENT_FOLDER_PATH)
      .filter(
        (file) =>
          file.indexOf(".") === -1 &&
          fs.readdirSync(path.join(CURRENT_FOLDER_PATH, file)).length === 2
      )
      .forEach((file) => {
        console.log(`  |- Initiallizing graphql apollo server for ${file}`);
        console.log(`     |- Setting typedefs for ${file}`);
        const typeDefs = [
          baseTypeDefs,
          ...fs
            .readdirSync(path.join(CURRENT_FOLDER_PATH, file, "typeDefs"))
            .map((_typeDefsFile) =>
              gql(
                fs.readFileSync(
                  path.join(
                    CURRENT_FOLDER_PATH,
                    file,
                    "typeDefs",
                    _typeDefsFile
                  ),
                  { encoding: "utf-8" }
                )
              )
            ),
        ];
        console.log(`     |- Setting resolvers for ${file}`);
        const resolvers = fs
          .readdirSync(path.join(CURRENT_FOLDER_PATH, file, "resolvers"))
          .map((_resolversFiles) =>
            require(path.join(
              CURRENT_FOLDER_PATH,
              file,
              "resolvers",
              _resolversFiles
            ))
          )
          .reduce((acc, current) => merge(acc, current), { Query: {} });
        console.log(`     |- Setting context for ${file}`);
        const context = async ({ req, res }) => {
          const db = require(path.join(
            CURRENT_FOLDER_PATH,
            "..",
            "sequelize",
            "models",
            file
          ));
          // validate user token
          const validation_response = await verifyToken(req, res, db);
          // validate permissions
          // -- to do
          if (!validation_response.status) {
            throw new "Access is denied"();
          }
          return {
            db,
            user: {
              authorized: validation_response.status,
              permissions: ["*"],
            },
          };
        };
        startGraphqlServer({
          app,
          typeDefs,
          resolvers,
          // resolvers: require(path.join(CURRENT_FOLDER_PATH, file, "resolvers")),
          context,
          path: file,
        });
      });
  }
};

module.exports = {
  initApolloServer,
};
