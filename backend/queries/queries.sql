-- get single track by trackid
SELECT t.name as track_title, ar.name as artist, al.name as album, t.id as track_id,
al.id as album_id, ar.id as artist_id, t.label as label, al.identifier as cat_id, t.length, t.side as disc_no,
t.track_no, t.people, t.isrc, al.year, t.comment, t.record_country, t.country
FROM playlist__artist as ar, playlist__album as al, playlist__track as t
WHERE t.id = 123441
and t.album_id = al.id
and t.artist_id = ar.id

-- get one album details
SELECT al.name as album_name
 , al.id as album_id
 , al.label
 , al.identifier as cat_id
 , al.spotify_id
 , al.year
 , ar.name as artist_name
 , ar.id as artist_id
FROM playlist__artist as ar
INNER JOIN playlist__album as al ON al.artist_id = ar.id
WHERE al.id = 135826

-- get single album with tracks by albumid
SELECT t.name as track_title, ar.name as artist, al.name as album, t.id as track_id,
al.id as album_id, ar.id as artist_id, t.label as label
FROM playlist__artist as ar, playlist__album as al, playlist__track as t
WHERE al.id = 19029
and al.artist_id = ar.id
and t.album_id = al.id

-- get all tracks of one report by report_id
SELECT rt.sortable_rank, ar.name as artist_name, tr.name as track_title, tr.length as length,
tr.id as track_id, ar.id as artist_id
FROM playlist__track as tr, playlist__artist as ar, playlist__report_track as rt
WHERE rt.report_id = 64249
and ar.id = tr.artist_id
and rt.track_id = tr.id
order by sortable_rank asc

-- get all tracks of one report with program name, date, time
SELECT rt.sortable_rank, re.program_no, ar.name as artist_name, tr.name as track_title, tr.length as length,
tr.id as track_id, ar.id as artist_id, re.program_id, pr.name as program_name, re.id as report_id,
re.program_date, re.program_start_time, re.program_end_time
FROM playlist__track as tr, playlist__artist as ar, playlist__report_track as rt,
playlist__report as re, playlist__program as pr
WHERE rt.report_id = 64249
and ar.id = tr.artist_id
and rt.track_id = tr.id
and re.program_id = pr.id
and re.id = rt.report_id
order by sortable_rank asc

-- select all programs by month
SELECT re.program_no, pr.name, re.program_date, re.program_start_time, 
re.program_end_time, re.status, re.rerun, re.program_dj, re.id
FROM playlist__program as pr, playlist__report as re
where re.program_date like "2018-02%"
and pr.id = re.program_id
order by program_date asc

-- get report details
SELECT pr.name as program_name, re.program_no, re.program_dj, re.program_date, re.program_start_time, 
re.program_end_time, re.id as report_id, pr.id as program_id, re.rerun, re.status,
re.user_id, us.username, us.first_name, us.last_name
FROM playlist__program as pr, playlist__report as re, playlist__user as us
WHERE re.id = 64249
and pr.id = re.program_id
and re.user_id = us.id

-- query for autocomplete search
SELECT t.name as track_title, ar.name as artist, al.name as album, t.id as track_id,
al.id as album_id, ar.id as artist_id, t.label as label
FROM playlist__artist as ar, playlist__album as al, playlist__track as t
WHERE t.album_id = al.id
and t.artist_id = ar.id
and (t.name like "%bowie%" or ar.name like "%bowie%")
order by t.name asc

-- get required info for monthly report export
SELECT re.program_date, re.program_start_time, re.program_end_time,
pr.name as program_name, ar.name as artist_name, tr.name as track_title,
tr.length, tr.people as copyright_holders, tr.country, al.label,
al.identifier as cat_id, al.year
FROM playlist__report as re, playlist__program as pr, playlist__artist as ar,
playlist__report_track as rt, playlist__track as tr, playlist__album as al
WHERE re.program_id = pr.id
and rt.track_id = tr.id
and rt.report_id = re.id
and tr.artist_id = ar.id
and al.artist_id = ar.id
and tr.album_id = al.id
and re.status = 1
and re.program_date like "2018-10%"
order by program_date asc, program_start_time asc
limit 10000

-- get top 100 tracks
SELECT COUNT(*) as count, rt.track_id, tr.name as track_title, al.name as album, ar.name as artist,
al.id as album_id, ar.id as artist_id
FROM playlist__artist as ar, playlist__album as al, playlist__track as tr, 
playlist__report_track as rt, playlist__report as re
WHERE re.id = rt.report_id and tr.id = rt.track_id
and ar.id = tr.artist_id and al.id = tr.album_id
and tr.id = rt.track_id and re.status = 1
and re.program_date between "2019-01-01" and "2019-02-31"
GROUP BY rt.track_id
ORDER BY COUNT(*) DESC
limit 100

-- get top100 artists
SELECT COUNT(ar.name) as count, ar.name as artist,
ar.id as artist_id
FROM playlist__artist as ar, playlist__album as al, playlist__track as tr, 
playlist__report_track as rt, playlist__report as re
WHERE re.id = rt.report_id and tr.id = rt.track_id
and ar.id = tr.artist_id and al.id = tr.album_id
and tr.id = rt.track_id and re.status = 1
and re.program_date between "2019-01-01" and "2019-02-31"
GROUP BY ar.id
ORDER BY COUNT(*) DESC
limit 100

