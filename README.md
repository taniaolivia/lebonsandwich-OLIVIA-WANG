# lebonsandwich-OLIVIA-WANG

## Équipes
- Tania OLIVIA
- Ziyi WANG


## Étapes
- Installer les dépendances de tous les services:
`docker-compose run authentification npm i`
`docker-compose run commandes npm i`
`docker-compose run suivi_commandes npm i`
`docker-compose run api_gatewayback npm i`
`docker-compose run api_gatewayfront npm i`

- Lancer un docker :
`docker-compose pull`
`docker-compose up -d`
`docker-compose down`
`docker-compose up`


### API GATEWAY BACK OFFICE
- Consulter le suivi des commandes avec l'authentification :
`http://localhost:3334/suivi/commandes`

- get token sign up avec l'authentification :
`http://localhost:3334/auth/signup`

- get token sign in avec l'authentification :
`http://localhost:3334/auth/signin`


### API GATEWAY FRONT OFFICE
- Consulter toutes les commandes :
`http://localhost:3334/commandes`

- Consulter une commande :
`http://localhost:3334/commandes/{id}`

- Consulter tous les items d'une commande :
`http://localhost:3334/commandes/{id}/items`


### BASE DE DONNÉES
- Consulter la base de données :
`http://localhost:8080`


### DIRECTUS
- Consulter les catalogues - CMS Headless  :
`http://localhost:8055`



## CONNEXION
- Connexion à la base de données :
  - server : commandes_db
  - username : commandes_db
  - db : commandes_db
  - password : commandes_db

- Connexion à la directus :
  - ADMIN_EMAIL : admin@example.com
  - ADMIN_PASSWORD : admin


