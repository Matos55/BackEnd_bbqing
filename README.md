# project_setup-docker

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

nodeApp - http://localhost:3001/
