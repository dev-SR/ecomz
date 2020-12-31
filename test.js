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
let arr = [
   {
      cat_id: 'bbebbde0-ed0d-4bc5-b0ef-7891e6883035',
      cat_name: 'Electronics',
      image:
         'https://www.polytechnichub.com/wp-content/uploads/2017/04/Electronic.jpg'
   },
   {
      cat_id: 'd03c6797-658f-4202-8d43-ca54dcf1afad',
      cat_name: 'Computers & Accessoriess',
      image:
         'https://cdn.thewirecutter.com/wp-content/uploads/2020/04/laptops-lowres-2x1--1024x512.jpg'
   },
   {
      cat_id: 'da7ee7ed-b5bf-4182-9f7b-1ccf4862d30e',
      cat_name: 'Holiday deals',
      image: 'https://www.picpedia.org/highway-signs/images/holiday.jpg'
   },
   {
      cat_id: '9d4c70b4-4976-4584-a8e2-7b2fa39aed10',
      cat_name: 'Books',
      image:
         'https://media.wired.com/photos/5be4cd03db23f3775e466767/master/w_2560%2Cc_limit/books-521812297.jpg'
   },
   {
      cat_id: 'c615641a-762e-494d-b131-09c0d215b93e',
      cat_name: 'Gaming Accessories',
      image:
         'https://images-na.ssl-images-amazon.com/images/I/71y%2BUGuJl5L._SL1500_.jpg'
   }
];
function groupBy(arr, property) {
   return arr.reduce((result, currentValue) => {
      const key = currentValue[property]; //obj[property]
      // console.log(result);
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
const groupedPeople = groupBy(arr, 'cat_name');
// console.log(groupedPeople);

var getKeys = function (obj) {
   var keys = [];
   for (var key in obj) {
      keys.push(key);
   }
   return keys;
};

console.log(getKeys(groupedPeople));

console.log(
   arr.find(item => {
      if (item.cat_name === 'Electronics') return item.cat_id;
   }).cat_id
);
