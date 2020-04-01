# Manual for song reporting app

User logs in on the front page. After a successful login user may create a new report. Current user's reports with the status "In progress" are also visible.

## Creating a new report

A new report requires the following information:

- Program name
- Program number (found on the station's internal calendar)
- DJ's first name and last name
- Program date
- Program start time
- Program end time

If desired program is not found on the list of programs, the user may create a new program by clicking the "Add new program" -button. After the required info has been filled, "Continue" -button takes the user to the current report page where songs can be added.

## Adding songs to the report

It is possible to fetch the songs from the studio's playout software's playlog (Fetch tracks from log -button). Insert date and time to the form, and click fetch. For programs pre-recorded at the second studio, please select "2nd studio" from dropdown, and set the date and time for the time of recording.

If songs were played from a source other than the playout software, all songs must be added manually. "Quick search" -button enables user to search for tracks already in database. Search by track title or artist name. If the desired track is found with the quick search, clicking the search result and then clicking "Add track to report" adds the track to the report.

"Advanced search" -button takes the user to the advanced search page. Clicking the plus icon next to a search result adds the track in question to the current report. Current report is visible in the right side of the navbar.

If the desired track is not found in the database, "Add a new track" opens a form to add a new track to the database and to the current report.

Tick boxes on the left side of the list of songs select the songs for removal. "Remove selected" -button removes the selected songs from the report. The order of songs may be changed by dragging a track from the arrow icon. The blue edit icon on the right side opens a window where details of a song may be edited. The red x removes the track from the current report.

After all the tracks are added to the report, the status is set to "Ready" and "Save" -button is clicked. All the songs added to the report are saved automatically. Clicking save is necessary only after changing the status, date or time.

## Reports

Reports -page allows the user to browse all his/her reports by month. Filtering reports is possible by text, or by status (ready/in progress). The red x on the right deletes a report. Reports listed in blue are original broadcasts of a show, reports listed in red are re-runs.

## Current report

The latest opened report is the current report. The name and the date of this report is visible on the right side of the navbar. Songs added in the Top100 and Search pages go to this report.

## Search

Artists, albums and songs can be searched by text on the search page. By clicking the name of a song, artist or album the user is able to edit their info. The green + -icon on the right adds the track in question to the current report.

A green id-number is visible next to the name of an artist, album or a song. Clicking the id enables the user to remove a duplicate entry by merging the two entries.

## Top100

Top100 -page shows the one hundred most played songs, artists or albums and their play count in a period of time. Clicking the green + -icon adds the song in question to current report.

## User info and logout

Clicking the user's name in the navbar enables them to edit their personal info, change password or logout.

# User roles

The application has three user roles:

- DJ
- Staff
- Admin

## DJ

DJ is the basic user. They are allowed to create reports, browse their own reports, add and search for songs, and browse top100-lists.

## Staff

Staff-user has the same rights as DJ, and:

#### All reports by all users and duplicating reports

Staff-user may browse all reports by all users. If a show is re-aired, the report of the show in question is duplicated, but with a new date and time, and the "Rerun" checkbox selected. Reruns are in red on the reports page.

#### Programs

Ohjelmat -sivulla käyttäjä voi muokata ohjelman tietoja. Aktiiviset ohjelmat näkyvät vihreällä pohjalla. Vaihtamalla ohjelman tilaksi aktiivinen ko. ohjelma saadaan näkyviin listalla josta valitaan uuden raportin ohjelma. Klikkaamalla listan vasemmassa reunassa olevaa ID-numeroa duplikaattiohjelma voidaan yhdistää toiseen ohjelmaan. Luo uusi ohjelma -painikkeella luodaan uusi ohjelma.
