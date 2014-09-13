The content component makes use of the topic path parameter to load a topic from the views directory.
A topic directory should contain the following files:

* views/index.hbs - main content
* views/partials/main.hbs - loops through sidebar.json collection
* views/{topic}sidebar.json - topic description and sub topic items; partials to load are derived from items
* views/{topic}/partials/* - partials for sub topic items; file name must match item.link + '.hbs'