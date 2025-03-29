# Centraal surfplatform backend
Dit is de backend voor het centraal surfplatform.
De solution is in C# en heeft als doel om data te verzamelen en terug te geven aan de frontend.

# Project lagen
Wat meer informatie over de bestaande lagen in de solution

## API
De API laag is een ASP.net web-api voor het ontvangen van frontend requests en communiceert met de business laag voor data.

## Business
Het business project is een class library die services beschikbaar stelt om data vanuit de database op te halen.
Momenteel word de database ook in dit project aangemaakt en onderhouden.
