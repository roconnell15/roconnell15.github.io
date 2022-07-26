function displayClock() {
  const today = new Date();

  const day = getDayByIndex(today.getDay());
  const month = getMonthByIndex(today.getMonth());
  const date = addDateSuffix(today.getDate());
  const year = today.getFullYear();

  const dateDisplay = document.getElementById('date-display');
  dateDisplay.textContent = `${day}, ${month} ${date} ${year}`;

  const militaryHours = addLeadingZero(today.getHours());
  const standardHours = getStandardHours(militaryHours);
  const minutes = addLeadingZero(today.getMinutes());
  const seconds = addLeadingZero(today.getSeconds());

  const timeDisplay = document.getElementById('time-display');
  timeDisplay.textContent = `${standardHours}:${minutes}:${seconds} ${militaryHours > 12 ? 'PM' : 'AM'}`
}

function addLeadingZero(time) {
  if (time < 10) {
    return "0" + time;
  } else {
    return time;
  }
}

function getStandardHours(militaryHours) {
  if (militaryHours === 0) {
    return 12
  } else if (militaryHours > 12) {
    return militaryHours - 12
  } else {
    return militaryHours
  }
}

function addDateSuffix(date) {
  if (date === 1 || date === 21 || date === 31) {
    return date + "st";
  } else if (date === 2 || date === 22) {
    return date + "nd";
  } else if (date === 3 || date === 23) {
    return date + "rd";
  } else {
    return date + "th";
  }
}

function getMonthByIndex(index) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return months[index];
}

function getDayByIndex(index) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  return days[index];
}

setInterval(displayClock, 100);
displayClock();