# Käyttöohje

Käyttäjä kirjautuu sisään sovelluksen etusivulla. Onnistuneen kirjautumisen jälkeen etusivulla voi luoda uuden raportin. Myös käyttäjän omat keskeneräiset raportit näkyvät etusivulla.

# Uuden raportin luominen

Uuteen raporttiin täytetään seuraavat tiedot:

- Ohjelma
- Ohjelmanumero (löytyy radion viikottaisesta ohjelmakalenterista, ei pakollinen)
- DJ:n nimi
- Ohjelman päivämäärä
- Ohjelman alkuaika
- Ohjelman loppumisaika

Jos ohjelmaa ei löydy aktiivisten ohjelmien listalta, "Lisää uusi ohjelma" -painikkeella käyttäjä voi lisätä uuden ohjelman. Kun tarvittavat tiedot on täytetty, klikkamalla "Jatka" -painiketta käyttäjä pääsee lisäämään kappaleita raporttiin.

# Kappaleiden lisääminen raporttiin

Kappaleita on mahdollista hakea raporttiin studion playout-softan soittologista (Hae kappaleet DJOnlinesta -nappi). Syöttämällä päivämäärän ja kellonajan raporttiin voi lisätä biisit, jotka ovat soineet playout-softasta kyseiseen aikaan. Mikäli ohjelma on äänitetty ennakkoon 2.studiossa, niin haku on tehtävä siltä ajalta jolloin ennakkoäänitys tehtiin.

Mikäli kappaleet on soitettu muualta kuin playout-softasta, käyttäjä syöttää jokaisen biisin käsin. Käytössä on ennakoiva pikahaku, joilla haetaan tietokannasta jo entuudestaan soitettuja kappaleita. Haku etsii tuloksia sekä kappaleen ja artistin nimellä, järjestäen tulokset aakkosjärjestyksessä kappaleen nimen mukaan. Jos haulla löytyy oikea kappale, niin klikkaamalla ensin biisin nimeä ja sitten "Lisää biisi raporttiin" -nappia kappale lisätään raporttiin.

Tarkennettu haku -painikkeella käyttäjä pääsee tarkennettuun hakuun. Mikäli kapplaetta ei löydy tietokannasta, Lisää uusi kappale -painikkeella käyttäjä lisää uudesta kappaleesta tarvittavat tiedot ja tallentaa ne tietokantaan sekä kesken olevaan raporttiin.

Listan vasemmassa reunassa olevilla tick boxeilla voi valita kappaleita poistettavaksi raportista. Valitut kappaleet poistetaan klikkaamalla "Poista valitut" -nappia listan alareunasta. Kappaleen sijaa raportissa voi muuttaa raahaamalla biisiä ylös alas nuoli-ikonista. Listan oikeassa reunassa olevaa sinistä "Muokkaa" -ikonia klikkaamalla muokataan yhden kappaleen tietoja. Punaista ruksia klikkaamalla kyseinen kappale poistetaan raportista.

Kun kaikki kappaleet on syötetty, raportin tilaksi vaihdetaan valmis ja tallennetaan. Raporttiin lisätyt kappaleet tallentuvat automaattisesti. Tallenna -napin klikkaaminen on tarpeen ainoastaan silloin, kun raportin tietoja (päivämäärä, ohjelman nimi, tila) muutetaan.

# Raportit

Raportit -näkymässä käyttäjä pääsee selaamaan tekemiään raportteja per kuukausi. Raportit on mahdollista suodattaa tekstisuodatuksella, sekä tilan (valmis/keskeneräinen) mukaan. Klikkaamalla punaista ruksia kyseinen raportti poistetaan. Punaisella tekstillä merkityt raportit ovat uusintaohjelmien raportteja. Sinisellä tekstillä merkityt ovat uusien ohjelmien raportteja.

# Aktiivinen raportti

