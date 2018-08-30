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
        });

    })
}

//write score to file as string
let writeToFile = (scores) => {
        let stringArray = [];
        let count = 1;
        for(var prop in scores) {
            stringArray.push(count + '. ' + prop + ', ' + scores[prop] + '\n')
            count++
        }
        let finalData = stringArray.join(" ")
        fs.writeFile("output.txt", finalData, (err) => {
            if(err) {
                return console.log('Error: ' + err);
            }
        
            console.log("Success");
        }); 
}


let input = fs.createReadStream('sample-input.txt');
readLines(input, func);
