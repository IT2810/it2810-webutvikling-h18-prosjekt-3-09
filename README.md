Web development course @ NTNU by

- Håvard Bergheim Olsen
- Balázs Orbán
- Kristian Huse

using React Native.

# Prosjekt 3 [![Build Status](https://travis-ci.com/IT2810/it2810-webutvikling-h18-prosjekt-3-09.svg?branch=develop)](https://travis-ci.com/IT2810/it2810-webutvikling-h18-prosjekt-3-09)

## Teknologier brukt i prosjektet

- React Native/ ES6
- Easy Grid
- Elements
- Modal Datetime Picker
- Navigation
- Moment
- Test Renderer
- Flex/Grid vha. responsive layout
- Expo
- WakaTime
- ESlint / Prettier
- Git / Github
- VSCode

### Hvordan vi oppfyller krav til teknologi

**React Native / ES6**
Siden oppgaven var å utvikle en prototype av en mobilapplikasjon er React Native med bruk av Expo verktøyet et ypperlig valg.
Den tillater oss å utvikle en applikasjon for Android og iOS samtidig, samt at det eksisterer en rekke tredjepartsbiblioteker som kan simplifisere utviklingsprosessen ved at man slipper å finne på hjulet på nytt hver gang. Siden oppgaven for det meste består i å lage en app med lite krav rundt ytelse, slipper man å utvikle platformspesifikt for å holde ytelsen oppe.

Vi har strukturert applikasjonen i komponenter som er implementert med class, noe som gjorde utviklingen oversiktlig og forståelig. Det gjorde også at vi kunne utvikle de ulike komponentene uavhengig av hverandre. Dette gjorde at gruppen jobber mer effektivt.

**AsyncStorage**
Lagrer data asynkront og ukryptert på enheten som nøkkel-datapar. Måten data lagres på kommer an på enhetens operativsystem, og det er sterkt anbefalt å ha et abstraksjonsnivå over AsyncStorage dersom noe mer enn simple operasjoner skal utføres. Dette inkluderer kryptering av data, dersom sensitiv informasjon om brukeren skal behandles.

### Tredjepartsbiblioteker

**Easy Grid** tilbyr en deklerativ layout mekanisme for å bruke CSS grid, hvor man forhåndsdefinerer et grid for enklere å plassere komponenter.

```javascript
// Imports
import { Col, Grid } from "react-native-easy-grid";
...
<Grid>
  <Col>
    <Button/>
  </Col>
  <Col>
    <Button/>
  </Col>
</Grid>
```

**Elements**
tilbyr ferdiglagde UI-komponenter som gjør det enklere å samkjøre en felles 'look and feel'.
Dette er et spesielt nyttig bibliotek med tanke på at React Native ikke har så mange 'ready made'-komponenter.

```javascript
//Imports
import { Button } from 'react-native-elements'
<Button
    large
    rightIcon={{ name: "code" }}
    rounded={true}
    />
```

**Modal Datetime Picker**
Et tredjepartsbibliotek som viser native datetimepicker, uten at man må ta hensyn til forskjellige operativsystemer.

```javascript
//Imports
import DateTimePicker from "react-native-modal-datetime-picker";
...
  showDateTimePicker = dateType =>
    this.setState({ isDateTimePickerVisible: true, dateType });
...
  <DateInput
    label="Start date"
    onPress={() => this.showDateTimePicker("start")}
    value={start}
  />
```

**Navigation**
Navigation tilbyr enklere navigation mellom screens med tilhørende scripts.
Vi brukte expo-cli og expo init ved start av prosjektet, slik at Navigation var allerede en del av applikasjonen.

**Moment**
Formaterer og parser datoer i henhold til den standard som ønskes.

```javascript
{
  value ? moment(value).format("YYYY. MMMM DD") : "not set";
}
```

**Test Renderer**
Gjør det mulig å rendre React componenter til rene javascript objekter, uten å bruke DOM.  
Kan brukes i samsvar med Jest for å ta et snapshot av JSON-treet, for så å kunne traversere treet og gjøre assertions.

