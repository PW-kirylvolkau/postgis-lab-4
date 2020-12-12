# HTML to PostGIS Lab 4

### Technology stack:
- Vanilla JS
- Toastr
- ASP.NET Core WebAPI
- EF Core (in memory db)
- Postgres
- Leaflet.js 
- Swagger 
- Geoapify

### Description
Simple API for calculating routes for orders and vehicles (based on the weight of the order package). There are three main actors: `vehicles`,`orders`,`stations`. Orders can be added from the leaflet map or using geoapify autocompletion. They are later displayed on the general map in routes. The validation is done at the backend.

