var plotly = require('./node_modules/plotly')('ymwang0101','9EZIqJ0RqioXuJGCS8Lp');
const fs = require('fs');
const {performance} = require('perf_hooks');
var dataObj = [];
var newArray = [];
var prodArray;
var genreArray;
var graphFlag = true;

function parse(row){
    var insideQuote = false,                                             
        entries = [],                                                    
        entry = [];
    row.split('').forEach(function (character) {                         
      if(character === '"') {
        insideQuote = !insideQuote;                                      
      } else {
        if(character == "," && !insideQuote) {                           
          entries.push(entry.join(''));                                  
          entry = [];                                                    
        } else {
          entry.push(character);                                         
        }                                                                
      }                                                                  
    });
    entries.push(entry.join(''));                                        
    return entries;                                                      
}

function parseBracket(row){
    var insideBracket = false,
        skipSpace = false,                                           
        entries = [],                                                    
        entry = [];
    row.split('').forEach(function (character) {                         
      if(character === '{' || character === '}') {
        insideBracket = !insideBracket;                                      
      } else {
        if(skipSpace) {
            skipSpace = false;
            return;
        }

        if(character == "," && !insideBracket) {                         
          entries.push(entry.join(''));                                  
          entry = [];                            
          skipSpace = true;                        
        } else {
          entry.push(character);                                         
        }                                                                
      }                                                                  
    });
    entries.push(entry.join(''));                                        
    return entries;                                                      
}

function search(nameKey, myArray){
    let searchArray = nameKey.trim().split(" ");
    let re = new RegExp(searchArray.join(" "), "i");
    let results = myArray.filter(movie =>
        re.test(movie.title) ||
        re.test(movie.cast) ||
        re.test(movie.release_date) ||
        re.test(movie.production_companies) ||
        re.test(movie.genres) ||
        re.test(movie.keywords)
    );
    return results;
}

function searchKey(nameKey, category, myArray){
    let searchArray = nameKey.trim().split(" ");
    let re = new RegExp(searchArray.join(" "), "i");
    let results = myArray.filter(movie =>
        re.test(movie[category])
    );
    return results;
}

function searchForMovie(movieName, movieCategory) {
    // console.log(dataObj);
    if(movieCategory == 'all') {
        var result = search(movieName, dataObj);
        var titles = result.map(function(item) {
            return item.title;
        });
        return result;
    } else {
        var result = searchKey(movieName, movieCategory, dataObj);
        var titles = result.map(function(item) {
            return item.title;
        });
        return result;
    }
}

