//set up axios and cheerios to allow scraping
var axios = require("axios");
var cheerios = require("cheerio");

var scrape = function() {
 //scraping hypebeast.com
 return axios.get("https://hypebeast.com").then(function(res) {
     var $ = cheerio.load(res.data); //cheerios scrapes data 
     //empty array to save info
     var articles = [];

     //get trending stories from hypebeast.com, with required elemenets: heading, url, summary)
     //parent element is div with class name trending-story)
     $("div.post-container").each(function(i,element) {
        
        //head element first which is stored in child element h2
        var head = $(this)
        .find("title")
        .text()
        .trim();
     
        var url = $(this)
        .find("a")
        .attr("href");

        var sum = $(this)
        .find("h2")
        .text()
        .trim();


    //clean out title summary and url
    if (head && sum && url) {
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
   
        var dataToAdd = {
            headline: headNeat,
            summary: sumNeat,
            url: "https://hypebeast.com" + url
          };
  
          articles.push(dataToAdd);
        }
      });
      return articles;
    });
  };
  
  module.exports = scrape;
   
   
   
   
   
