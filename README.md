Milestone 1

Features
Create a website that has a simple search input, with a search button
When the button is clicked, the website should load and present 10 search results from the company search in the Free Stock API, when searching in Nasdaq
The endpoint looks like this: https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=AA&limit=10&exchange=NASDAQ, where query=AA is where you put the input from the user
Present the result as a list to the user
Add loading indicator when making the search
Each item in the list should show the company name and symbol
Each item should link to /company.html?symbol=AAPL, where AAPL should be replaced with the company symbol you received from the API request.
Show loading indicator when searching.

Milestone 2

Features
In the project folder, create a new file called company.html - this where your browser will look for when you click a company link from the main page (index.html)
In this page, you should extract the symbol string from the url (for example, if the user clicked a link for /company.html?symbol=GOOG, you should have a variable in your JS code with “GOOG” as a string.
The information after the question mark in your url is called “query string” (sometimes it is called “query params” or “search”, but it means the same). To access it in your JavaScript you can follow this guide: Get Query String Parameters with JavaScript
  Then, get the company profile with the following endpoint: https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol} where symbol is the company symbol extracted from the query params
Present the company information in the screen (no design provided, go wild), with the company image, name, description and link
Also, present the company stock price, and changes in percentages - if the change is positive, the changes in percentages should be in light green, else in red.
After that, you should fetch the history of stock price of the company, using the following endpoint: https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line
Use Chart.js | Open source HTML5 Charts for your website to present this data in a chart (read the documentation, understand how to use it, and how to pass the data from the stock price history endpoint)
Show loading indicator, when loading company data and stock price history.

Milestone 3

Features
Add extra information to search results - image and stock change (percentage)
