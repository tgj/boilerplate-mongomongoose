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

const createAndSavePerson = (done) => {
  const [lowerAgeLimit, upperAgeLimit] = [18, 45];
  let person = new Person({
    name: getRandomFullName(),
    age: getRandomInteger(lowerAgeLimit, upperAgeLimit),
    favoriteFoods: ["pasta", "tacos", "protein shakes"],
  });
  person
    .save()
    .then((doc) => {
      done(null, doc);
      console.log("Person created: " + doc);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createManyPeople = (arrayOfPeople, done) => {
  done(null /*, data*/);
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
