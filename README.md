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