function addAMovie(movieObj) {
    dataObj.push(movieObj);
    if(Array.isArray(newArray) && newArray.length) {
        temp1 = parseBracket(movieObj.production_companies.replace(/[\[\]']+|name: |id: /g, ''));
        movieObj.production_companies = temp1;
        temp2 = parseBracket(movieObj.genres.replace(/[\[\]']+|name: |id: /g, ''));
        movieObj.genres = temp2;
        newArray.push(movieObj);
    }
}

function removeMovieEntry(movieId) {
    for(var i = 0; i < dataObj.length; i++) {
        if (dataObj[i].id === movieId) {
            var index = i;
            break;
        }    
    }
    dataObj.splice(index, 1);

    if(Array.isArray(newArray) && newArray.length) {
        newArray.splice(index, 1);
    }
}

function loadCsv() {
    var data;
    try {
        data = fs.readFileSync('./data/movies.csv', 'utf8');
    } catch (error) {
        console.log('Error:', e.stack);
    }
    var dataArray = data.split(/\r?\n/); 
    var columns = dataArray[0];
    var columnsNames = parse(columns);
    var dataLines = dataArray.slice(1);
    data = dataLines.map(parse);

        // dataObjects is the collection of ALL movies
    var dataObjects = data.map(function (arr) {
        var dataObject = {};
        columnsNames.forEach(function(columnName, i){
            dataObject[columnName] = arr[i];
        });
        return dataObject;
    });
    dataObjects.pop();
    dataObj = dataObjects;

    dataObj = dataObj.filter(movie => movie.budget > 0 && movie.vote_average > 0 && movie.popularity > 0
        && movie.runtime > 0 && movie.revenue > 0);

    return dataObj;
}

function loadModifiedCsv() {
    var data;
    try {
        data = fs.readFileSync('./data/data-backup.csv', 'utf8');
    } catch (error) {
        console.log('Error:', e.stack);
    }
    var dataArray = data.split(/\r?\n/); 
    var columns = dataArray[0];
    var columnsNames = parse(columns);
    var dataLines = dataArray.slice(1);
    data = dataLines.map(parse);

        // dataObjects is the collection of ALL movies
    var dataObjects = data.map(function (arr) {
        var dataObject = {};
        columnsNames.forEach(function(columnName, i){
            dataObject[columnName] = arr[i];
        });
        return dataObject;
    });
    dataObjects.pop();
    dataObj = dataObjects;

    return dataObj;   
}

function parseCSV() {

    newArray = [];

    dataObj.forEach((v, i) => {
        const val = (typeof v === 'object') ? Object.assign({}, v) : v;
        newArray.push(val);
    });

    for(var i = 0; i < newArray.length; i++) {
        let result = parseBracket(newArray[i].production_companies.replace(/[\[\]']+|name: |id: /g, ''));
        newArray[i].production_companies = result;
    }

    for(var i = 0; i < newArray.length; i++) {
        let result = parseBracket(newArray[i].genres.replace(/[\[\]']+|name: |id: /g, ''));
        newArray[i].genres = result;
    }

    return newArray;
}

function reverseParse() {
    var result, columns;
    var insideQuote = false,
  
    columns = Object.keys(dataObj[0]);
    result = '';
    result += columns.join(',');
    result += '\n';
    dataObj.forEach(function(item) {
      var ctr = 0;
      columns.forEach(function(columns) {
        if (ctr > 0) result += ',';
        result += "\"" + item[columns] + "\"";
        ctr++;
      });
      result += '\n';
    });
    return result;
  }

function backupCsv() {
    var csv = reverseParse();

    if (csv == null) return;
    fs.writeFile('./data/data-backup.csv', csv, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

function getAvg(totalArr) {
  const total = totalArr.reduce((acc, c) => acc + c, 0);
  return total / totalArr.length;
}

function countRepeat(nameString, myArray) {
    var countArray = new Array();
    var tempArray;
    for(let i = 0; i < myArray.length; i++) {
        tempArray = myArray[i][nameString];
        for (let j = 0; j < tempArray.length; j++){
            if(!countArray.length){
                var temp = {name: tempArray[j], count: 1};
                countArray.push(temp);
            } else {
                var index = countArray.findIndex((element) => element.name === tempArray[j])
                if(index > -1) {
                    countArray[index].count += 1;
                } else {
                    if(tempArray[j] == '') {
                        continue;
                    }
                    temp = {name: tempArray[j], count: 1};
                    countArray.push(temp);
                }
            }
        } 
    }
    return countArray;
}

function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function bubbleSort(arr){
    var len = arr.length,
        i, j, stop, temp1, temp2;
    for (i = 0; i < len; i++){
        for (j = 0; j < len - i - 1; j++){
            temp1 = arr[j].count;
            temp2 = arr[j+1].count;
            if (temp1 < temp2){
                swap(arr, j, j+1);
            }
        }
    }

    return arr;
}

function makeAnalytics(graphObj){

    let start = performance.now();

    let xstring = graphObj.xvalue;
    let ystring = graphObj.yvalue;

    var traces = [];
    var temp;

    if (xstring === "production_companies" || ystring === "production_companies") {

        if(graphFlag) {
            parseCSV();
            graphFlag = false;
        }

        prodArray = bubbleSort(countRepeat('production_companies', newArray));

        let bad = 'Metro-Goldwyn-Mayer';
        for(let i = 0; i < 10; i++) {
            console.log(prodArray[i]);
            if(prodArray[i].name.includes(bad)) {
                temp = searchKey(prodArray[i].name.split(' ')[0], 'production_companies', newArray);
            } else {
                temp = searchKey(prodArray[i].name.split(',')[0], 'production_companies', newArray);
            }
            let temp2 = getAvg(temp.map(function(item){return item[ystring];}).map(Number));
            console.log(temp2);
            traces[i] = {x: prodArray[i].name.split(',')[0], y: temp2, name: prodArray[i].name.split(',')[0], type: "bar"};
        }

        var layout = {
          title: "Production companies vs " + ystring,
        };

        var data = [traces[0], traces[1], traces[2], traces[3], traces[4], traces[5], traces[6], traces[7], traces[8], traces[9]];

    } else if (xstring === "genres" || ystring === "genres") {

        if(graphFlag) {
            parseCSV();
            graphFlag = false;
        }

        genreArray = bubbleSort(countRepeat('genres', newArray));

        for(i = 0; i < 10; i++) {
            console.log(genreArray[i]);
            let temp = searchKey(genreArray[i].name.split(',')[1], 'genres', newArray);
            let temp2 = getAvg(temp.map(function(item){return item[ystring];}).map(Number));
            console.log(temp2);
            traces[i] = {x: genreArray[i].name.split(', ')[1], y: temp2, name: genreArray[i].name.split(',')[1], type: "bar"};
        }

        var layout = {
          title: "Movies genres vs " + ystring,
        };
        
        var data = [traces[0], traces[1], traces[2], traces[3], traces[4], traces[5], traces[6], traces[7], traces[8], traces[9]];

    } else {
        let xvalue = dataObj.map(function(item){return item[xstring];});
        let yvalue = dataObj.map(function(item){return item[ystring];});

        var trace = {
        x: xvalue,
        y: yvalue,
        mode: "markers",
        type: "scatter"
        };
        var data = [trace];

        var layout = {
          title: "Movie " + xstring + " vs " + ystring,
          xaxis: {
            title: xstring,
            showline: false,
            showgrid: false
          },
          yaxis: {
            title: ystring,
            showline: false,
            showgrid: false
          }
        };
    }
    
    var graphOptions = {layout: layout, filename: "analytics", fileopt: "overwrite"};
    plotly.plot(data, graphOptions, function (err, msg) {
        console.log(msg);
    });
    let end = performance.now();
    console.log(`Call to makeAnalytics took ${end - start} milliseconds.`);
}

exports.searchForMovie = searchForMovie;
exports.loadCsv = loadCsv;
exports.loadModifiedCsv = loadModifiedCsv;
exports.addAMovie = addAMovie;
exports.backupCsv = backupCsv;
exports.removeMovieEntry = removeMovieEntry;
exports.makeAnalytics = makeAnalytics;
