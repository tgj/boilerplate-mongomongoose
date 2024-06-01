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
      console.log("Person saved: " + doc);
      done(null, doc);
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
  Person.create(arrayOfPeople)
    .then((doc) => {
      done(null, doc);
      console.log("People saved: " + doc);
    })
    .catch((err) => {
      console.log(err);
    });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: { $regex: personName, $options: "i" } })
    .then((doc) => {
      console.log("Person found: " + doc);
      done(null, doc);
    })
    .catch((err) => {
      console.log(err);
    });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: { $regex: food, $options: "i" } })
    .then((doc) => {
      console.log("Person found: " + doc);
      done(null, doc);
    })
    .catch((err) => {
      console.log(err);
    });
};

const findPersonById = (personId, done) => {
  Person.findById(personId)
    .then((doc) => {
      console.log("Person found: " + doc);
      done(null, doc);
    })
    .catch((err) => {
      console.log(err);
    });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId)
    .then((doc) => {
      console.log("Person found: " + doc);
      doc.favoriteFoods.push(foodToAdd);
      savePerson(doc, done);
    })
    .catch((err) => {
      console.log(err);
    });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  const filter = { name: personName };
  const update = { age: ageToSet };
  Person.findOneAndUpdate(filter, update, { new: true })
    .then((doc) => {
      console.log("Person updated: " + doc);
      done(null, doc);
    })
    .catch((err) => {
      console.log(err);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId)
    .then((doc) => {
      console.log("Person removed: " + doc);
      done(null, doc);
    })
    .catch((err) => {
      console.log(err);
    });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  const filter = { name: nameToRemove };
  Person.remove(filter)
    .then((doc) => {
      console.log(
        `Number of people named ${nameToRemove} successfully deleted: ${doc.n}`
      );
      done(null, doc);
    })
    .catch((err) => {
      console.log(err);
    });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const filter = { favoriteFoods: [foodToSearch] };
  const includedFields = ["name", "favoriteFoods"].join(" ");
  Person.find(filter, includedFields)
    .sort({ name: 1 })
    .limit(2)
    .select({ favoriteFoods: true })
    .exec()
    .then((docs) => {
      console.log("People found: ", docs);
      done(null, docs);
    })
    .catch((err) => {
      console.log(err);
    });
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
