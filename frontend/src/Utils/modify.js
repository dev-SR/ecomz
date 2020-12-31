const people = [
   { word: 'A', example: 'ex1..' },
   { word: 'A', example: 'ex2..' },
   { word: 'B', example: 'ex1..' }
];
export const convertAccordingToProperty = (arr, propertyOfobj) => {
   return arr.reduce((result, currentValue) => {
      const key = currentValue[propertyOfobj]; //obj[property]
      if (!result[key]) {
         result[key] = [];
      }
      result[key].push(currentValue);
      return result;
   }, {}); // empty object is the initial value for result object
};

// const groupedPeople = convertAccordingToProperty(people, 'word');
// console.log(groupedPeople);
// {
//   A: [ { word: 'A', example: 'ex1..' }, { word: 'A', example: 'ex2..' } ],
//   B: [ { word: 'B', example: 'ex1..' } ]
// }

export const getAutoCompleteOptions = obj => {
   var keys = [];
   for (var key in obj) {
      keys.push(key);
   }
   return keys;
};

// console.log(getKeys(groupedPeople));
// [ 'A', 'B' ]

// console.log(people.find(item => item.word === 'A'));
// { word: 'A', example: 'ex1..' }
