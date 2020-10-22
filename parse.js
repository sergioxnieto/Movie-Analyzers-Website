const fs = require('fs');

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
        re.test(movie.id)
    );
    return results;
}

function searchMovie(movieName) {
    fs.readFile('./data/movies.csv', 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
        var dataArray = data.split(/\r?\n/); 
        var columns = dataArray[0];
        var columnsNames = parse(columns);
        var dataLines = dataArray.slice(1);
        data = dataLines.map(parse);

        var dataObjects = data.map(function (arr) {
        var dataObject = {};
        columnsNames.forEach(function(columnName, i){
            dataObject[columnName] = arr[i];
        });
        return dataObject;
        });
        console.log(JSON.stringify(dataObjects, null, 2));
        var result = search(movieName, dataObjects);
        var titles = result.map(function(item){return item.title;});
        //console.log(titles);
        //console.log(JSON.stringify(search(movieName, dataObjects), null, 2));
    });

}

searchMovie('batman');