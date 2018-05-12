# Laboratoire \#8

## But :
Se familiariser avec un flot simple d'authentification.

## Travail :
Réaliser un API nécessitant une authentification (login)
avant d’accéder à une section protégée.

## Consignes :
1. L’application doit commencer par une page de login.
1. L’usager entre son nom/mot de passe. Cette combinaison doit être
envoyée au serveur en POST à /login. (On assume que normalement, le serveur serait en HTTPS)
1. L’application doit vérifier si un usager correspondant à ce nom/mot de passe existe. Si oui, elle doit renvoyer un token valide qui sera sauvegardé
dans un cookie. Sinon, elle envoie un 403.
1. Une fois l’usager authentifié, il devra utiliser le token passé en paramètre pour être autorisé et ainsi accéder à son profile.
1. Par la suite, si le cookie est présent, il ne devrait plus avoir besoin de s’authentifier, mais bien simplement d’être autorisé.

## Bref
Il faut donc faire :
* Page de login et page de user profile
* Appel d’API POST à /login
* Appel d’API GET à /userprofile
* Appel d’API POST à /users (simple création de user)
* Pas de persistence requise.

## Procédure :
S'assurer d'avoir npm installé :

`npm -v`

Installer les dépendances :

`npm install`

Exécuter l'API:

`npm run dev`

Utiliser le `http://localhost:3000/` comme baseUrl dans postman afin de tester/corriger le laboratoire.