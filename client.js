function scheduleMeeting() {
    const dateTimeInput = document.getElementById('dateTime');
    const dateTimeValue = dateTimeInput.value;

    fetch('http://localhost:5500/schedule-meeting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            dateTime: dateTimeValue,
        }),
    })
        .then(response => response.json())
        .then(data => {
            const timezoneResult = document.getElementById('timezoneResult');

            // Clear previous content
            timezoneResult.innerHTML = '';

            // Display scheduled times
            data.scheduledTimes.forEach((scheduledTime, index) => {
                const timezoneItem = document.createElement('div');
                timezoneItem.innerHTML = `Scheduled meeting in ${data.timeZones[index]}: ${scheduledTime}`;
                timezoneResult.appendChild(timezoneItem);
            });
        })
        .catch(error => console.error('Error:', error));
}
