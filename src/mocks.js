
const mocks = {
    Citizen: (_, { id }) => {
      return {
        id: 1,
        firstName: "עדה",
        lastName: "יונת",
        addressId: 10,
        IDFId: 100,
        status: "PERMANENT"
      }
    }
  };

  module.exports = mocks