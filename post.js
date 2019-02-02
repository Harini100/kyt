var express = require('express');



var app = express();



var bodyParser =    require("body-parser");



app.use(bodyParser.urlencoded({ extended: true }));



app.use(bodyParser.json());











app.get('/index.html', function(req, res){



    res.sendFile(__dirname + '/' + 'index.html');



    console.log("----------------");



});




app.post("/post", function (req, res) {


		var value4=req.body.fdate;



		var value5=req.body.tdate;



		var value6=(value4.split("T"))[0];



		var value7=(value5.split("T"))[0];



		console.log(value4);



		console.log(value5);



		var value8 = value6.split("-").reverse();



		value8[0] = String(parseInt(value8[0]) + 1);



		var value9 = value7.split("-").reverse();



		value9[0] = String(parseInt(value9[0]) + 1);



		var value10=value8.join("-");



		var value11=value9.join("-");



        var request = require('request');
		


        request('https://webcrawlerbackend.azurewebsites.net/api/searchNotificationsInTime?startDate=01-01-1000&endDate='+value11, function (error, response, body) {


  
        if (!error && response.statusCode == 200) {



	    response2 = body ;



		console.log("TEST:FROM DATE IS  " +value10);



		console.log("TEST:TO DATE IS "+value11);

		

		 body = JSON.parse(body);             



	    for (var i = 0; i < body.notifications.length; i++) {



	             body.notifications[i].luDate = body.notifications[i].lastUpdatedTime.split(" ")[0];



	             body.notifications[i].luTime = body.notifications[i].lastUpdatedTime.split(" ")[1];
				 
				 if(body.notifications[i].tags!=null)
				 
				 body.notifications[i].combinedtags = body.notifications[i].tags.join(", ");
				 
				 else
				
			    body.notifications[i].combinedtags ="Not specified";


	         }	         



	    body = JSON.stringify(body);



		console.log(body); // Print the body of response.



		res.end(body);



  }


 
})
  



});







app.post("/post1", function (req, res) {



	    



    var var1 = req.body.sName;



    var multipletags = 0;



    if (multipletags == 1) {



        var var2 = var1.split("\"");



        if (var2.length == 3) {



            var1 = var2[1];



        }



        else {



            var1 = var1.split(" ").join(",");



        }



    }



	 console.log(var1);



	 var request=require('request');



	 request('https://webcrawlerbackend.azurewebsites.net/api/searchNotificationOnTags?tags='+var1, function (error, response, body) {



	     if (!error && response.statusCode == 200) {



	         body = JSON.parse(body);             



	         for (var i = 0; i < body.notifications.length; i++) {



	             body.notifications[i].luDate = body.notifications[i].lastUpdatedTime.split(" ")[0];



	             body.notifications[i].luTime = body.notifications[i].lastUpdatedTime.split(" ")[1];
				 
				 body.notifications[i].combinedtags = body.notifications[i].tags.join(", ");



	         }	         



	         body = JSON.stringify(body);



             console.log(body); // Print the body of response.



	         res.end(body);



        }



})



    



});







app.listen(process.env.PORT||3000);