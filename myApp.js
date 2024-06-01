require("dotenv").config();
let mongoose = require("mongoose");
const {
  uniqueNamesGenerator,
  Config,
  names,
} = require("unique-names-generator");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let Person = require("./models/person");

const getRandomFullName = () => {
  const dictionaryConfig = {
    dictionaries: [names],
  };
  return `${uniqueNamesGenerator(dictionaryConfig)} ${uniqueNamesGenerator(
    dictionaryConfig
  )}`;
};
const getRandomInteger = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

const createPerson = ({ name, age, favoriteFoods }) =>
  new Person({
    name,
    age,
    favoriteFoods,
  });

const createRandomPerson = (age) => {
  return createPerson({
    name: getRandomFullName(),
    age: getRandomInteger(age[0], age[1]),
    favoriteFoods: ["pasta", "tacos", "protein shakes"],
  });
};

const savePerson = (person, done = () => {}) => {
  person
    .save()
    .then((doc) => {
      done(null, doc);
      console.log("Person saved: " + doc);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createAndSavePerson = (done) => {
  const age = [18, 45];
  let person = createRandomPerson(age);
  savePerson(person, done);
};

const createManyPeople = (arrayOfPeople, done) => {
  const peopleArray = arrayOfPeople.map((person) => createPerson(person));
  console.log(peopleArray);
  Promise.all[
    peopleArray.forEach((person) => savePerson(person))
    // done(null, arrayOfPeople))
  ];
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
