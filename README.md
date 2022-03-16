# lebonsandwich-OLIVIA-WANG

## Équipes
- Tania OLIVIA
- Ziyi WANG

## Variables d'environnement

- ./service/.env

## Commandes utiles

- Installer les dépendances:
`docker-compose run <nom-du-service> npm i`


## Directus
- Consulter les sandwich:
`http://localhost:8055/items/sandwich`

- Conculter les catégorie
`http://localhost:8055/items/category`

- Connexion à la directus :
  - ADMIN_EMAIL : admin@example.com
  - ADMIN_PASSWORD : admin


## Étapes
- Lancer un docker :
`docker-compose pull`
`docker-compose up -d`
`docker-compose down`
`docker-compose up`

- Consulter les commandes :
`http://localhost:3333`

- Consulter la base de données :
`http://localhost:8080`

- Consulter les catalogues - CMS Headless  :
`http://localhost:8055`

- Consulter le suivi des commandes avec l'authentification :
`http://localhost:3334/suivi/commandes`

- get token sign up avec l'authentification :
`http://localhost:3334/auth/signup`

- get token sign in avec l'authentification :
`http://localhost:3334/auth/signin`

- Connexion à la base de données :
  - server : commandes_db
  - username : commandes_db
  - db : commandes_db
  - password : commandes_db


