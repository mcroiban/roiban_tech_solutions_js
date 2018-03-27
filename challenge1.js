/**
Challenge 1

Leverage the Random User Generator API (https://randomuser.me) to create user data which you will sort and store into separate files.

Specifications

Please commit your answer to a GitHub repository.

Retrieve data for 100 random users from only the United States and Germany, and the United Kingdom. 
Your code should retrieve this data from a single API request. The response format should be in JSON.

Output the response into a file that should be committed with the rest of your code.

Using January 1, 1990 as a midpoint, divide and sort the 100 responses into two csv files based on the users’ birthdates.

Create one CSV file that contains all American males born after January 1, 1980.

The output csv files should have descriptive file names and contain column headers.
 */

var request = require("request");

var url = 'http://randomuser.me/api/';

request({
      uri: url,
	}, function(error, response, body) {
      console.log(body);	
}).on('error', function(e){
      console.log(e);
});
