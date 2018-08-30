let fs = require('fs');

let arrayOfElem = [];
let scores = {};
////////////////////////////////////
// If two or more teams have the same number of points,
// they should have the same rank and be printed in alphabetical order (as in the
// tie for 3rd place in the sample data).
////////////////////////////////////

//read txt file
let readLines = (input, func) => {
  let item = '';
  input.on('data', (data) => {
    item += data;
    let index = item.indexOf('\n');
    while (index > -1) {
      let line = item.substring(0, index);
      item = item.substring(index + 1);
      func(line);
      index = item.indexOf('\n');
    }
    tallyScore(arrayOfElem)
    writeToFile(scores)
  });
  input.on('end', () => {
    if (item.length > 0) {
      func(item);
    }
  });
}

//create groups of scores to compare
let func = (data) => {
    let arr = data.split(",")
    arr = arr.map(x => x.trim().split(" "))
    for(let i = 0; i < arr.length; i++){
        if(arr[i].length > 2){
            arr[i] = arr[i].slice(0, arr[i].length).join("").split(/([0-9]+)/)
        }
    }

    for(var i = 0; i < arr.length; i++){
      console.log(arr[i])
    }
    let obj = {};
    arr.forEach((data) => {obj[data[0]] = data[1]});
    arrayOfElem.push(obj)
}

//compare and add up scores for each
let tallyScore = (array) => {
    array.forEach(x => {
        Object.keys(x).reduce((a, b) => {
            if(!scores[a]){
                scores[a] = 0
            } 
            if(!scores[b]){
                scores[b] = 0
            }
            if(x[a] === x[b]){
                scores[a]++
                scores[b]++
            }
            if(x[a] > x[b]){
                scores[a] = scores[a] + 3
            }
            if(x[a] < x[b]){
                scores[b] = scores[b] + 3
            }

            //     !scores[a] ?
            //         scores[a] = 0
            //     : !scores[b] ?
            //         scores[b] = 0
            //     : x[a] === x[b] ?
            //         scores[a]++ 
            //         &&
            //         scores[b]++
            //     : x[a] > x[b] ?
            //         scores[a] = scores[a] + 3
            //     : 
            //         scores[b] = scores[b] + 3

            // // }
            // // switch(scores, x) {
            // //     case (!scores[a]):
            // //         scores[a] = 0
            // //         break;
            // //     case (!scores[b]):
            // //         scores[b] = 0
            // //         break;
            // //     case (x[a] === x[b]):
            // //         scores[a]++
            // //         scores[b]++
            // //         break;
            // //     case (x[a] > x[b]):
            // //         scores[a] = scores[a] + 3
            // //         break;
            // //     case (x[a] < x[b]):
            // //         scores[b] = scores[b] + 3
            // //         break;
            // //     default:
            // //         scores
            // //         break;
            // // }
        });

    })
}

//write score to file as string
let writeToFile = (scores) => {
  let arrayOfStrings = [];
  let count = 1;
  for(var prop in scores) {
    arrayOfStrings.push(count + '. ' + prop + ', ' + scores[prop] + '\n')
    count++
  }
  let string = arrayOfStrings.join(" ")
  fs.writeFile("output.txt", string, (err) => {
    if(err) {
      return console.log('Error: ' + err);
    }
    console.log("Success");
  }); 
}


let input = fs.createReadStream('sample-input.txt');
readLines(input, func);
