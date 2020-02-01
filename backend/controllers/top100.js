const db = require('../config/database');

const asyncHandler = require('../middleware/async');

// @desc    Get Top100 most played tracks, albums or artists of a certain month
// @route   GET /
// @access  Private
exports.getTop100 = asyncHandler(async (req, res) => {
  const result = await db.query(
    ` 
        SELECT COUNT(*) as count
        , rt.track_id
        , tr.name as track_title
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
        AND re.program_date BETWEEN "${req.query.start_date}" AND "${req.query.end_date}"
        GROUP BY ${req.query.list}
        ORDER BY COUNT(*) DESC
        LIMIT 100
        `,
    {
      type: db.QueryTypes.SELECT
    }
  );
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).end();
  }
});
