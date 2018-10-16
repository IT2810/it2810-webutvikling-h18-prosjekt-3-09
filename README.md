Web development course @ NTNU by

- Håvard Bergheim Olsen
- Balázs Orbán
- ~~Espen Sørhaug~~

using React.

# Prosjekt 2

## Teknologier brukt i prosjektet

- Fetch API (AJAX)
- React / ES6
- Media-queries/Viewport
- Flex/Grid vha. responsive layout
- WakaTime
- ESlint / Prettier
- Git / Github
- VSCode

### Hvordan vi oppfyller krav til teknologi

**Fetch API (AJAX)**
Fetch API er den nyere metoden som er brukt istedenfor AJAX. Den bruker JavaScript Promises som gjør det enkelt å utføre operasjoner asynkront. Det vil si at selv om dataen ikke er hentet enda kan koden fortsette å kjøre, og når dataen er endelig tilgjengelig, kan man reagere på dette ved å kalle .then() metoden på Promisen. Dette konseptet passer veldig godt til React. Promise kallene blir som regel gjort i componentDidMount eller componentDidUpdate lifecycle-metodene. OBS! Hvis man skal oppdatere staten i en komponent i componentDidUpdate, må man sjekke for om det har faktisk skjedd noen endringer, ellers ender man opp i en evig loop, som krasjer applikasjonen veldig fort. Dette er en relativt ny “best practice” bruk av data fetching i React. Update on async rendering

**React / ES6**
Siden oppgaven var å lage en Single Page Application hvor utstillingen skal genereres underveis, passer React.js utmerket. Det som gjør React spesielt bra for denne typen applikasjoner er måten React bruker shadowDOM i tillegg til DOMen for å kunne oppdatere bare de delene av applikasjonen som trengs.

Vi har strukturert applikasjonen i komponenter som er implementert med class, noe som gjorde utviklingen oversiktlig og forståelig. Det gjorde også at vi kunne utvikle de ulike komponentene uavhengig av hverandre. Dette gjorde at gruppen jobber mer effektivt,

**WakaTime**
For å følge med hvor mye enkelte personer jobbet i gruppen, istedenfor å loggføre det manuelt, brukte vi WakaTime. Det er en tjeneste (som er lett installert i de fleste populære IDEs som VS Code) som måler tidsbruk på brancher, og filer. For resultatet, se vedlagt PDF fil.

**ESlint / Prettier**
Vi brukte de to overnevnte verktøyene for å sørge for at vi har en konsistent kode, uavhengig av hvor mange som måtte jobbe på prosjektet vårt. ESlint markerer koden til utvikleren som ikke samsvarer med den forhåndsdefinerte kodeformatteringen. Deretter bruker Prettier denne formatteringen for å skrive om filen ved lagring. Med dette, kan alle skrive i sin egen stil og fortsatt være sikker på at resultatet er konsistent.

**Git / Github**
Vi brukte Git/Github for å holde styr på de forskjellige fasene i prosjektet. Ved hjelp av issues kunne vi lage oss en to-do liste, og ved hjelp av forskjellige branches, kunne vi være sikker på at features under utvikling var separert fra kode som vi har vurdert som ferdig. (ideen kommer fra GitFlow)

**Responsive layout**
For å implementere en layout brukte vi CSS flexbox og grid. I CSS begynte vi med å implementere styling for mobile enheter først, deretter skalerte vi designet opp ved hjelp av media queries. Dette kalles mobile first design. Den letteste måten å oppnå dette er å bruke “min-width” istedenfor “max-width” i media-queries. Da kan mobilen hoppe over alle media-queries den ikke trenger, og kan derfor vise det ønskede designet raskere. På en laptop eller en stasjonær PC vil det ikke være noe merkbar forskjell at den må parse noen ekstra media queries for å vise applikasjonen. Siden CSS Grid og Flex er veldig fleksible, trengte vi bare noen media queries for å få nettsiden til å se bra ut på ulike skjermstørrelser.

### Hvordan vi oppfyller krav til funksjonalitet

Applikasjonen tillater brukeren å generere en utstilling med 4 kombinasjoner av tekst, lyd og bilde. Det gjøres gjennom tre dropdowns som kontrollerer kategorivalg for de tre ulike elementene. Brukeren kan bla gjennom utstillingen ved å trykke på knappen merket med en pil. Det er også prikker over utstillingen som viser brukeren at det er fire ulike “tabs”.

Applikasjonen skulle ha et responsivt design og det ble løst med bruk av Media-queries, se avsnitt over om responsive layout.

Vi valgte med andre ord en litt annen løsning enn det som ble gitt som utkast i oppgaven, men vi føler at løsningen oppfyller kravene på en tilsvarende god måte. Vi valgte også å ikke la bildene skalere etter størrelsen på skjermen, siden vi synste det så bra ut med en fast størrelse på alle skjermstørrelser.

## Testing

Vi har testet applikasjonen med fokus på brukergrensesnitt og responsiv web design. Dette ble gjort i både Google Chrome og Firefox, og på ulike enheter med ulik skjermstørrelse. På grunn av ulik default styling av for eksempel media player i nettleserne vil applikasjonen til en viss grad se ulik ut. Dette var en minimal forskjell som ikke hadde noe effekt på funksjonaliteten og vi synes dermed at det er greit slik det er. Se vedlagte bilder.

Testingen ble utført systematisk på de ulike enhetene ved å sjekke alle funksjonene for å forsikre oss om at brukergrensesnittet funker som tenkt på tvers av enheter.

![image](https://user-images.githubusercontent.com/18369201/45872469-67d8c580-bd90-11e8-8d05-fa83b28031f2.png)
Firefox / Linux

![image](https://user-images.githubusercontent.com/18369201/45872542-8dfe6580-bd90-11e8-9bf6-dc91d891a07d.png)
Google Chrome / Linux

![screenshot_20180921-103351_2](https://user-images.githubusercontent.com/22095633/45872577-a79fad00-bd90-11e8-8a60-4dfc1da024c8.jpg)
Google Chrome / Mobil
