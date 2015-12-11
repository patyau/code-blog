Class-08_12-09-2015
What I did today:
- populated articles into sql db
- set up local storage functionality
- got articles to render from the db
- reimplemented article preview and menu filtering functionality to work with other new updates
- added more styling
- got new entry page to do live preview, insert record into db, and json export on submit

Blocking points:
- still trying to figure out how to include admin and post edit functionality

Other notes:
- Jonathan helped with getting index page functionality working
- Code review helped get a lot of the functionality on the index page working
- Relied heavily on the class example code as a guide to refactor my code and implement blog behavior functionality

______


Class-07_12-08-2015
What I did today:
- Created a stats page

Blocking points:
- was not able to figure out how to get the average word length per post or per author

Other notes:
- Jesse helped with the total word count function

______


Class-06_12-07-2015
What I did today:
- Moved template into separate page and successfully got the index page to populate blog articles
- Separated out some functions to improve clarity and efficiency

Blocking points:
- Could not get new.html page to populate live preview of blog article using handlebar template

Other notes:
- Robert helped with the handlebar template functionality on the index page

______


Class-05_12-04-2015
What I did today:
- Pair programming
  Driver: Erika
  Navigator: Pat
    Added new blog entry page, form and live preview
- Added markdown functionality for new blog entry preview and JSON export of new entry data

Other notes:
- Jesse helped with live preview functionality
- Robert helped with markdown and JSON export functionality

______


Class-04_12-03-2015
What I did today:
- Worked on nav menu
- Added more styling
- Added handlebars and blog article template functionality

______

Class-03_12-02-2015
What I did today:
- Added responsiveness to images
- Added responsiveness to form elements
- Added responsiveness to nav to work in any device

Blocking Points:
- Didn't have time to add media query so that nav will be inline list instead of hamburger when viewing on bigger screens.

Other Notes:
- Used Ivan's hamburger code example as a guide for my nav.

______

Class-02_12-01-2015
What I did today:
- Truncated articles and added read more links
- Added drop down filters for author and category
- Added tab navigation
- Added error correction so 'draft' articles will not be Created
- Slight style updates

Blocking Points:
- Parsing the published on prop to account for all cases
- Using advanced selectors when possible instead of id's and classes

- Chris helped with getting the filter drop down menus to work
- Sabrina helped with the article draft error correction

______


Class-01_11-30-2015
What I did today:
- Added eslintrc file to root directory
- Created blog article objects using an object constructor function.
- Created the markup for the article template in the DOM and used jQuery to clone the template for each article.
- Successfully got the articles to display in the DOM.
- Linked the author's name to the author's URL
- Added functionality to sort articles by most recent publish date
- Added basic style sheets.

Blocking Points:
- Displaying the # of days ago an article was published from the current date of an article
- Displaying images in a reasonable manner.
- Adding static text without using html markup in the js file and/or not having it display before the first article.

- sabrina helped with getting objects to display in the dom
- natlie helped with sorting the articles based on most recent date and linking the author url to the author name by traversing the dom
