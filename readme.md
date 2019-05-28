<h1>TickTockSell</h1>
<i>by Erik Ståhl & Pelle Söderberg</i>

<h2>About</h2>
TickTockSell is an auction web app designed to help students easily sell stuff at competitive prices. It also makes selling and buying stuff fun! TickTockSell is developed in part with the project for the course TDDD27 Advanced Web Programming at Linköping University. A presentation of the website and the code can be found on [youtube](https://youtu.be/SqttIGi1IC0).

<h2>Develop locally</h2>

To develop in the project you need to clone the repo and install dependencies. Navigate to the root folder and run `npm install`. Then navigate to the client folder and do the same thing `cd client && npm install`. To run both server and client, head back to the root folder and run `cd .. && npm run dev` which will run them concurrently on two different ports.

<h2>Functional specification</h2>
The main functionality of TickTockSell consists of:
<ul>
<li>Creating an account</li>
<li>Logging in</li>
<li>Creating an auction with a start time and duration</li>
<li>Creating items with titles, descriptions starting prices</li>
<li>Viewing auctions and their start times that others have created</li>
<li>Participating in other users auctions and bid on items</li>
<li>Seeing items and information from auctions where you have won the bidding</li>
<li>Seeing items and information about buyers that have won the bid on your auctions</li>
</ul>

The main selling component of TickTockSell is the short live auctions where you get to compete directly with other buyers to get the items you desire. It also provides the sellers with an easy platform to advertise their stuff. TickTockSell is like Tradera but with the form of a real life auctions where everything happens in a short time span.

The aesthetics of TickTockSell is a barebones application with light colours which help the users focus on the main auction. Buttons with fixed price increments help the auction go fast and keeps the price at reasonable levels. A big timer on the auction keeps the tension high and makes it all the more fun.

<h2>Technical specification</h2>
TickTockSell is developed with the MERN-stack, a popular suite of frameworks with a lot of support and addons. MERN stands for:
<ul>
<li><b>M</b>ongoDB</li>
<li><b>E</b>xpress</li>
<li><b>R</b>eact</li>
<li><b>N</b>ode</li>
</ul>

The main difference between our application and many other MERN applications is that we will use [GraphQL](https://graphql.org/) as a query language for API's instead of the common method REST. This is due to two reasons. One, it's an up and comming query language that is gaining a lot of traction, and it seemed like something well worth spending time learning. Two, it has built in subscription methods using websocket.io, which means we can subscribe to data directly in the queries. Traditional REST doesn't support websockets, which means you usually had to subscribe to data outside of you REST API framework. To make GraphQL easier to use we will also use the [Apollo](https://www.apollographql.com) server tool to create our type definitions and resolver in the back-end, and then Apollo Client for queries, mutations and subscriptions in the front-end. We have looked into using Apollo/GraphQL as a state management tool in the front end, which might completely erase the need for using tools such as Redux or RxJS. Due to time constraints however we decided to go with RxJS. But we definitely see to advantages of implementing this in future projects.

The reason for looking att tools which support data subscriptions is that the auction page need to have a live feed of data to the users. This allows them to see new bids and the timer in real time.

To make the the development environment even easier for both developers, [MongoDB Atlas](https://www.mongodb.com/cloud) is used as the database. Atlas is Mongo's cloud based database, which is free to use at their basic account level. This allows the development team to always share database data during development.

During development we will use [Heroku](https://heroku.com) to more conveniantly share our progress. You can visit the app [here](https://glacial-hollows-33996.herokuapp.com/).
