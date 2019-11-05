# Fullstack Harjoitustyö - Teemu Kostamo

## Kappaletietojen raportointisovellus radiokanavalle

Harjoitustyön aiheena on uusi kappaletietojen raportointisovellus Radio Helsingille. Sovelluksen käyttäjiä ovat kanavan djt jotka täyttävät raportteihin ohjelmissaan soittamansa kappaleet.

Kuukausittaiset soittotapahtumat otetaan ulos tietokannasta ja toimitetaan eteenpäin tekijänoikeusjärjestöille heidän vaatimassaan formaatissa. Linkki Gramexin raportointiohjeeseen [tässä](https://www.gramex.fi//wp-content/uploads/2018/11/raportointiohje_kaupalliset_radiot_1_7_20091.pdf)

## Käyttöohje

Käyttäjä kirjautuu sisään sovelluksen etusivulla. Kirjautuneille aukeavassa näkymässä aloitetaan uuden raportin täyttäminen syöttämällä raporttiin ohjelman päivämäärä, kellonaika, ohjelman nimi ja dj:n nimi. Tämän jälkeen syötetään ohjelmassa soineet kappaleet. Kun kappaleet on syötetty, raportin tilaksi vaihdetaan valmis ja tallennetaan.

Kappaleita on mahdollista hakea raporttiin studion playout-softan soittologista (Hae kappaleet DJOnlinesta -nappi). Mikäli kappaleet on soitettu muualta kuin playout-softasta, dj syöttää jokaisen biisin käsin. Käytössä on ennakoiva pikahaku, joilla haetaan tietokannasta jo entuudestaan soitettuja kappaleita. Mikäli kapplaetta ei löydy tietokannasta, dj lisää kappaleesta tarvittavat tiedot, tallentaa ne tietokantaan ja kesken olevaan raporttiin.

Raportit -näkymässä käyttäjä pääsee selaamaan tekemiään raportteja. Raportit on mahdollista suodattaa kuukauden ja tilan (valmis/keskeneräinen) mukaan.

Haku -näkymässä käyttäjä voi hakea artisteja, albumeja tai kappaleita sanahaulla. Klikkaamalla artistin, albumin tai kappaleen nimeä pääsee muokkaamaan niiden tietoja.

Top100 -näkymässä näkee sata eniten soinutta artistia, albumia tai kappaletta tietyllä aikavälillä.

Omat tiedot -näkymässä käyttäjä voi muokata yhteystietojaan ja vaihtaa salasanan.

## Käyttöohje - admin

Admineilla perustoiminnallisuuksien lisäksi mahdollisuus selata ja muokata kaikkien käyttäjien kaikkia raportteja, lisätä tai poistaa käyttäjiä tai ohjelmia ja luoda tekijänoikeusjärjestöille lähetettävä siirtotiedosto yhden kuukauden kaikista raporteista. Admin voi monistaa olemassa olevia raportteja. Näin tehdään mikäli ohjelmia lähetetään uusintoina. Alkuperäisen lähetyksen raporttiin vaihdetaan päivämääräksi uusinnan päivämäärä.
