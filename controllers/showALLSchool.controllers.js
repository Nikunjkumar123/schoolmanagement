const db = require('../config/db.js');
const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = angle => (angle * Math.PI) / 180;
    const R = 6371;

    lat1 = toRadians(lat1);
    lat2 = toRadians(lat2);
    lon1 = toRadians(lon1);
    lon2 = toRadians(lon2);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

const listSchools = async (req, res) => {
    try {
        const userLatitude = parseFloat(req.query.latitude);
        const userLongitude = parseFloat(req.query.longitude);
        if (isNaN(userLatitude) || isNaN(userLongitude)) {
            return res.status(400).send('Invalid latitude or longitude');
        }
        const [schools] = await db.query('SELECT * FROM school');
        const schoolsWithDistance = schools.map(school => {
            const distance = haversineDistance(
                userLatitude,
                userLongitude,
                parseFloat(school.lattitude),
                parseFloat(school.longitude)
            );
            return { ...school, distance };
        });

        const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    } catch (error) {
        console.error('Error fetching schools:', error);
        res.status(500).send('Error while fetching schools');
    }
};

module.exports = listSchools;
