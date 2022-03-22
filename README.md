# EVchargerTracker

### This application is designed to aid in the finding of electric vehicle charging stations. With this app you can simply use your current address, or type in your desired location and the application will return a list of nearby electric vehicile charging stations along with a map that displays both locations.

### The user clicks the 'Get Started' button which then moves the page and cursor to the search bar. From there the user may choose to enter a city, use their current location, or select from their search history. The application utilizes an OpenWeather API to convert the users entered city into coordinates. It then uses those coordinates to retrieve data from the Google Maps SDK and Places Library.

## User story

...

### AS A EV owner,

### I WANT to be able to find charging stations by location, and get the weather information for that location.

### SO THAT I can plan my road trips accordingly

...

## Acceptance Criteria

....

### GIVEN a webpage with a search bar, with form inputs

### WHEN I pull up the applicaiton

### THEN I am presented with a map that shows my current location, and weather

### WHEN I search for a city

### THEN I am presensted with nearby charging stations for that location

### WHEN I search for city

### THEN I am presented with up to date weather for that locaton

### WHEN I hit submit to search for city

### THEN that city name is saved to local storage

### WHEN I refresh the page the data entered into the search field remains in local storage

### WHEN the location of the charging location is presented

### THEH the mile distance to the location is presented

### WHEN the weather is presented

### THEN a weather icon depicting the weather type is presented, with curent temp and hourly forecast

![alt text](Readme%20screenshot%20place%20holder%20.png "Screenshot")

[Github repository](https://github.com/coltschultz/charge-on-the-run)

[Live Url](https://coltschultz.github.io/charge-on-the-run/)
