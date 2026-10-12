function displayDateTimes() {
  const now = new Date();
  let clientDateTime = now.toLocaleString('en-UK', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  });
  const formatDateTime = (dateTimeString) => {
    const parts = dateTimeString.split(', ');
    const time = parts[1];
    const date = parts[0];
    return `${time} (${date})`;
  };
  clientDateTime = formatDateTime(clientDateTime);

  let utcDateTime = now.toLocaleString('en-UK', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  });

  utcDateTime = formatDateTime(utcDateTime);

  div = document.createElement('div');
  div.class = 'timestamp';
  document.body.appendChild(div);

  // Style the container for the lower right corner
  div.style.position = 'fixed';
  div.style.bottom = '1rem';
  div.style.right = '1rem';
  div.style.backgroundColor = 'rgb(255 195 40)';
  div.style.color = 'rgb(0 0 0)';
  div.style.padding = '.5rem';
  div.style.border = '1px solid rgb(0 0 0 / 10%)';
  div.style.borderRadius = '.5rem';
  div.style.zIndex = '1000'; // Ensure it's on top of other elements
  div.style.textAlign = 'center'; // align the text to the right.
  div.style.fontFamily = 'monospace'; // monospaced to keep the date/time aligned.

  // Create the date/time elements
  div.innerHTML = `
    <p>Time: ${clientDateTime}<br>
    UTC-0: ${utcDateTime}</p>
  `;
}

displayDateTimes();
setInterval(displayDateTimes, 60000); // Update every minute