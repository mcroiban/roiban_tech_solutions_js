/**
 * Challenge 1
 * 
 * Leverage the Random User Generator API (https://randomuser.me) to create user
 * data which you will sort and store into separate files.
 * 
 * Specifications
 * 
 * Please commit your answer to a GitHub repository.
 * 
 * Retrieve data for 100 random users from only the United States and Germany,
 * and the United Kingdom. Your code should retrieve this data from a single API
 * request. The response format should be in JSON.
 * 
 * Output the response into a file that should be committed with the rest of
 * your code.
 * 
 * Using January 1, 1990 as a midpoint, divide and sort the 100 responses into
 * two csv files based on the users’ birthdates.
 * 
 * Create one CSV file that contains all American males born after January 1,
 * 1980.
 * 
 * The output csv files should have descriptive file names and contain column
 * headers.
 */

var request = require("request");
var fs = require('fs');
var json2csv = require('json2csv').parse;
var sleep = require('system-sleep');

var url = "https://randomuser.me/api";

var qs = { results:'100', nat:'us,de,gb' };

// pull json data from API
request.get({
    url: url,
    qs: qs,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data, already parsed as JSON
      var d = data.results;
      
      // save all users to CSV file
      try {
    	  var csv = json2csv(d);
    	  fs.writeFile('data/users.csv', csv, 'utf8', function (err) {
    		  if (err) {
    			  console.log('Some error occured');
    		  }
    	  });
    	} catch (err) {
    	  console.error(err);
      }
    
      // predefined values
      var midpoint1 = new Date('1990-01-01');
      var midpoint2 = new Date('1980-01-01');
      
      // define arrays
      var users_dob_after_midpoint1 = [];
      var users_dob_before_midpoint1 = [];
      var users_us_male_dob_after_midpoint2 = [];
 	
      // parse json data
      for(var i = 0; i < d.length; i++) {
    	  console.log(d[i].dob);
    	  var dob = new Date(d[i].dob);
    	  
    	  // split on midpoint 1
    	  if (dob >= midpoint1){
    		  users_dob_after_midpoint1.push(d[i]);
    	  } else {
    		  users_dob_before_midpoint1.push(d[i]);
    	  }
    	  
    	  // split on midpoint 2
    	  if (dob >= midpoint2 && d[i].gender == 'male'){
    		  users_us_male_dob_after_midpoint2.push(d[i]);
    	  }
      }
      
      // convert to CSV
      var users_dob_after_midpoint1_csv = json2csv(users_dob_after_midpoint1);
      var users_dob_before_midpoint1_csv = json2csv(users_dob_before_midpoint1);
      var users_us_male_dob_after_midpoint2_csv = json2csv(users_us_male_dob_after_midpoint2);
      
      // write CSV to files
	  fs.writeFile('data/users_dob_after_010190.csv', users_dob_after_midpoint1_csv, 'utf8', function (err) {
		  if (err) {
			  console.log('Some error occured');
		  }
	  });
	  
	  fs.writeFile('data/users_dob_before_010190.csv', users_dob_before_midpoint1_csv, 'utf8', function (err) {
		  if (err) {
			  console.log('Some error occured');
		  }
	  });
	  
	  fs.writeFile('data/users_us_male_dob_after_010180.csv', users_us_male_dob_after_midpoint2_csv, 'utf8', function (err) {
		  if (err) {
			  console.log('Some error occured');
		  }
	  });

    }
});
