$(document).ready(function(){
  var $_GET = [];
  document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }
    $_GET[decode(arguments[1])] = decode(arguments[2]);
  });
  var dayRate = parseFloat($_GET["dayRate"]);
  var numberHoursInAWorkingDayIncludingLunch = 8;
  var payPerSecond = dayRate / (numberHoursInAWorkingDayIncludingLunch * 60 * 60);
  var timeStartedWorkInMorning = moment('09:00', "HH:mm:ss");

  function calculateAmountEarned(startTime = timeStartedWorkInMorning, stopTime = moment()) {
    let numberSecondsWorked = stopTime.diff(startTime, 'seconds');
    // return (numberSecondsWorked * payPerSecond).toFixed(2);
    let amount = (numberSecondsWorked * payPerSecond).toFixed(2);
    if (amount < dayRate) {
      return amount;
    }
    else {
      return dayRate.toFixed(2);
    }
  }

  function displayAmountEarned() {
    var amountEarnedSoFarToday = calculateAmountEarned();
    $('#amountEarned').text(amountEarnedSoFarToday.toString());
  }

  var x = setInterval(function() {
    displayAmountEarned();
    // need to clear the interval once it gets to the day rate
  }, 1000);
});

// TO DO
// Make the SVG background image responsive
// Make the text stand out more
// Style the form on the first page
