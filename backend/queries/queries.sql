-- get single track by trackid
SELECT t.name as track_title, ar.name as artist, al.name as album, t.id as track_id,
al.id as album_id, ar.id as artist_id, t.label as label
FROM playlist__artist as ar, playlist__album as al, playlist__track as t
WHERE t.id = 12344
and t.album_id = al.id
and t.artist_id = ar.id

-- get single album by albumid
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
