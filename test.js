// Extract unique objects by attribute from array of objects.
// Input: [
//    { name: 'Geeks', id: 10 },
//    { name: 'GeeksForGeeks', id: 10 },
//    { name: 'Geeks', id: 20 },
//    { name: 'Geeks', id: 10 }
// ];
// Output: [
//    { name: 'Geeks', id: 10 },
//    { name: 'GeeksForGeeks', id: 10 }
// ];

objects = [
   {
      name: 'Geeks',
      id: 10
   },
   {
      name: 'GeeksForGeeks',
      id: 10
   },
   {
      name: 'Geeks',
      id: 20
   },
   {
      name: 'Geeks',
      id: 10
   }
];

let mymap = new Map();

unique = objects.filter(el => {
   const val = mymap.get(el.name);
   if (val) {
      if (el.id < val) {
         mymap.delete(el.name);
         mymap.set(el.name, el.id);
         return true;
      } else {
         return false;
      }
   }
   mymap.set(el.name, el.id);
   return true;
});

console.log(unique);

/// OR
books = [
   { title: 'C++', author: 'Bjarne' },
   { title: 'Java', author: 'James' },
   { title: 'Python', author: 'Guido' },
   { title: 'Java', author: 'James' }
];

// Display the list of array objects
console.log(books);

// Declare a new array
let newArray = [];

// Declare an empty object
let uniqueObject = {};

// Loop for the array elements
for (let i in books) {
   // Extract the title
   objTitle = books[i]['title'];

   // Use the title as the index
   uniqueObject[objTitle] = books[i];
}

// Loop to push unique object into array
for (i in uniqueObject) {
   newArray.push(uniqueObject[i]);
}

// Display the unique objects
console.log(newArray);

// How to group an array of objects through a key using Array reduce in javascript

const people = [
   { word: 'A', example: 'ex1..' },
   { word: 'A', example: 'ex2..' },
   { word: 'B', example: 'ex1..' }
];

function groupBy(arr, property) {
   return arr.reduce((result, currentValue) => {
      const key = currentValue[property]; //obj[property]
      console.log(result);
      //   console.log(key); 21 .. 20 ..20
      // If an array already present for key,
      //    push it to the array.Else create an array and
      //    push the object
      if (!result[key]) {
         result[key] = [];
      }
      result[key].push(currentValue);
      // Initial value for `result`
      // {}
       
      // After first iteration
      // {
      //    A: [{ word: 'A', example: 'ex1..' }];
      // }
      // After second iteration
      //    {
      //        A: [
      //            { word: 'A', example: 'ex1..' },
      //            { word: 'A', example: 'ex2..' }
      //        ]
      //    }
      // After final iteration
      // {
      //   A: [
      //    { word: 'A', example: 'ex1..' },
      //    { word: 'A', example: 'ex2..' }
      // ],
      //   B: [ { word: 'B', example: 'ex1..' } ]
      // }
      // Return the current iteration `result` value, this /
      //will be taken as next iteration `result` value and /
      //accumulate
      return result;
   }, {}); // empty object is the initial value for result object
}
const groupedPeople = groupBy(people, 'word');
console.log(groupedPeople);


const O = {
   ab_pd: "jdfls"
}
console.log( O );