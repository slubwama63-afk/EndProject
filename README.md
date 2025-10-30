EndProject – Book Explorer

Inledning

Detta projekt utgör slutuppgiften i kursen och bygger vidare på samma kodstil och struktur som tidigare uppgifter. Syftet är att upprätthålla en enhetlig och tydlig kodbas genom hela kursen samt att utveckla en mer omfattande applikation som integrerar flera centrala moment i webbutveckling.

Syfte

Syftet med projektet är att utveckla en webbapplikation som hämtar, bearbetar och presenterar data från ett externt API med hjälp av fetch och async/await. Projektet syftar även till att fördjupa förståelsen för DOM-manipulation, responsiv design och felhantering, samt att träna på att strukturera kod på ett effektivt och läsbart sätt.

Beskrivning

Applikationen Book Explorer använder Open Library API för att möjliggöra sökning efter böcker baserat på titel eller författare. Resultaten visas som dynamiskt genererade kort på webbsidan, där varje kort innehåller bokomslag, titel och författare. Om ett omslag saknas visas en ersättningsbild (placeholder).

En ny funktion är att varje bokkort är klickbart, vilket öppnar en modal med mer information om boken, inklusive titel, författare, första publiceringsår och kategori/ämnen. Applikationen är designad för att vara enkel att använda och fullt responsiv på både dator och mobil.

Så här fungerar koden

Data hämtas från Open Library API med hjälp av fetch, och svaret omvandlas till JSON.

När datan är tillgänglig skapas bokkorten dynamiskt i JavaScript genom DOM-manipulation.

Varje bokkort innehåller information om titel, författare och omslag.

Klick på ett bokkort öppnar en modal med ytterligare information: titel, författare, publiceringsår och kategorier.

Om fler än tio resultat hittas aktiveras paginering, vilket gör det möjligt att bläddra mellan resultatsidor.

Vid fel i API-anropet visas ett tydligt felmeddelande till användaren.

Layouten utformas med CSS flexbox och grid, samt kompletteras med hover-effekter för interaktivitet och användarupplevelse.

Stretch goals / Utökad funktionalitet

Implementerat ersättningsbild vid avsaknad av bokomslag.

Säkerställt responsiv design för olika skärmstorlekar.

Lagt till tydlig hantering av felmeddelanden vid ogiltiga sökningar eller nätverksfel.

Implementerat klickbara bokkort som öppnar en modal med extra bokinformation.

Hur man kör applikationen

Ladda ner eller klona projektet från GitHub-repositoriet.

Öppna filen index.html i valfri modern webbläsare (t.ex. Chrome, Edge eller Firefox).

Skriv in en boktitel eller författare i sökfältet och klicka på knappen Sök.

Resultaten visas som bokkort. Om fler än tio böcker hittas kan du bläddra mellan sidor med hjälp av pagineringen.

Klicka på ett bokkort för att öppna modal med detaljerad information om boken.

Vid eventuella fel i API-anropet visas ett meddelande på skärmen.

Kommentarer

Samtliga centrala delar av koden är kommenterade direkt i app.js för att förklara flödet och logiken i programmet. Även CSS innehåller kommentarer som delar upp koden i sektioner (header, sökfält, bokkort, pagination, modal och footer), vilket underlättar läsbarhet och vidareutveckling.

Reflektion

Detta projekt har bidragit till en fördjupad förståelse för hur asynkron JavaScript kan användas för att hämta och bearbeta data från externa API:er. Arbetet har även gett praktisk erfarenhet av att bygga responsiva gränssnitt och hantera olika typer av dataflöden och fel.

Genom projektet har jag utvecklat min förmåga att kombinera HTML, CSS och JavaScript för att skapa en komplett, användarvänlig och strukturerad webbapplikation. Den nya modal-funktionen har även gett erfarenhet av hur man kan interagera med användaren på ett mer dynamiskt och visuellt sätt.