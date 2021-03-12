


# Matos: Laravel + Node + MySql|MariaDB + Mongo training
Laravel Instructions (.bbqing): 
1) Git clone
2) composer install
3) php artisan serve
4) 'cp .env.example .env'
5) php artisan key:generate
6) docker-compose up       ((just be with Mongo + Mongo-express containers ON, stop all others))
7) npm install

PhpMyAdmin:
1) XAMP
2) create DB 'laravel' and import the 'laravel.sql' under the folder: Matos_Bkup_DB

Mongo-express:
1) import the files 'model_bbqs' and 'model_meets' under the folder: Matos_Bkup_DB

Node Instructions:
1) npm install
2) for the folder (.doubleapi): nodemon app  
3) for the folder (Matos_Chat): nodemon serve

# Endpoints

phpMyadmin - XAMPP

mongoAdmin - http://localhost:8081/db/admin

laravelApp - http://localhost:8000/

nodeApp - http://localhost:3001/  ((check postman files, for both Node API, inside 'Matos_Bkup_DB'))

apidocs with token - http://localhost:3001/api-docs/#/

Socket.io - http://localhost:5000/

# Objectives:

Laravel8+ : Explore the Basics + Routes + CRUD of 'Roulottes' with MariaDB + consume|ask API from Node + Authorization vs Authentication + Middleware + Roles|Abilities|Users + Migrations + Policies vs Gates.

Node.js & Express: 2 CRUD API with Mongo|Mongoose + ejs template + HTTP Response Status + DATES LOGIC to book Meetings on "week" under "labor hour".

POSTMAN: to test both API ===> Barbacue Products + Book Meetings for re-stock.

Node.js SWAGGER: Api documentation YAML + 'jsonwebtoken'.

Socket.io: Explore sockets and instant messages + users per room. ((Iframe inside Laravel))






<!-- Náo esquecer do php artisan storage:link -->
