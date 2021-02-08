<!-- # project_setup-docker

O seguinte repositorio contem um ficheiro docker-compose para iniciar todos os containers necessários ao projecto.

# Notas
 * Antes de iniciar deve trocar [dir_do_proj_laravel] para o diretorio que contem o seu projecto laravel (se tiver vazio ele cria uma app laravel base)
 * Antes de iniciar deve trocar [dir_do_proj_node] para o diretorio que contem o seu projecto node.
 * O container node é o base, não tem nodemon, para instalar o nodemon tem 2 opções
   * entra no container e instala globalmente ( sempre que apagar o container tem de repetir o processo)
   * instala o nodemon como require dev no projecto 
 
# Endpoints

phpMyadmin - http://localhost:8080/

mongoAdmin - http://localhost:8081/

laravelApp - http://localhost:3000/

nodeApp - http://localhost:3001/ -->


# Matos
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






<!-- Náo esquecer do php artisan storage:link -->
