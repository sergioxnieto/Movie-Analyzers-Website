const fs = require('fs');
var dataObj = [];

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
    fs.writeFile('data-backup.csv', csv, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

exports.searchForMovie = searchForMovie;
exports.loadCsv = loadCsv;
exports.addAMovie = addAMovie;
exports.backupCsv = backupCsv;