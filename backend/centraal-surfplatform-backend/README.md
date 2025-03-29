# Centraal surfplatform backend
Dit is de backend voor het centraal surfplatform.
De solution is in C# en heeft als doel om data te verzamelen en terug te geven aan de frontend.

# Opstarten applicatie
Om de database te initialiseren is het belangrijk om eerst de EF CLI te runnen. Navigeer daarom eerst met de terminal naar het business project waar de database models staan, gebruik hiervoor: `cd ./business` in de terminal.

Dan om de database te initialiseren gebruiken we het volgende command in de terminal: `dotnet ef database update`

Hiervoor is wel de EF CLI nodig op het apparaat (https://learn.microsoft.com/en-us/ef/core/cli/dotnet#installing-the-tools)

Nu zou de applicatie kunnen opstarten en requests naar worden gestuurd.
Volg de swagger documentatie om de beschikbare endpoints in te zien.

# Project lagen
Wat meer informatie over de bestaande lagen in de solution

## API
De API laag is een ASP.net web-api voor het ontvangen van frontend requests en communiceert met de business laag voor data.

## Business
Het business project is een class library die services beschikbaar stelt om data vanuit de database op te halen.
Momenteel word de database ook in dit project aangemaakt en onderhouden.
