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

function searchGenres(nameKey, myArray){
    let searchArray = nameKey.trim().split(" ");
    let re = new RegExp(searchArray.join(" "), "i");
    let results = myArray.filter(movie =>
        re.test(movie.genres)
    );
    return results;
}

function searchProd(nameKey, myArray){
    let searchArray = nameKey.trim().split(" ");
    let re = new RegExp(searchArray.join(" "), "i");
    let results = myArray.filter(movie =>
        re.test(movie.production_companies)
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

function getAvg(totalArr) {
  const total = totalArr.reduce((acc, c) => acc + c, 0);
  return total / totalArr.length;
}

function makeAnalytics(graphObj){

    let xstring = graphObj.xvalue;
    let ystring = graphObj.yvalue;

    newArray = dataObj.filter(movie => movie.budget > 0 && movie.vote_average > 0 && movie.popularity > 0
        && movie.runtime > 0 && movie.revenue > 0);

    let xvalue = newArray.map(function(item){return item[xstring];});
    let yvalue = newArray.map(function(item){return item[ystring];});

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

    if (xstring === "production_companies" || ystring === "production_companies") {

        let walt = searchProd("Walt Disney Pictures", newArray);
        //console.log(walt);
        let walty = getAvg(walt.map(function(item){return item[ystring];}).map(Number));
        //console.log(walty);
        let colu = searchProd("Columbia Pictures", newArray);
        let coluy = getAvg(colu.map(function(item){return item[ystring];}).map(Number));
        let lege = searchProd("Legendary Pictures", newArray);
        let legey = getAvg(lege.map(function(item){return item[ystring];}).map(Number));
        let warn = searchProd("Warner Bros", newArray);
        let warny = getAvg(warn.map(function(item){return item[ystring];}).map(Number));
        let para = searchProd("Paramount Pictures", newArray);
        let paray = getAvg(para.map(function(item){return item[ystring];}).map(Number));
        let univ = searchProd("Universal Pictures", newArray);
        let univy = getAvg(univ.map(function(item){return item[ystring];}).map(Number));
        let twen = searchProd("Twentieth Century Fox Film", newArray);
        let tweny = getAvg(twen.map(function(item){return item[ystring];}).map(Number));
        let sony = searchProd("Sony Pictures", newArray);
        let sonyy = getAvg(sony.map(function(item){return item[ystring];}).map(Number));

        var trace1 = {
        x: "Walt Disney Pictures",
        y: walty,
        type: "bar"
        };
        var trace2 = {
        x: "Columbia Pictures",
        y: coluy,
        type: "bar"
        };
        var trace3 = {
        x: "Legendary Pictures",
        y: legey,
        type: "bar"
        };
        var trace4 = {
        x: "Warner Bros",
        y: warny,
        type: "bar"
        };
        var trace5 = {
        x: "Paramount Pictures",
        y: paray,
        type: "bar"
        };
        var trace6 = {
        x: "Universal Pictures",
        y: univy,
        type: "bar"
        };
        var trace7 = {
        x: "Twentieth Century Fox Film",
        y: tweny,
        type: "bar"
        };
        var trace8 = {
        x: "Sony Pictures",
        y: sonyy,
        type: "bar"
        };
        var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8];
        var graphOptions = {filename: "basic-bar3", fileopt: "overwrite"};
    } else if (xstring === "genres" || ystring === "genres") {

        let comedy = searchGenres("Comedy", newArray);
        let comedyy = getAvg(comedy.map(function(item){return item[ystring];}).map(Number));
        let action = searchGenres("Action", newArray);
        let actiony = getAvg(action.map(function(item){return item[ystring];}).map(Number));
        let adventure = searchGenres("Adventure", newArray);
        let adventurey = getAvg(adventure.map(function(item){return item[ystring];}).map(Number));
        let drama = searchGenres("Drama", newArray);
        let dramay = getAvg(drama.map(function(item){return item[ystring];}).map(Number));
        let fantasy = searchGenres("Fantasy", newArray);
        let fantasyy = getAvg(fantasy.map(function(item){return item[ystring];}).map(Number));
        let horror = searchGenres("Horror", newArray);
        let horrory = getAvg(horror.map(function(item){return item[ystring];}).map(Number));
        let romance = searchGenres("Romance", newArray);
        let romancey = getAvg(romance.map(function(item){return item[ystring];}).map(Number));
        let mystery = searchGenres("Mystery", newArray);
        let mysteryy = getAvg(mystery.map(function(item){return item[ystring];}).map(Number));

        var trace1 = {
        x: "comedy",
        y: comedyy,
        type: "bar"
        };
        var trace2 = {
        x: "action",
        y: actiony,
        type: "bar"
        };
        var trace3 = {
        x: "adventure",
        y: adventurey,
        type: "bar"
        };
        var trace4 = {
        x: "drama",
        y: dramay,
        type: "bar"
        };
        var trace5 = {
        x: "fantasy",
        y: fantasyy,
        type: "bar"
        };
        var trace6 = {
        x: "horror",
        y: horrory,
        type: "bar"
        };
        var trace7 = {
        x: "romance",
        y: romancey,
        type: "bar"
        };
        var trace8 = {
        x: "mystery",
        y: mysteryy,
        type: "bar"
        };
        var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8];
        var graphOptions = {filename: "basic-bar3", fileopt: "overwrite"};
    } else {
        var trace = {
        x: xvalue,
        y: yvalue,
        mode: "markers",
        type: "scatter"
        };
        var data = [trace];
        var graphOptions = {layout: layout, filename: "basic-bar3", fileopt: "overwrite"};
    }
    
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