-- get top100 albums
SELECT COUNT(*) as count, al.name as album, ar.name as artist,
al.id as album_id, ar.id as artist_id
FROM playlist__artist as ar, playlist__album as al, playlist__track as tr, 
playlist__report_track as rt, playlist__report as re
WHERE re.id = rt.report_id and tr.id = rt.track_id
and ar.id = tr.artist_id and al.id = tr.album_id
and tr.id = rt.track_id and re.status = 1
and re.program_date between "2018-01-01" and "2018-02-31"
GROUP BY al.id
ORDER BY COUNT(*) DESC
limit 100

-- get album id, name, cat_id, track count, report occurrence count by artist id
SELECT al.id as album_id, al.name, al.identifier, count(distinct tr.id) as track_count, count(rt.track_id) as report_occurrence
FROM playlist__album as al, playlist__artist as ar, playlist__track as tr,
playlist__report_track as rt
WHERE al.artist_id = ar.id
and tr.album_id = al.id
and rt.track_id = tr.id
and ar.id = 39887
group by album_id
-- same with joins
SELECT al.id as album_id
 , al.name
 , al.identifier
 , count(distinct tr.id) as track_count
 , count(rt.track_id) as report_occurrence
FROM playlist__album as al
INNER JOIN  playlist__artist as ar ON al.artist_id = ar.id
INNER JOIN  playlist__track as tr ON tr.album_id = al.id
INNER JOIN  playlist__report_track as rt ON  rt.track_id = tr.id
WHERE ar.id = 39887
group by album_id

-- get all tracks and report occurrences of one album
SELECT tr.id as track_id
 , tr.isrc
 , tr.side as disc_no
 , tr.track_no
 , tr.name as track_title
 , ar.name as artist_name
 , count(rt.track_id) as report_occurrence
FROM playlist__album as al
INNER JOIN  playlist__artist as ar ON al.artist_id = ar.id
INNER JOIN  playlist__track as tr ON tr.album_id = al.id
INNER JOIN  playlist__report_track as rt ON  rt.track_id = tr.id
WHERE al.id = 135826
group by track_id
order by track_no asc, track_title asc

-- get playhistory of one track
SELECT pr.name as program_name
 , pr.id as program_id
 , re.id as report_id
 , re.program_date
 , rt.track_id
FROM playlist__program as pr
INNER JOIN playlist__report as re ON re.program_id = pr.id
INNER JOIN playlist__report_track as rt ON rt.report_id = re.id
WHERE rt.track_id = 97975
GROUP BY re.id
ORDER BY program_date desc

-- get search results by query
SELECT ar.name as artist_name
 , ar.id as artist_id
 , al.name as album_name
 , al.id as album_id
 , tr.name as track_title
 , tr.id as track_id
 , MAX(re.program_date) as program_date
 , MAX(re.id) as report_id
FROM playlist__program as pr
INNER JOIN playlist__report as re ON re.program_id = pr.id
INNER JOIN playlist__report_track as rt ON rt.report_id = re.id
INNER JOIN playlist__track as tr ON rt.track_id = tr.id
INNER JOIN playlist__album as al ON tr.album_id = al.id
INNER JOIN playlist__artist as ar ON tr.artist_id = ar.id AND al.artist_id = ar.id
WHERE al.name like "%mellon collie%"
GROUP BY tr.id
ORDER BY program_date desc

-- merge two tracks
START TRANSACTION;
UPDATE playlist__report_track SET track_id=409314 WHERE track_id=409444;
DELETE FROM playlist__track WHERE id=409444;
COMMIT;

-- merge two artists
START TRANSACTION;
UPDATE playlist__album SET artist_id=29024 WHERE artist_id=83177;
UPDATE playlist__track SET artist_id=29024 WHERE artist_id=83177;
DELETE FROM playlist__artist WHERE id=83177;
COMMIT;

-- merge two albums
START TRANSACTION;
UPDATE playlist__track SET album_id=4025 WHERE album_id=134978;
DELETE FROM playlist__album WHERE id=134978;
COMMIT;

-- get all plays in a period of time
SELECT COUNT(*) as count
        , rt.track_id
        , tr.name as track_title
        , tr.country as country
        , tr.record_country
        , al.name as album
        , ar.name as artist
        , al.id as album_id
        , ar.id as artist_id
        FROM playlist__report as re
        INNER JOIN playlist__report_track as rt ON re.id = rt.report_id
        INNER JOIN playlist__track as tr ON tr.id = rt.track_id
        INNER JOIN playlist__artist as ar ON ar.id = tr.artist_id
        INNER JOIN playlist__album as al ON al.id = tr.album_id
        WHERE re.status = 1
        AND re.program_date BETWEEN "2019-12-18" AND "2020-03-18"
        GROUP BY rt.track_id
        ORDER BY COUNT(*) DESC
        LIMIT 12000

-- get all finnish plays - where record country or country is set as finland
SELECT COUNT(*) as count
        , ar.name as artist
		, tr.name as track_title
		, al.name as album
		, tr.country as country
        , tr.record_country
        , rt.track_id
        , al.id as album_id
        , ar.id as artist_id
        FROM playlist__report as re
        INNER JOIN playlist__report_track as rt ON re.id = rt.report_id
        INNER JOIN playlist__track as tr ON tr.id = rt.track_id
        INNER JOIN playlist__artist as ar ON ar.id = tr.artist_id
        INNER JOIN playlist__album as al ON al.id = tr.album_id
        WHERE re.status = 1
        AND re.program_date BETWEEN "2019-12-18" AND "2020-03-18"
        AND ((tr.record_country LIKE "%FI%" OR tr.country = 1)
        OR (tr.country = 1 AND tr.record_country is null))
        GROUP BY rt.track_id
        ORDER BY COUNT(*) DESC
        LIMIT 12000