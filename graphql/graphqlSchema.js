// const {
//   GraphQLInt,
//   GraphQLBoolean,
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLList,
//   GraphQLString,
// } = require("express-graphql");

// const UserType = new GraphQLObjectType({
//   name: "User",

//   fields: () => ({
//     id: { type: GraphQLInt },
//     name: {
//       type: GraphQLString,
//       description: "",
//     },
//     phone: {
//       type: GraphQLInt,
//       description: "",
//     },
//     email: {
//       type: GraphQLString,
//       description: "",
//     },
//     profileImage: {
//       type: GraphQLString,
//       description: "",
//     },
//     password: {
//       type: GraphQLString,
//       description: "",
//     },

//     country: {
//       type: GraphQLString,
//       description: "",
//     },

//     isAdmin: {
//       type: GraphQLBoolean,
//       description: "",
//     },
//     role: {
//       type: GraphQLString,
//       description: "",
//     },
//     passwordRestToken: {
//       type: GraphQLString,
//       description: "",
//     },
//     passwordChangedAt: {
//       type: GraphQLString,
//       description: "",
//     },
//     passwordRestExpire: {
//       type: GraphQLString,
//       description: "",
//     },
//   }),
// });

// const RootQuery = new GraphQLObjectType({
//   name: "Query",
//   fields: () => ({
//     user: {
//       type: new GraphQLList(UserType),
//       resolve: (_, arg) => {
//         return User.find();
//       },
//     },
//   }),
// });
// const schema = new GraphQLSchema({
//   query: RootQuery,
// });

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     graphiql: true,
//   })
// );
