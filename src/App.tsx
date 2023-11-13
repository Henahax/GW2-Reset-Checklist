import "./App.css";
import categories from "./assets/categories.json";
import items from "./assets/items.json";
import Countdown, { zeroPad } from "react-countdown";
import { useState, useEffect } from "react";

function App() {
  let dateDaily = getUTCTimeForStartOfNextDay();
  let dateWeekly = getUTCTimeForStartOfNextWeek();

  return (
    <>
      <header>
        <div id="titles">
          <h1 id="title">Guild Wars 2 Reset Checklist</h1>
          <div id="timers">
            <div className="timerContainer">
              <div>Daily:</div>
              <Countdown
                date={dateDaily}
                zeroPadTime={2}
                daysInHours={true}
                onComplete={refreshPage}
              />
            </div>
            <div className="timerContainer">
              <div>Weekly:</div>
              <Countdown
                date={dateWeekly}
                zeroPadTime={2}
                onComplete={refreshPage}
              />
            </div>
            <button className="settingsButton" onClick={toggleSettings}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-gear"
                viewBox="0 0 16 16"
                color="white"
              >
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
              </svg>
            </button>
          </div>
        </div>
        <div id="subTitle">
          <div id="subTitleLeft">Timegated tasks without an ingame tracking system</div>
          <div id="subTitleRight">
            Open the settings menu to choose displayed items ({items.length}{" "}
            available)
          </div>
        </div>
        <div id="settings" className="hide">
          <div id="closeSettings">
            <div className="settingsHeader">Displayes Items</div>
            <button onClick={toggleSettings}>x</button>
          </div>
          <div id="settingCategories">
            {categories
              .sort((a: any, b: any) => a.index - b.index)
              .map((category) => (
                <div className="settingCategory">
                  <h4>{category.name}</h4>
                  <ul>
                    {items
                      .filter(function (item) {
                        return item.category == category.id;
                      })
                      .sort((a, b) => a.interval.localeCompare(b.interval))
                      .sort((a: any, b: any) => a.sort - b.sort)
                      .map((item) => (
                        <SettingsItem item={item} />
                      ))}
                  </ul>
                </div>
              ))}
          </div>
          <div id="okSettings">
            <button onClick={toggleSettings}>OK</button>
          </div>
        </div>
      </header>

      <div id="categories">
        {categories
          .sort((a: any, b: any) => a.index - b.index)
          .map((category) => (
            <div className="category">
              <h2>{category.name}</h2>
              <ul>
                {items
                  .filter(function (item) {
                    return item.category == category.id;
                  })
                  .filter(function (item) {
                    return getItemShown(item);
                  })
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .sort((a, b) => a.interval.localeCompare(b.interval))
                  .sort((a: any, b: any) => a.sort - b.sort)
                  .map((item) => (
                    <ListItem item={item} />
                  ))}
              </ul>
            </div>
          ))}
      </div>

      <footer>
        © henahax.de 2023
      </footer>
    </>
  );
}

export interface Item {
  id: string;
  name: string;
  category: string;
  interval: Interval;
  icon: string;
  info: string;
  link: string;
  default?: boolean;
  sort?: number;
  timer?: Timer;
}

export enum Interval {
  Daily = "daily",
  Weekly = "weekly",
}

export interface Timer {
  duration: number[];
  times: Array<Array<string | number>>;
}

function refreshPage() {
  window.location.reload();
}

