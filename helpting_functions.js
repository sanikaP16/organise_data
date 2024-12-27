export const count = (array, predicate) => array.filter(predicate).length;

export const reductions = (array, reducer, init) => array.reduce(reducer, init);

export const petsOf = (people) => people.flatMap(person => person.pets);
