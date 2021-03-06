const { preload } = require("./preload");
const { idfAPI } = require("./RestAPI/idfAPI");
const { addressAPI } = require("./RestAPI/addressAPI");
const { ApolloServer, gql } = require("apollo-server");

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  
  type Citizen {
    id: Int!
    firstName: String
    lastName: String 
    address: Address
    idfRecord: IDFRecord
    status: CitizenshipStatus
  }

  type Address {
    """
    כתובת האזרח כפי שרשומה ברשות האוכלוסין
    """
    id: Int!
    city: String 
    street: String
    citizen: Citizen
  }

  type IDFRecord {
    id: Int!
    idfServedDays: [IDFServedDays]
    citizen: Citizen
  }

  type IDFServedDays {
    year: Int
    days: Int
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    citizen(id: Int!): Citizen,
    citizens(status: CitizenshipStatus): [Citizen]
  }  

  enum CitizenshipStatus { 	PERMANENT TEMPORARY FOREIGNER }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    citizen: (_, { id }) => {
      return preload.citizens.find(c => c.id == id);      
    },
    citizens: (_, { status }) => {
      return preload.citizens.filter(c => !status || c.status === status);
    }
  },
  Citizen: {
    address: async function (citizen, _, { dataSources }) {
      return dataSources.addressAPI.getAddress(citizen.id);
    },
    idfRecord: async (citizen, _, { dataSources }) => {
      return preload.IDFRecords.find(idf => idf.citizenId === citizen.id);
    },
    firstName: (citizen) => 'YYY' + citizen.firstName
  },
  IDFRecord: {
    idfServedDays: idfRecord => idfRecord.servedDays
  }
};

const mocks = {
  Citizen: (_, { id }) => {
    if (id==1) {
      console.log('Mocking!!!')
    return {    
      id: 1,
      firstName:  "עדה",
      lastName: "יונת",
      addressId: 10,
      IDFId: 100,
      status: "PERMANENT"    
    }}
    else {
       return resolvers.Query.citizen(_,{id});
     
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  mockEntireSchema: false,
  mocks,  
  resolvers,
  dataSources: () => {
    return {
      idfAPI: new idfAPI(),
      addressAPI: new addressAPI()
    };
  },
  formatError: error => {
    console.log(error);
    return error;
  },
  context: ({ req }) => ({
    idNum: req.headers.idNum
  })
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
