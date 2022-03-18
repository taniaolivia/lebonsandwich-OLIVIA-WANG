# lebonsandwich-OLIVIA-WANG

## Équipes
- Tania OLIVIA
- Ziyi WANG


## Étapes
### SERVICES
- Installer les dépendances de tous les services:
  - `docker-compose run authentification npm i`
  - `docker-compose run commandes npm i`
  - `docker-compose run suivi_commandes npm i`
  - `docker-compose run api_gatewayback npm i`
  - `docker-compose run api_gatewayfront npm i`

### DOCKER
- Lancer un docker :
  - `docker-compose pull`
  - `docker-compose up -d`
  - `docker-compose down`
  - `docker-compose up`

### DIRECTUS
- Consulter les catalogues - CMS Headless  :
`http://localhost:8055`

- Connexion à la directus :
  - ADMIN_EMAIL : admin@example.com
  - ADMIN_PASSWORD : admin

- Créer les collections dans directus:
```
Sandwich :
- id (integer)
- nom (String)
- description (String)
- type_pain (String)
- image (Objet)
- categories (liste des id des catégories)
- prix (float)

```
```
Category
- id (integer)
- nom (String)
- description (String)
```

- Ajout les items dans les deux collections :
Vous pouvez trouver les fichiers .json dans le dossier `directus_json` si vous voulez insérer les données manuellement. Sinon, vous pouvez insérer les données avec les API que vous pouvez trouver en dessous dans l'étape `API GATEWAY FRONT OFFICE - Ajout un item dans le directus collection sandwich` et  `API GATEWAY FRONT OFFICE - Ajout un item dans le directus collection category`.

### COMMANDES
- Consulter les commandes :
`http://localhost:3335/commandes`


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

- Consulter tous les sandwiches :
`http://localhost:3334/sandwich`

- Consulter tous les categories :
`http://localhost:3334/category`

- Consulter un category :
`http://localhost:3334/category/{id}`

- Ajout un item dans le directus collection sandwich :
`http://localhost:3334/sandwich`

- Ajout un item dans le directus collection category :
`http://localhost:3334/category`


### BASE DE DONNÉES
- Consulter la base de données :
`http://localhost:8080`


### CONNEXION
- Connexion à la base de données :
  - server : commandes_db
  - username : commandes_db
  - db : commandes_db
  - password : commandes_db




