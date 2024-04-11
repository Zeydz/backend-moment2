# Användarmanual för Work Experience API / Arbetserfarenheter API

Välkommen till Work Experience API! Denna API-tjänst låter dig hantera arbetserfarenheter genom att erbjuda CRUD-operationer (Create, Read, Update, Delete) för att lägga till, hämta, uppdatera och ta bort arbetserfarenheter från en PostgreSQL-databas.

## Komma igång

För att använda Work Experience API, följ stegen nedan:

1. **Klona ner repot**: Klona ner repot till valfri dator. 

2. **Installera nödvändiga paket**: Se till att du har Node.js installerat på din dator. Installera sedan alla nödvändiga paket genom att köra `npm install` i terminalen.

3. **Konfigurera miljövariabler**: Skapa en fil med namnet `.env` i rotmappen och konfigurera miljövariabler för att ansluta till din PostgreSQL-databas. Exempelvis:

  ```plaintext
    DB_HOST = ""
    DB_PORT = 5432
    DB_USERNAME = ""
    DB_PASSWORD = ""
    DB_DATABASE = ""
  ```
3. **Starta servern**: Starta servern genom att köra `npm start` i terminalen. Servern kommer att lyssna på standardporten 3000, om ingen annan port anges i miljövariabler.

## Använda API:et

API:et erbjuder följande endpoints för att hantera arbetserfarenheter:
- `GET /api`: Välkomstmeddelande
- `GET /api/work-experiences`: Hämtar alla arbetserfarenheter.
- `GET /api/work-experiences/:id`: Hämtar en specifik arbetserfarenhet baserat på dess ID.
- `POST /api/work-experiences`: Skapar en ny arbetserfarenhet.
- `PUT /api/work-experiences/:id`: Uppdaterar en befintlig arbetserfarenhet baserat på dess ID.
- `DELETE /api/work-experiences/:id`: Tar bort en arbetserfarenhet baserat på dess ID.

## Exempel

Här är ett exempel på hur du kan använda ThunderClient för att utföra CRUD-operationer med Work Experience API:

1. För att hämta alla arbetserfarenheter, använd GET-förfrågan till `http://localhost:3000/api/work-experiences`.
2. För att lägga till en ny arbetserfarenhet, använd POST-förfrågan till `http://localhost:3000/api/work-experiences` i lämpligt format.
3. För att uppdatera en befintlig arbetserfarenhet, använd PUT-förfrågan till `http://localhost:3000/api/work-experiences/:id` med arbetserfarenhetens ID och uppdaterad data.
4. För att ta bort en arbetserfarenhet, använd DELETE-förfrågan till `http://localhost:3000/api/work-experiences/:id` med arbetserfarenhetens ID.

[API-länk](https://backend-moment2.onrender.com/api)  

[Publicerad webbplats](https://astonishing-caramel-f0eafd.netlify.app/)

