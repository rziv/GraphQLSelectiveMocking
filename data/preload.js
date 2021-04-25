// This is a (sample) collection of citizens we'll be able to query
// the GraphQL server for.
const citizens = [
  {
    id: 1,
    firstName: "אבי",
    lastName: "כהן",
    addressId: 10,
    IDFId: 100,
    status: "PERMANENT"
  },
  {
    id: 2,
    firstName: "בני",
    lastName: "לוי",
    addressId: 20,
    IDFId: 200,
    status: "PERMANENT"
  },
  {
    id: 3,
    firstName: "גיימס",
    lastName: "פלדין",
    addressId: 30,
    IDFId: null,
    status: "FOREIGNER"
  },
  {
    id: 4,
    firstName: "טיילר",
    lastName: "דורסי",
    addressId: 40,
    IDFId: null,
    status: "TEMPORARY"
  },
  {
    id: 5,
    firstName: "גייקובן",
    lastName: "בראון",
    addressId: 50,
    IDFId: null,
    status: "FOREIGNER"
  },
];

module.exports  = citizens
  