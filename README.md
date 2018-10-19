Web development course @ NTNU by

- Håvard Bergheim Olsen
- Balázs Orbán
- Kristian Huse

using React Native.

# Prosjekt 3 [![Build Status](https://travis-ci.com/IT2810/it2810-webutvikling-h18-prosjekt-3-09.svg?branch=master)](https://travis-ci.com/IT2810/it2810-webutvikling-h18-prosjekt-3-09) ![Coverage](https://raw.githubusercontent.com/IT2810/it2810-webutvikling-h18-prosjekt-3-09/master/docs/badge.svg?sanitize=true)

## Teknologier brukt i prosjektet

- React Native/ ES6
- AsyncStorage
- Expo
- WakaTime
- ESlint / Prettier
- Git / Github
- VSCode

## Tredjepartsbiblioteker

- Easy Grid
- Elements
- Modal Datetime Picker
- Navigation
- Moment
- Test Renderer

### Hvordan vi oppfyller krav til teknologi

**React Native / ES6**
Siden oppgaven var å utvikle en prototype av en mobilapplikasjon er React Native med bruk av Expo verktøyet et ypperlig valg.
Den tillater oss å utvikle en applikasjon for Android og iOS samtidig, samt at det eksisterer en rekke tredjepartsbiblioteker som kan simplifisere utviklingsprosessen ved at man slipper å finne på hjulet på nytt hver gang. Siden oppgaven for det meste består i å lage en app med lite krav rundt ytelse, slipper man å utvikle platformspesifikt for å holde ytelsen oppe.

Vi har strukturert applikasjonen i komponenter som er implementert med class, noe som gjorde utviklingen oversiktlig og forståelig. Det gjorde også at vi kunne utvikle de ulike komponentene uavhengig av hverandre. Dette gjorde at gruppen jobber mer effektivt.

Vi har ikke implementert noe form for gps, pedometer eller dirkete kommunikasjon i appen vår. Dette begrunnes med for lite tid satt av til issue #2 som omhandlet implementering av gps.

**AsyncStorage**
Lagrer data asynkront og ukryptert på enheten som nøkkel-datapar. Måten data lagres på kommer an på enhetens operativsystem, og det er sterkt anbefalt å ha et abstraksjonsnivå over AsyncStorage dersom noe mer enn simple operasjoner skal utføres. Dette inkluderer kryptering av data, dersom sensitiv informasjon om brukeren skal behandles.

**WakaTime**
For å følge med hvor mye enkelte personer jobbet i gruppen, istedenfor å loggføre det manuelt, brukte vi WakaTime. Det er en tjeneste (som er lett installert i de fleste populære IDEs som VS Code) som måler tidsbruk på brancher, og filer. For resultatet, se vedlagt PDF fil.

**ESlint / Prettier**
Vi brukte de to overnevnte verktøyene for å sørge for at vi har en konsistent kode, uavhengig av hvor mange som måtte jobbe på prosjektet vårt. ESlint markerer koden til utvikleren som ikke samsvarer med den forhåndsdefinerte kodeformatteringen. Deretter bruker Prettier denne formatteringen for å skrive om filen ved lagring. Med dette, kan alle skrive i sin egen stil og fortsatt være sikker på at resultatet er konsistent.

**Git / Github**
Vi brukte Git/Github for å holde styr på de forskjellige fasene i prosjektet. Ved hjelp av issues kunne vi lage oss en to-do liste, og ved hjelp av forskjellige branches, kunne vi være sikker på at features under utvikling var separert fra kode som vi har vurdert som ferdig. (ideen kommer fra GitFlow)
I hver commit-melding refererer vi til en spesifik issue for å bedre holde orden på arbeidet som er utført.

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
tilbyr enklere navigasjion mellom screens med tilhørende scripts.
Vi brukte expo-cli og expo init ved start av prosjektet, slik at Navigation var allerede en del av applikasjonen.

**Moment**
Formaterer og parser datoer i henhold til den standard som ønskes.

```javascript
//Imprts
import DateTimePicker from "react-native-modal-datetime-picker";
...
{value ? moment(value).format("YYYY. MMMM DD") : "not set"}
```

**Test Renderer**
Gjør det mulig å rendre React componenter til rene javascript objekter, uten å bruke DOM.  
Kan brukes i samsvar med Jest for å ta et snapshot av JSON-treet, for så å kunne traversere treet og gjøre assertions.

```javascript
//Imports
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<TodoScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
```


### Hvordan vi oppfyller krav til funksjonalitet

Applikasjonen tillater brukeren å opprette og fullføre mål, en huskeliste samt en kalender for å kunne holde orden på gjøremål og hendelser. Dette gjøres gjennom tre forskjellige tabs hvor brukeren navigerer applikasjonens innhold. Man kan selv velge en dato i kalenderen der man spesifiserer hendelsens varighet og tittel. I både Motivation og Todo -manageren kan man opprette, slette og endre mål og TO-DOs.
All data som brukeren selv oppretter er persistent over økter vha. Reacts innebygde storage-funksjonaliteter. (Se seksjon om AsyncStorage)

Oppgaven var for det meste ganske fri med tanke på hva applikasjonen skal være i stand til, så lenge data ble opprettholdt mellom økter, og at applikasjonen fungerer på både Android og iOS.

## Testing

Hovedformålet vårt med testingen i prosjektet, var å forsikre oss at funksjonalitet fungerer som antatt. Vi har forsøkt å oppnå 80% code coverage for oppnå en så lav risikofaktor som mulig.
For en detaljert code coverage [trykk her](https://it2810.github.io/it2810-webutvikling-h18-prosjekt-3-09/index.html).

I tilegg har vi testet applikasjonen på ulike 🤖 android-enheter, med server på både Windows og 🐧 Linux -maskiner. Vi utførte manuelle tester som simulerte tenkt bruk av appen for å forsikre oss om at appen oppfører seg slik vi ønsker. Vi hadde ikke mulighet å teste for 🍏 iOS, da ingen av oss i gruppa hadde verken Mac, eller iPhone. [Testing av iOS går kun på iPhone eller Mac](https://forums.expo.io/t/ios-emulator-for-windows/2068/2) 

Expo sin egen kommentar om iOS simulator installasjon [link](https://docs.expo.io/versions/latest/introduction/installation#ios-simulator) 
:
> It'll take a while, go have a nap. 



Noen skjermbilder av appen:

| ![screenshot_20181016-151449](https://user-images.githubusercontent.com/22095633/47074553-ee9b8980-d1fa-11e8-9b91-59369ef1b4d4.jpg) |  ![screenshot_20181016-151411](https://user-images.githubusercontent.com/22095633/47074576-f78c5b00-d1fa-11e8-8ab7-9b7305145bdc.jpg) | ![screenshot_20181016-151659](https://user-images.githubusercontent.com/22095633/47074299-703ee780-d1fa-11e8-8e71-5d8e935c1c42.jpg) |