```javascript
test("renders correctly", () => {
  const tree = renderer.create(<TodoScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

**WakaTime**
For å følge med hvor mye enkelte personer jobbet i gruppen, istedenfor å loggføre det manuelt, brukte vi WakaTime. Det er en tjeneste (som er lett installert i de fleste populære IDEs som VS Code) som måler tidsbruk på brancher, og filer. For resultatet, se vedlagt PDF fil.

**ESlint / Prettier**
Vi brukte de to overnevnte verktøyene for å sørge for at vi har en konsistent kode, uavhengig av hvor mange som måtte jobbe på prosjektet vårt. ESlint markerer koden til utvikleren som ikke samsvarer med den forhåndsdefinerte kodeformatteringen. Deretter bruker Prettier denne formatteringen for å skrive om filen ved lagring. Med dette, kan alle skrive i sin egen stil og fortsatt være sikker på at resultatet er konsistent.

**Git / Github**
Vi brukte Git/Github for å holde styr på de forskjellige fasene i prosjektet. Ved hjelp av issues kunne vi lage oss en to-do liste, og ved hjelp av forskjellige branches, kunne vi være sikker på at features under utvikling var separert fra kode som vi har vurdert som ferdig. (ideen kommer fra GitFlow)
I hver commit-melding refererer vi til en spesifik issue for å bedre holde orden på arbeidet som er utført.

**Responsive layout**
For å implementere en layout brukte vi CSS flexbox og grid. I CSS begynte vi med å implementere styling for mobile enheter først, deretter skalerte vi designet opp ved hjelp av media queries. Dette kalles mobile first design. Den letteste måten å oppnå dette er å bruke “min-width” istedenfor “max-width” i media-queries. Da kan mobilen hoppe over alle media-queries den ikke trenger, og kan derfor vise det ønskede designet raskere. På en laptop eller en stasjonær PC vil det ikke være noe merkbar forskjell at den må parse noen ekstra media queries for å vise applikasjonen. Siden CSS Grid og Flex er veldig fleksible, trengte vi bare noen media queries for å få nettsiden til å se bra ut på ulike skjermstørrelser.

### Hvordan vi oppfyller krav til funksjonalitet

Applikasjonen tillater brukeren å opprette og fullføre mål, en huskeliste samt en kalender for å kunne holde orden på gjøremål og hendelser. Dette gjøres gjennom tre forskjellige tabs hvor brukeren navigerer applikasjonens innhold. Man kan selv velge en dato i kalenderen der man spesifiserer hendelsens varighet og tittel. I både Motivation og Todo -manageren kan man opprette, slette og endre mål og TO-DOs.
All data som brukeren selv oppretter er persistent over økter vha. Reacts innebygde storage-funksjonaliteter. (Se seksjon om AsyncStorage)

Oppgaven var for det meste ganske fri med tanke på hva applikasjonen skal være i stand til, så lenge data ble opprettholdt mellom økter, og at applikasjonen fungerer på både Android og iOS.

## Testing

Vi har testet applikasjonen med fokus på brukergrensesnitt og responsiv web design. Dette ble gjort i både Google Chrome og Firefox, og på ulike enheter med ulik skjermstørrelse. På grunn av ulik default styling av for eksempel media player i nettleserne vil applikasjonen til en viss grad se ulik ut. Dette var en minimal forskjell som ikke hadde noe effekt på funksjonaliteten og vi synes dermed at det er greit slik det er. Se vedlagte bilder.

Testingen ble utført systematisk på de ulike enhetene ved å sjekke alle funksjonene for å forsikre oss om at brukergrensesnittet funker som tenkt på tvers av enheter.

![image](https://user-images.githubusercontent.com/18369201/45872469-67d8c580-bd90-11e8-8d05-fa83b28031f2.png)
Firefox / Linux

![image](https://user-images.githubusercontent.com/18369201/45872542-8dfe6580-bd90-11e8-9bf6-dc91d891a07d.png)
Google Chrome / Linux

![screenshot_20180921-103351_2](https://user-images.githubusercontent.com/22095633/45872577-a79fad00-bd90-11e8-8a60-4dfc1da024c8.jpg)
Google Chrome / Mobil