function EventTimer(props: any) {
  const [_time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (props.item.timer === undefined) {
    return <></>;
  }
  var nextEventTime: any = getNextEventTime(props.item.timer);

  if (getEventActive(props.item.timer)) {
    return (
      <div className="eventTimer eventActive">
        <div className="timerActive">Active!</div>
        <div className="timerText">{nextEventTime[2]}</div>
        <div className="timerNumbers">
          <Countdown
            date={nextEventTime[0]}
            daysInHours={true}
            zeroPadTime={2}
            renderer={renderer}
            overtime={true}
          />
          <div>/</div>
          <div>
            {zeroPad(nextEventTime[1][0])}:{zeroPad(nextEventTime[1][1])}:{"00"}
          </div>
        </div>
      </div>
    );
  } else if (
    nextEventTime[0].getTime() - new Date().getTime() <
    5 * 60 * 1000
  ) {
    return (
      <div className="eventTimer eventSoon">
        <div>{nextEventTime[2]}</div>
        <Countdown date={nextEventTime[0]} daysInHours={true} zeroPadTime={2} />
      </div>
    );
  } else {
    return (
      <div className="eventTimer">
        <div>{nextEventTime[2]}</div>
        <Countdown date={nextEventTime[0]} daysInHours={true} zeroPadTime={2} />
      </div>
    );
  }
}

interface RendererProps {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const renderer: React.FC<RendererProps> = ({
  hours,
  minutes,
  seconds,
  completed,
}) => {
  if (completed) {
    return (
      <div>
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </div>
    );
  } else {
    return (
      <div>
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </div>
    );
  }
};

function getItemShown(props: any): boolean {
  var cookieValue = getCookieValue("setting" + props.id);
  if (cookieValue == null) {
    return props.default;
  }
  return cookieValue == "true";
}

function SettingsItem(props: any) {
  var checkboxId = "setting" + props.item.id + "Checkbox";
  return (
    <li id={"setting" + props.item.id} className="settingsItem form-check">
      <input
        type="checkbox"
        id={checkboxId}
        onChange={handleCheckboxChangeSettings}
        defaultChecked={getSettingChecked(props.item)}
      ></input>
      <label htmlFor={checkboxId}>
        <div className="text">
          <div className="name">{props.item.name}</div>
          <div className="info">{props.item.info}</div>
        </div>
      </label>
    </li>
  );
}

function getSettingChecked(item: any): boolean {
  var cookieValue = getCookieValue("setting" + item.id);
  if (cookieValue == null) {
    return item.default;
  }
  return cookieValue == "true";
}

function ListItem(props: any) {
  return (
    <li className="item" id={props.item.id}>
      <input
        type="checkbox"
        id={props.item.id + "checkbox"}
        onChange={handleCheckboxChange}
        defaultChecked={getCookieValue(props.item.id) === "true"}
      ></input>
      <label htmlFor={props.item.id + "checkbox"}>
        <img src={props.item.icon}></img>
        <div className="text">
          <div className="name">{props.item.name}</div>
          <div className="info">{props.item.info}</div>
        </div>
        <div className="right">
          <div className="rightTop">
            <a className="link" href={props.item.link}>
              {props.item.link.length > 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-info-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              )}
            </a>
            <div className="interval">{props.item.interval}</div>
          </div>
          <div className="rightBottom">
            {!(props.item.timer === undefined) && (
              <EventTimer item={props.item} className="eventTimer" />
            )}
          </div>
        </div>
      </label>
    </li>
  );
}

function getNextEventTime(timer: any) {
  var now = new Date();
  var startOfNextDay = getUTCTimeForStartOfNextDay();
  var startOfThisDay = startOfNextDay.getTime() - 24 * 60 * 60 * 1000;

  var nextEventTime = now.getTime();
  var add: string = "";
  var duration = [0, 0];

  for (let i = 0; i < timer.times.length; i++) {
    if (
      startOfThisDay +
      timer.times[i][0] * 60 * 60 * 1000 +
      timer.times[i][1] * 60 * 1000 +
      timer.duration[0] * 60 * 60 * 1000 +
      timer.duration[1] * 60 * 1000 >
      now.getTime()
    ) {
      nextEventTime =
        startOfThisDay +
        timer.times[i][0] * 60 * 60 * 1000 +
        timer.times[i][1] * 60 * 1000;
      if (timer.times[i][2]) {
        add = timer.times[i][2];
      }
      duration = timer.duration;
      break;
    }
  }
  return [new Date(nextEventTime), duration, add];
}

function getEventActive(timer: any) {
  var now = new Date();
  var startOfNextDay = getUTCTimeForStartOfNextDay();
  var startOfThisDay = startOfNextDay.getTime() - 24 * 60 * 60 * 1000;

  var isActive = false;
  for (let i = 0; i < timer.times.length; i++) {
    if (
      startOfThisDay +
      timer.times[i][0] * 60 * 60 * 1000 +
      timer.times[i][1] * 60 * 1000 <
      now.getTime() &&
      startOfThisDay +
      timer.times[i][0] * 60 * 60 * 1000 +
      timer.times[i][1] * 60 * 1000 +
      timer.duration[0] * 60 * 60 * 1000 +
      timer.duration[1] * 60 * 1000 >
      now.getTime()
    ) {
      isActive = true;
      break;
    }
  }
  return isActive;
}

function handleCheckboxChangeSettings(event: any) {
  var date = new Date();
  date.setFullYear(date.getFullYear() + 100);
  var dateString: string = date.toUTCString();

  setCookie(event.target.parentNode.id, event.target.checked, dateString);
}

function toggleSettings() {
  var settings = document.getElementById("settings")!;
  if (settings.classList.contains("hide")) {
    settings.classList.remove("hide");
  } else {
    location.reload();
  }
}

function handleCheckboxChange(event: any) {
  var interval = items.filter(function (item) {
    return item.id === event.target.parentNode.id;
  })[0].interval;

  var time = "";

  if (interval === "daily") {
    time = getUTCTimeForStartOfNextDay().toUTCString();
  } else if (interval === "weekly") {
    time = getUTCTimeForStartOfNextWeek().toUTCString();
  }

  setCookie(event.target.parentNode.id, event.target.checked, time);
}

function setCookie(name: string, value: boolean, expires: string) {
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookieValue(cookieName: string) {
  const cookies = document.cookie.split("; "); // Split cookies string into an array

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return decodeURIComponent(value); // Decode the value (if it was encoded)
    }
  }
  return null; // Cookie not found
}

function getUTCTimeForStartOfNextDay() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  tomorrow.setUTCHours(0, 0, 0, 0);
  return tomorrow;
}

function getUTCTimeForStartOfNextWeek() {
  const now = new Date();
  var nextMonday = new Date()

  while (nextMonday.getUTCDay() !== 1) {
    nextMonday.setUTCDate(nextMonday.getUTCDate() + 1)
  }

  nextMonday.setHours(7, 30, 0, 0)
  if (nextMonday < now) {
    nextMonday.setUTCDate(nextMonday.getUTCDate() + 7);
  }

  return nextMonday;
}

export default App;
