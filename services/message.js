const Message = require("../models/message");
const schedule = require("node-schedule");

exports.scheduleMessage = async (payload) => {
  try {
    const { message, day, time } = payload;

    const scheduledTime = dayTimeConvert(payload);

    schedule.scheduleJob(scheduledTime, async () => {
      try {
        // Insert the message into the database
        await Message.create({ message, day, time });
        console.log("Message inserted into the database at", scheduledTime);
      } catch (error) {
        console.error("Error inserting message into the database:", error);
      }
    });

    return scheduledTime;
  } catch (error) {
    console.error("Error scheduling message:", error);
    throw new Error(
      "An error occurred while scheduling the message: " + error.message
    );
  }
};
const dayTimeConvert = (payload) => {
  const { day, time } = payload;

  const currentDate = new Date();

  const [specifiedHours, specifiedMinutes] = time.split(":").map(Number);

  // Create a new Date object for today with the specified time
  const todayWithSpecifiedTime = new Date(currentDate);
  todayWithSpecifiedTime.setHours(specifiedHours, specifiedMinutes, 0, 0); // Set seconds and milliseconds to 0

  // Check if the specified time has already passed for today
  const timeHasPassedForToday =
    currentDate.getTime() >= todayWithSpecifiedTime.getTime();

  // Get the current day of the week (0 for Sunday, 1 for Monday, etc.)
  const currentDayOfWeek = currentDate.getDay();

  // Get the target day of the week
  const targetDayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ].indexOf(day);

  // Calculate the number of days until the next occurrence of the target day
  let daysUntilNextOccurrence = targetDayOfWeek - currentDayOfWeek;
  // If the target day is today and the specified time has already passed for today,
  // or if the target day has already passed this week, add 7 days to get to the next occurrence
  if (
    (daysUntilNextOccurrence === 0 && timeHasPassedForToday) ||
    daysUntilNextOccurrence < 0
  ) {
    daysUntilNextOccurrence += 7;
  }

  // Create a new Date object for the next occurrence
  const nextOccurrence = new Date(currentDate);
  nextOccurrence.setDate(currentDate.getDate() + daysUntilNextOccurrence);

  // Set the time on the next occurrence date
  nextOccurrence.setHours(specifiedHours, specifiedMinutes, 0, 0); // Set seconds and milliseconds to 0

  console.log(nextOccurrence);

  return nextOccurrence;
};
