import type { Item } from "./types";

function getUTCTimeForStartOfNextDay() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  tomorrow.setUTCHours(0, 0, 0, 0);

  return tomorrow;
}

function getUTCTimeForStartOfNextWeek() {
  const now = new Date();
  var nextMonday = new Date();

  while (nextMonday.getUTCDay() !== 1) {
    nextMonday.setUTCDate(nextMonday.getUTCDate() + 1);
  }

  nextMonday.setHours(7, 30, 0, 0);
  if (nextMonday < now) {
    nextMonday.setUTCDate(nextMonday.getUTCDate() + 7);
  }
  return nextMonday;
}

export function getCookieValue(cookieName: string) {
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");

    if (name === cookieName) {
      return value === "true" ? true : value === "false" ? false : null;
    }
  }
  return null;
}

export function setCookie(name: string, value: string, interval: string) {
  let time = new Date();

  switch (interval) {
    case "daily":
      time = new Date(getUTCTimeForStartOfNextDay());
      break;
    case "weekly":
      time = new Date(getUTCTimeForStartOfNextWeek());
      break;
    default:
      let expires = time.getTime() + 1000 * 60 * 60 * 24 * 365;
      time.setTime(expires);
      break;
  }

  document.cookie =
    name + "=" + value + ";expires=" + time.toUTCString() + ";path=/";
}
