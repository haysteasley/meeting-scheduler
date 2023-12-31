function scheduleMeeting() {
    const dateTimeInput = document.getElementById('dateTime');
    const dateTimeValue = dateTimeInput.value;

    fetch('https://meeting-scheduler-h9eo.onrender.com/schedule-meeting', {
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
          // Handle the response data
          console.log(data);

          const resultsDiv = document.getElementById('results');

          // Clear previous results
          resultsDiv.innerHTML = '';
      
          // Display results
          data.scheduledTimes.forEach((time, index) => {
            const city = data.timeZones[index];
            const resultItem = document.createElement('p');
            resultItem.textContent = `${city}, ${time}`;
            resultsDiv.appendChild(resultItem);
          });
        })
        .catch(error => console.error('Error:', error));
      

        then(response => response.json())
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
