const people = [
  {
    name: "Rahul",
    age: 32,
    city: "Pune",
    education: ["Computer science"],
    ownsCar: true,
    employmentStatus: true,
    profession: "Software engineer",
    pets: [
      {
        type: "Dog",
        breed: "Goldern retriever",
        name: "Max",
        age: 4,
        vaccinated: true,
        isFullyVaccinated: true,
        favouriteActivities: ["playing fetch"]
      }
    ],
    hobbies: [
      { type: "games", categories: ["playing chess"] },
      { type: "gardening", categories: [] }
    ]
  },

  {
    name: "Ananya",
    age: 30,
    city: "Banglore",
    education: ["Computer science", "Minor in Graphic design"],
    employmentStatus: false,
    ownsCar: false,
    profession: "",
    pets: [
      {
        type: "Parrot",
        breed: "",
        name: "Kiwi",
        age: 5,
        vaccinated: true,
        isFullyVaccinated: false,
        favouriteActivities: ["mimicking Ananya's voice"]
      }
    ],
    hobbies: [
      { type: "cooking", categories: ["experiments with Italian recipes"] }
    ]
  },

  {
    name: "Ramesh",
    age: 45,
    city: "Jaipur",
    education: [],
    employmentStatus: true,
    ownsCar: false,
    profession: "Business Owner",
    pets: [
      {
        type: "Cat",
        breed: "Persian",
        name: "Bella",
        age: 3,
        vaccinated: true,
        isFullyVaccinated: true,
        favouriteActivities: ["love lounging in the sun"]
      },
      {
        type: "Cat",
        breed: "Persian",
        name: "Leo",
        age: 3,
        vaccinated: true,
        isFullyVaccinated: true,
        favouriteActivities: ["love lounging in the sun"]
      }
    ],
    hobbies: [
      { type: "gardening", categories: ["tending to his rose garden"] },
      { type: "reading", categories: ["historical fiction"] }
    ]
  },
  {
    name: "Kavya",
    age: 28,
    city: "Chennai",
    education: [],
    employmentStatus: false,
    ownsCar: false,
    profession: "",
    pets: [
      {
        type: "Rabbit",
        breed: "",
        name: "Snowy",
        age: 2,
        vaccinated: true,
        isFullyVaccinated: false,
        favouriteActivities: ["enjoys hopping around in backyard", "nibbling on carrots"]
      },
    ],
    hobbies: [
      { type: "reading", categories: ["modern fantasy novels"] },
      { type: "binge watching", categories: ["science fiction shows"] }
    ]
  }
];

const count = (array, predicate) => array.filter(predicate).length;

const petsOf = (people) => people.flatMap(person => person.pets);

const map = (array, mapper) => array.map(mapper);

const filter = (array, predicate) => array.filter(predicate);

// 1. How many individuals are currently employed?
const numberOfEmployedPeople = (people) =>
  count(people, person => person.employmentStatus);

// 2. How many people own a car?
const peopleOwningCar = people => count(people, person => person.ownsCar);

// 3. How many pets are fully vaccinated?
const fullyVaccinated = (people) => {
  const pets = petsOf(people);
  return count(pets, pet => pet.isFullyVaccinated);
};

// 4. What are the names of all the pets, and what type of animal is each?
const getPetNameAndType = ({ name, type }) => ({ name, type });

const nameAndTypeOfAllPets = (people) => {
  const pets = petsOf(people);
  return map(pets, getPetNameAndType);
};

// 5. Which cities do the individuals live in?
const residenceCities = (people) => map(people, person => person.city);

// 6. How many hobbies are shared across the group? What are they?
const getHobbies = person => map(person.hobbies, hobbies => hobbies.type);

const removeDuplicates = (uniqueList, element) => {
  if (!uniqueList.includes(element)) {
    uniqueList.push(element);
  }

  return uniqueList;
};

const hobbiesList = (people) => {
  const listOfHobbies = people.flatMap(getHobbies);
  const uniqueListOfHobbies = listOfHobbies.reduce(removeDuplicates, []);

  return {
    numOfHobbies: uniqueListOfHobbies.length,
    listOfHobbies: uniqueListOfHobbies
  };
};

// 7. How many pets belong to people who are currently unemployed?
const numOfPetsWithUnemployedPeople = (people) => {
  const unemployedPeople = filter(people, person => !person.employmentStatus);

  return petsOf(unemployedPeople).length;
};

// 8. What is the average age of the individuals mentioned in the passage?
const extractAge = (people) => map(people, person => person.age);

const getSum = (numbers) => numbers.reduce((sum, num) => sum + num, 0);

const average = (numbers) => getSum(numbers) / numbers.length;

const averageAgeOfPeople = (people) => average(extractAge(people));

// 9. How many individuals have studied computer science, and how many of them have pets?
const CS = "Computer science";
const studiedComputerScience = people =>
  filter(people, person => person.education.includes(CS));

const hasPet = (person => person.pets.length !== 0);

const studiedCSAndHavePets = (people) => {
  const peopleStudiedCS = studiedComputerScience(people);
  const petCount = count(peopleStudiedCS, hasPet);

  return { studiesCS: peopleStudiedCS.length, petsCount: petCount };
};

// 10. How many individuals own more than one pet?
const moreThanOnePet = people =>
  count(people, person => person.pets.length > 1);

// 11. Which pets are associated with specific favorite activities?
const getPetsNameAndFavActivities = ({ name, favouriteActivities }) =>
  ({ name, favouriteActivities });

const petsHavingFavouriteActivities = (people) => {
  const pets = petsOf(people);

  return map(pets, getPetsNameAndFavActivities);
};

// 12. What are the names of all animals that belong to people who live in Bangalore or Chennai?
const cities = ["Chennai", "Banglore"];

const isPersonFromBangloreOrChennai = (person => cities.includes(person.city));

const animalFromBangloreOrChennai = (people) => {
  const peopleFromBglChe = filter(people, isPersonFromBangloreOrChennai);
  const pets = petsOf(peopleFromBglChe);

  return map(pets, pet => pet.name);
};

// 13. How many vaccinated pets belong to people who do not own a car?
const personDoesntOwnACar = (person => !person.ownsCar);
const vaccinatedPets = (pet => pet.vaccinated);

const nonCarOwnersWithVaccinatedPets = (people) => {
  const peopleNotOwningCar = filter(people, personDoesntOwnACar);
  const pets = petsOf(peopleNotOwningCar);

  return count(pets, vaccinatedPets);
};

// 15. How many individuals have more than two hobbies?
const moreThanTwoHobbies = people =>
  count(people, person => person.hobbies.length > 2);

// 18. What types of books are mentioned as interests, and who reads them?
const isHobbyReading = (hobby => hobby.type === "reading");

const booksReadByPeople = (people) => {
  return filter(people, person => person.hobbies.find(isHobbyReading));
};//incomplete

// 19. How many individuals live in cities starting with the letter "B"?
const citiesStartingWithB = people =>
  count(people, person => person.city.startsWith("B"));

// 20. Which individuals do not own any pets?
const invert = function (f) {
  return function (...args) {
    return !f(...args);
  };
};

const peopleNotOwningPets = (people => filter(people, invert(hasPet)));

// 14. What is the most common type of pet among the group?

// 16. How many individuals share at least one hobby with Ramesh?

// 17. Which pet is the youngest, and what is its name?