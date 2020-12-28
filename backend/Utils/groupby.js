module.exports.groupBy = (arr, property) => {
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
};