Viimeisin avattu raportti on aktiivinen raportti. Ko. raportin ohjelman nimi ja päivämäärä näkyvät navigointipalkin oikeassa reunassa. Top100- ja Haku -näkymien kautta lisätyt kappaleet päätyvät tähän raporttiin.

# Haku

Haku -näkymässä käyttäjä voi hakea artisteja, albumeja tai kappaleita sanahaulla. Klikkaamalla artistin, albumin tai kappaleen nimeä pääsee muokkaamaan niiden tietoja. Klikkaamalla vihreää + -symbolia hakutuloksen oikeassa reunassa ko. kappale lisätään aktiiviseen raporttiin.

Sekä artistin, albumin ja biisin nimen perässä lukee vihreällä id-numero. Mikäli tuloksissa on duplikaatteja, klikkaamalla id-numeroa artistin, biisin tai albumin voi yhdistää toiseen ja näin poistaa duplikaatin tietokannasta.

# Top100

Top100 -näkymässä näkee sata eniten soinutta artistia, albumia tai kappaletta tietyllä aikavälillä. Klikkaamalla vihreää + -symbolia hakutuloksen oikeassa reunassa ko. kappale lisätään aktiiviseen raporttiin.

# Omat tiedot ja ulos kirjautuminen

Klikkamalla omaa nimeään navigointipalkissa käyttäjä voi muokata omia tietojaan, vaihtaa salasanan ja kirjautua ulos.

# Käyttäjätasot

Sovelluksessa on kolme eri käyttäjätasoa:

- DJ
- Toimitus
- Admin

## DJ

Peruskäyttäjällä eli DJ:llä on oikeus luoda raportteja, selata omia raporttejaan, hakea biisejä tietokannasta ja selata top100-listoja

## Toimitus

Toimitus-käyttäjällä on samat oikeudet kuin DJ-käyttäjällä, sekä:

### Kaikkien käyttäjien raportit ja raporttien monistaminen

Toimitus -käyttäjä voi selata kaikkien käyttäjien kaikkia raportteja. Mikäli ohjelma lähetetään uusintana, niin tällöin alkuperäisen lähetyksen raporttiin vaihdetaan uusinnan lähetyspäivä ja kellonaika. "Monista" -napilla raportti monistetaan uuteen ajankohtaan.

### Ohjelmat

Ohjelmat -sivulla käyttäjä voi muokata ohjelman tietoja. Aktiiviset ohjelmat näkyvät vihreällä pohjalla. Vaihtamalla ohjelman tilaksi aktiivinen ko. ohjelma saadaan näkyviin listalla josta valitaan uuden raportin ohjelma. Klikkaamalla listan vasemmassa reunassa olevaa ID-numeroa duplikaattiohjelma voidaan yhdistää toiseen ohjelmaan. Luo uusi ohjelma -painikkeella luodaan uusi ohjelma.

## Admin

Admin-käyttäjillä on samat oikeudet kuin Toimitus-käyttäjillä, sekä kaksi muuta näkymää:

### Käyttäjät

Käyttäjät -sivulla on lista sovelluksen käyttäjistä. Klikkaamalla käyttäjänimeä voi muokata käyttäjän tietoja. Hyllyllä olevilla käyttäjillä ei ole pääsyä sovellukseen. Punaisesta ruksista käyttäjä voidaan poistaa. Lisää uusi käyttäjä -napilla luodaan uusi käyttäjä.

### Siirtotiedostot

Siirtotiedostot -sivulla koostetaan tekijänoikeusjärjestöille lähetettävä raportti kuukauden soittotapahtumista. Käyttäjä valitsee kuukauden ja klikkaa HAE-nappia. Kun raportti on valmis, linkki tekstitiedostoon ilmestyy alla olevaan listaan. Listalla näkee ko. raportin luontipäivämäärän, raportin luoneen käyttäjän, raportin ajankohtan (MM/YYYY) ja linkin itse tiedostoon.
