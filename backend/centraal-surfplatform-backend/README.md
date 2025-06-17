# Doel
De backend biedt een public API aan om data op te halen en te verwerken voor de frontend. Hierbij biedt de backend ondersteuning voor authenticatie en autorisatie, waardoor er via de frontend een account aangemaakt kan worden en er bepaalde rollen aan dit account kunnen worden gelegd voor autorisatie van gebruikers.

Naast authenticatie en autorisatie biedt de backend functionaliteit om voor locaties, latitude en longitude, weer en golf specifieke data op te halen zodat er op de frontend voor die locatie specifieke golf- en weersomstandigheden kunnen worden getoond.

De backend houdt middels een database bij welke locaties er zijn opgegeven om data voor op te halen. Deze locaties worden dan ook via “pin-drops” op de frontend weergegeven om voor de gebruiker uit te kiezen.

# Structuur
De structuur van het project betreft een "monolith" -architectuur, wat inhoudt dat de lagen aan elkaar gekoppeld zijn en worden gebundeld tot één applicatie. Hiervoor is gekozen simpelweg omdat het niet relevant leek om er iets anders van te maken. Er is gekeken naar een micro-service architectuur, maar er zou, in ieder geval voor de huidige scope, geen enkele ‘micro-service’ beschikbaar gesteld moeten zijn naast de API.
## MVC Pattern
Binnen het project wordt gebruikgemaakt van het MVC pattern, om het koppelen van de API laag en Business laag zo los mogelijk te houden. Zo worden er bijvoorbeeld geen database queries gedaan binnen de controllers van de API, en alle data wijzigingen niet in de Business laag.
## Lagen
Er is een splitsing gemaakt van twee lagen in het project, de API laag en de business laag. Dit is gedaan voor een stukje schaalbaarheid, zodat de logica voor de authenticatie, autorisatie en surfspots hergebruikt kan worden voor bijvoorbeeld een tweede interne API of voor een publieke externe API.
### Api
De API ontvangt de verzoeken van de frontend en vraagt daarvoor de benodigde gegevens van de database of externe API’s via de Business laag. De gegevens worden dan gevormd voor de ontvanger van de API.
### Business
De Business laag beheert een aantal services voor andere lagen om gebruik van te maken. Deze services maken gebruik van de DatabaseContext om een verbinding te leggen met de database en er data van op te halen. De services voeren ook validatie uit op de data die eraan gegeven wordt. Bijvoorbeeld voor de authenticatie wordt er in de service gekeken of er al een gebruiker bestaat met het e-mailadres bij het registreren, of bij het inloggen.

# Builden
Voor het builden en opstarten van de applicatie is het nodig om eerst de migraties uit te voeren van EntityFramework, omdat we gebruikmaken van SQLite is er nog geen database aanwezig totdat de eerste “InitialMigration” is uitgevoerd.

Om de database te initialiseren is het belangrijk om eerst de EF CLI te runnen. Navigeer daarom eerst met de terminal naar het business project waar de database models staan, gebruik hiervoor: `cd ./business` in de terminal.

Dan om de database te initialiseren gebruiken we het volgende command in de terminal: `dotnet ef database update`

Hiervoor is wel de EF CLI nodig op het apparaat (https://learn.microsoft.com/en-us/ef/core/cli/dotnet#installing-the-tools)

Nu zou de applicatie kunnen opstarten en requests naar worden gestuurd. Volg de swagger documentatie om de beschikbare endpoints in te zien.

# Docker
Om te beginnen moet je Docker op je computer installeren. Als je Windows of macOS gebruikt, kun je eenvoudig Docker Desktop downloaden en installeren via de officiële website (https://www.docker.com/products/docker-desktop). Docker Desktop levert de volledige Docker-engine, CLI en een gebruiksvriendelijke GUI om al je images en containers te beheren. Heb je Linux, installeer dan de Docker Engine via de instructies op https://docs.docker.com/engine/install/ voor jouw distributie.

## Image builden
Navigeer naar de map met je Dockerfile
Open een terminal of PowerShell en ga naar de folder waarin de solution staat (bijvoorbeeld `cd /pad/naar/centraal-surfplatform-backend`).

Voer het build-commando uit
`docker build -t centraal-surf-api:latest .-t`

Controleer of de image is aangemaakt
Na een succesvolle build zie je onderin de terminal iets als “Successfully tagged centraal-surf-api:latest.” Je kunt vervolgens met het command “docker images”
een overzicht krijgen van alle lokaal aanwezige images. Je zou nu “centraal-surf-api latest” in de lijst moeten zien.

## Container opstarten
Start een container vanaf je image
Gebruik het volgende command op de container juist op te starten, met de juiste port-forwarding: `docker run -d -p 44315:8080 --name centraal-surf-api-container centraal-surf-api:latest`

Controleer of de container juist is opgestart
Navigeer naar de volgende url “http://localhost:44315/swagger”, als hierbij de swagger documentatie naar voren komt is de container correct opgestart.