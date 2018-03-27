/**
Challenge 2

Collect unstructured data from www.motionpoint.com, analyze the data and store it in a file.

Specifications

Please commit you answer to a GitHub repository.

The results should be stored in a CSV file with a unique file name and column headers.

Starting at www.motionpoint.com, Extract and store content from the following HTML elements:
<title></title>
<meta name="description">

In addition to the above elements, you should also store the URL where this information was retrieved.

Create and store meta data that measures the length of the extracted contact.

Leveraging HREFs found on the starting URL, collect the same information from 4 additional URLs 
without collecting information from the same URL multiple times.

Limitations

There should be a 5 second delay between each page request.
 */

var request = require("request");
var cheerio = require("cheerio");
var url = require("url");
var fs = require('fs');
var sleep = require('system-sleep');

var start_uri = "https://www.motionpoint.com/";

request({
  uri: start_uri,
}, function(error, response, body) {
  var $ = cheerio.load(body);
  
  var data = 'url,title,title_length,description,description_length,length\n'
  data += start_uri + ','
  
  var title = $('title').text();
  data += '"' + title + '",' + title.length + ','

  var description = $('meta[name="description"]').attr('content');
  data += '"' + description + '",' + description.length + ',' + (title.length + description.length) + '\n'

  var arr = [];
  $('a').each(function() {
    var a = $(this);
    var text = a.text();
    var href = a.attr('href');
 
    if(url.parse(href).protocol == 'https:' && start_uri != href){
    	arr.push(href);
    }
  });
  
  let links = [];
  arr.forEach((el) => {
    if (!links.includes(el)) links.push(el);
  });

  links.every(function(link, index) {
	  sleep(3000);
	  request({
		  uri: link,
		}, function(error, response, body) {
		  var $ = cheerio.load(body);
		  
		  data += link + ','
		  
		  var title = $('title').text();
		  data += '"' + title + '",' + title.length + ','
		  
		  var description = $('meta[name="description"]').attr('content');
		  data += '"' + description + '",' + description.length + ',' + (title.length + description.length) + '\n'

	  });
	  if (index < 4 ) {
		  return true
	  } else {
		  return false
	  }
  });
  
  fs.writeFile('data/crawler.csv', data, 'utf8', function (err) {
	if (err) {
		console.log('Some error occured');
	}
  });

});



