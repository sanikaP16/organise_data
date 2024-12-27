import { people } from "./data_.js";

const count = (array, predicate) => array.filter(predicate).length;

const reductions = (array, reducer, init) => array.reduce(reducer, init);

const petsOf = (people) => people.flatMap(person => person.pets);

//-----------------------------------------------------------------------------
// 1. How many individuals are currently employed?  
const countOfEmployedPeople = (people) => {
  return count(people, person => person.employment.isEmployed);
};

// 2. How many people own a car ?
const howManyOwnCar = (people) => {
  return count(people, ({ hasCar }) => hasCar);
};

// 3. How many pets are fully vaccinated?
const countVaccinated = (people) => {
  const pets = petsOf(people);
  return count(pets, pet => pet.isFullyVaccinated);
};

// 4. What are the names of all the pets, and what type of animal is each?
const animalInfo = (people) => {
  const pets = petsOf(people);
  return pets.map(({ name, typeOfPet: type }) => ({ name, type }));
};

// 5. Which cities do the individuals live in?
const getCities = (people) => {
  return people.map(({ name, city }) => ({ name, city }));
};

// 6. How many hobbies are shared across the group? What are they?*(****)
const getHobbies = people => people.flatMap(({ hobbies }) => hobbies);

const getUniqueList = (accumalator, element) => {
  if (!accumalator.includes(element)) {
    accumalator.push(element);
  }

  return accumalator;
};

const hobbiesList = () => {
  const listOfHobbies = getHobbies(people);
  const uniqueListOfHobbies = listOfHobbies.reduce(getUniqueList, []);

  return {
    numberOfHobbies: uniqueListOfHobbies.length,
    Hobbies: uniqueListOfHobbies
  };
};

// 7. How many pets belong to people who are currently unemployed?
const getpetsOfUnemployed = (people) => {
  const unemployedPeople = people.filter(person => !person.employment.isEmployed);

  return petsOf(unemployedPeople).length;
};

// 8. What is the average age of the individuals mentioned in the passage?
const getAverageAge = (people) => {
  const sumOfAges = reductions(people, (sum, { age }) => age + sum, 0);
  const averageOfAges = sumOfAges / people.length;

  return averageOfAges;
};

// 9. How many individuals have studied computer science, and how many of them have pets?
const getPeopleStudiedCS = people => people.filter(person =>
  person.education.includes("Computer Science"));

const hasPet = (person => person.pets.length !== 0);

const getpetsCount = (people) => {
  const peopleStudiedCS = getPeopleStudiedCS(people);
  const petCount = count(peopleStudiedCS, hasPet);

  return { peopleStudiedCS: peopleStudiedCS.length, CountOfpets: petCount };
};

// 10. How many individuals own more than one pets?
const moreThanOnepets = (people) => {
  return count(people, person => person.pets.length > 1);
};

// 11. Which pets are associated with specific favorite activities?
const mapPetAndActivity = ({ name, favoriteActivity }) =>
  ({ name, favoriteActivity });

const favActivities = (people) => {
  const pets = petsOf(people);

  return pets.map(mapPetAndActivity);
};

// 12. What are the names of all animals that belong to people who live in Bangalore or Chennai?
const getPeopleFormCities = (people) => {
  const cities = ["Banglore", "Chennai"];

  return people.filter(person => cities.includes(person.city));
};

const nameOfAnimal = (people) => {
  const peopleFormCity = getPeopleFormCities(people);
  const petsFromPerticularCity = petsOf(peopleFormCity);

  return petsFromPerticularCity.map(pet => pet.name);
};

// 13. How many vaccinated pets belong to people who do not own a car?
const vaccinatedPets = (people) => {
  const peopleWithoutCar = people.filter(({ hasCar }) => !hasCar);
  const pets = petsOf(peopleWithoutCar);

  return count(pets, pet => pet.isVaccinated);
};

// 14. What is the most common type of pet among the group? 
//  need to change
const commonPet = people => {
  const petType = people.flatMap(person => person.pets)
    .map(pet => pet.typeOfPet);

  const frequencyMap = petType.reduce((counts, string) => {
    counts[string] = (counts[string] || 0) + 1;
    return counts;
  }, {});

  let mostCommon = null;
  let maxCount = 0;

  for (const type in frequencyMap) {
    if (frequencyMap[type] > maxCount) {
      mostCommon = type;
      maxCount = frequencyMap[type];
    }
  }

  return mostCommon;
};

// 15. How many individuals have more than two hobbies?
const moreThanTwoHobbies = (people) =>
  count(people, person => person.hobbies.length > 2);


// 16. How many individuals share at least one hobby with Ramesh? 
// need to change
const sameHobbiesWithRamesh = (people) => {
  const targetPerson = people.find(({ name }) => name === "Ramesh");
  const targetHobbies = targetPerson.hobbies;

  const getCount = (count, person) => {
    if (person.name !== targetPerson) {
      const someShared = person.hobbies.some(hobby =>
        targetHobbies.includes(hobby));
      if (someShared) {
        count++;
      }
    }

    return count;
  }

  return people.reduce(getCount, 0);
};

// 17. Which pets is the youngest, and what is its name?
const getYoungPet = (accumalator, pet) => {
  if (Object.keys(accumalator).length === 0) {
    return pet;
  }

  return accumalator.age > pet.age ? pet : accumalator;
};

const youngestPet = (people) => {
  const pets = petsOf(people);
  const youngPet = pets.reduce(getYoungPet, []);

  return { nameOfPet: youngPet.name, age: youngPet.age };
};

// 18. What types of books are mentioned as interests, and who reads them?
//  not completed

// 19. How many individuals live in cities starting with the letter "B"?
const livingInCityB = (people) => {
  return count(people, (({ city }) => city.startsWith("B")))
};

// 20. Which individuals do not own any pets?
const peopleWitoutPets = (people) => {
  return people.filter(({ pets }) =>
    pets.length === 0).map(({ name }) => name);
};

//------------------------------------------------------------------------------
const testAll = function () {
  console.log(countOfEmployedPeople(people));
  console.log(howManyOwnCar(people));
  console.log(countVaccinated(people));
  console.log(animalInfo(people));
  console.log(getCities(people));
  console.log(hobbiesList(people));
  console.log(getpetsOfUnemployed(people));
  console.log(getAverageAge(people));
  console.log(getpetsCount(people));
  console.log(moreThanOnepets(people));
  console.log(favActivities(people));
  console.log(nameOfAnimal(people));
  console.log(vaccinatedPets(people));
  console.log(moreThanTwoHobbies(people));
  console.log(youngestPet(people));
  console.log(livingInCityB(people));
  console.log(peopleWitoutPets(people));
  // console.log(commonPet(people));
  // console.log(sameHobbiesWithRamesh(people));
}

testAll();