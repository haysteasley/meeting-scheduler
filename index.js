const express = require('express');
const cors = require('cors');
const Cron = require('croner');
const fs = require('fs');

const app = express();
const port = 5500;

app.use(express.json());
app.use(cors({ origin: '*' }));

// Inside your schedule-meeting route handler
app.post('/schedule-meeting', (req, res) => {
    try {
        const { dateTime } = req.body;
        const timeZones = ['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney', 'Africa/Cairo'];
        const scheduledTimes = scheduleTimes(dateTime, timeZones);
        res.json({ success: true, timeZones, scheduledTimes });
    } catch (error) {
        console.error('Error in /schedule-meeting route:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error', details: error.message });
    }
});

// Function to schedule times
function scheduleTimes(dateTime, timeZones) {
    const scheduledTimes = timeZones.map((timezone) => {
        const scheduledTime = calculateScheduledTime(dateTime, timezone);
        console.log(`Scheduled meeting in ${timezone}: ${scheduledTime}`);
        return scheduledTime;
    });

    return scheduledTimes;
}

// Function to calculate scheduled time in a specific timezone using Croner
function calculateScheduledTime(dateTime, timezone) {
    try {
        // Croner to handle time zone conversions
        const job = Cron(dateTime, { timezone }, () => {});
        const scheduledTime = job.nextRun().toLocaleString();
        return scheduledTime;
    } catch (error) {
        console.error('Error in calculateScheduledTime:', error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}

// Serve HTML content from file
const htmlContent = fs.readFileSync('index.html', 'utf8');
app.get('/', (req, res) => {
    res.send(htmlContent);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
