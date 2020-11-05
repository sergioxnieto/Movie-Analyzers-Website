var plotly = require('./node_modules/plotly')('ymwang0101','6XBXlcsQc81iEbEslo44');
const fs = require('fs');
var dataObj = [];
var newArray = [];

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

function search(nameKey, myArray){
    let searchArray = nameKey.trim().split(" ");
    let re = new RegExp(searchArray.join(" "), "i");
    let results = myArray.filter(movie =>
        re.test(movie.title) ||
        re.test(movie.id) ||
        re.test(movie.budget) ||
        re.test(movie.original_language) ||
        re.test(movie.popularity) ||
        re.test(movie.runtime)
    );
    return results;
}

function searchForMovie(movieName) {
    // console.log(dataObj);
    var result = search(movieName, dataObj);  
     // Array of objects that contain movieName
        var titles = result.map(function(item) {
            return item.title;
        }); // Array with the movie names parsed out

        // Array of objects that match the title
        return result;
}

function addAMovie(movieObj) {
    dataObj.push(movieObj);
}

function removeMovieEntry(movieId) {
    for(var i = 0; i < dataObj.length; i++) {
        if (dataObj[i].movie_id === movieId) {
            var index = i;
            break;
        }    
    }

    dataObj.splice(index, 1);
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

function reverseParse() {
    var result, columns;
    var insideQuote = false,
  
    columns = Object.keys(dataObj[0]);
    result = '';
    result += columns.join(',');
    result += '\n';
    dataObj.forEach(function(item) {
      ctr = 0;
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

function returnArray(keyword, myArr){
    let arr;
    if(keyword == "budget"){
        arr = myArr.map(function(item){return item.budget;});
    } else if (keyword == "vote_average") {
        arr = myArr.map(function(item){return item.vote_average;});
    } else if (keyword == "popularity") {
        arr = myArr.map(function(item){return item.popularity;});
    } else if (keyword == "runtime") {
        arr = myArr.map(function(item){return item.runtime;});
    } else if (keyword == "revenue") {
        arr = myArr.map(function(item){return item.revenue;});
    } else if (keyword == "production_companies") {
        arr = myArr.map(function(item){return item.production_companies;});
    }
    return arr;
}

function makeAnalytics(graphObj){

    xstring = graphObj.xvalue;
    ystring = graphObj.yvalue;

    newArray = dataObj.filter(movie => movie.budget > 0);
    newArray = newArray.filter(movie => movie.vote_average > 0);
    newArray = newArray.filter(movie => movie.popularity > 0);
    newArray = newArray.filter(movie => movie.runtime > 0);
    newArray = newArray.filter(movie => movie.revenue > 0);

    xvalue = returnArray(xstring, newArray);
    yvalue = returnArray(ystring, newArray);  

    var layout = {
      title: "Movies " + xstring + " vs " + ystring,
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

    var trace = {
        x: xvalue,
        y: yvalue,
        mode: "markers",
        type: "scatter"
    };

    var data = [trace];

    var graphOptions = {layout: layout, filename: "basic-bar3", fileopt: "overwrite"};

    plotly.plot(data, graphOptions, function (err, msg) {
        console.log(msg);
    });
}

exports.searchForMovie = searchForMovie;
exports.loadCsv = loadCsv;
exports.loadModifiedCsv = loadModifiedCsv;
exports.addAMovie = addAMovie;
exports.backupCsv = backupCsv;
exports.removeMovieEntry = removeMovieEntry;
exports.makeAnalytics = makeAnalytics;
