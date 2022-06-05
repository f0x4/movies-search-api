# movies-search-api
API for movies search (full-text search, autocomplete) with NODE.JS, Express, MongoDB.

Contains +740k films and series.

Designed specifically for the [movie-search-app](https://github.com/f0x4/movie-search-app)




## Search
  
  Example: 
  
   Request: https://movie-search-api-mini.herokuapp.com/search/бомж%20с%20дробовиком?page=0
  
    Result: 
  
    [{
      "_id":"6161e0d6be304960a54f39f0",
      "id":"518214",
      "name":"Бомж с дробовиком",
      "originalName":"Hobo with a Shotgun",
      "year":"2011","genres":["боевик","криминал"],
      "countries":["Канада"],
      "img":"/1600647/d91d4551-cd9a-4646-b15c-32a352caf56a/",
      "rating":{"$numberDecimal":"6"},
      "count":25311,
      "isSeries":false},
    ...
    ]

## Autocomplete
  
  Example: 

  Request: https://movie-search-api-mini.herokuapp.com/autocomplete/социа

    Result: 
  
    [{
      "_id":"6161dfe9be304960a54f2c40",
      "id":"427198",
      "name":"Социальная сеть",
      "originalName":"The Social Network",
      "year":"2010","genres":["драма","биография"],
      "countries":["США"],
      "img":"/1599028/04c60e22-8972-48a0-8945-019222065ae2/",
      "rating":{"$numberDecimal":"7.7"},
      "count":265211,
      "isSeries":false}
    ...
    ]
