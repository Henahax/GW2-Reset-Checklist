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

export function setCookie(item: Item, type: string, checked: boolean) {
  let time = new Date();

  // Calculate expiration time to be 10 years in the future
  let expires = new Date(time.getTime() + 1000 * 60 * 60 * 24 * 365 * 10);

  // Update time based on interval and type
  if (item.interval === "daily" && type === "checked") {
    time = new Date(getUTCTimeForStartOfNextDay());
  }
  if (item.interval === "weekly" && type === "checked") {
    time = new Date(getUTCTimeForStartOfNextWeek());
  }

  // Set cookie with the calculated expiration time
  document.cookie =
    item.id +
    type +
    "=" +
    checked +
    ";expires=" +
    expires.toUTCString() +
    ";path=/";
}
