const axios = require('axios')
const citizens = require("../data/preload");
//the  IDs shouls be read dynamically (from file system or env vars) in real scenario
const mocksIDs = [1, 3]

const payload = {"variables": {} }

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    citizen: async (_, { id }, context) => {

      payload.query = context.req.body.query
      operationName = context.req.body.operationName
      payload.operationName = operationName
      if (context.mocks === false && mocksIDs.includes(id)) {
        res = await axios
          .post('http://localhost:4005/graphql', payload)
        // If you wish the resolvers chain to continue,  dont send the response
        // directly thru express middleware. instead, use the following code:
        // return res.data.data.citizen;
                           
        return context.res.send({ data: { [operationName]: res.data.data[operationName] } });
      }
      else {
        return citizens.find(c => c.id == id);
      }
    },
    citizens: (_, { status }) => {
      return citizens.filter(c => !status || c.status === status);
    }
  },
  Citizen: {
    firstName: (citizen) => 'Mr. ' + citizen.firstName
  },
};
module.exports = resolvers
