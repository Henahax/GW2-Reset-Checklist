import "./App.css";
import categories from "./assets/categories.json";
import items from "./assets/items.json";

function App() {
  let dateDaily = getUTCTimeForStartOfNextDay();
  let propsDaily = { element: "timerDaily", countDownDate: dateDaily };

  let dateWeekly = getUTCTimeForStartOfNextWeek();
  let propsWeekly = { element: "timerWeekly", countDownDate: dateWeekly };
  return (
    <>
      <header>
        <div id="titles">
          <h1 id="title">Checklist</h1>
          <div id="timers">
            <div className="timerContainer">
              Daily:
              <Timer props={propsDaily} />
            </div>
            <div className="timerContainer">
              Weekly:
              <Timer props={propsWeekly} />
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
          <div id="subTitleLeft">Tasks without an ingame tracking system</div>
          <div id="subTitleRight">
            Open the settings menu to choose displayed items ({items.length}{" "}
            available)
          </div>
        </div>
        <div id="settings" className="hide">
          <div className="settingsHeader">Displayes Items</div>

          <div id="settingCategories">
            {categories.map((category) => (
              <div className="settingCategory">
                <h4>{category.name}</h4>
                <ul>
                  {items
                    .filter(function (item) {
                      return item.category == category.id;
                    })
                    .sort((a, b) => a.interval.localeCompare(b.interval))
                    .map((item) => (
                      <SettingsItem item={item} />
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div id="categories">
        {categories.map((category) => (
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
                .sort((a, b) => a.interval.localeCompare(b.interval))
                .map((item) => (
                  <Item item={item} />
                ))}
            </ul>
          </div>
        ))}
      </div>

      <div id="footer">
        <div id="sourcecode">
          <a href="https://github.com/Henahax/GW2-Checklist">Sourcecode</a>
        </div>
      </div>
    </>
  );
}

function getItemShown(item: any): boolean {
  var cookieValue = getCookieValue("setting" + item.id);
  if (cookieValue == null) {
    return item.default;
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
        <div className="interval">{props.item.interval}</div>
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

function Item(props: any) {
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
      </label>
    </li>
  );
}

function handleCheckboxChangeSettings(event: any) {
  var date = new Date();
  date.setFullYear(date.getFullYear() + 100);
  var dateString: string = date.toUTCString();

  setCookie(event.target.parentNode.id, event.target.checked, dateString);
}

function Timer(props: any) {
  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = props.props.countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var countdownString = "";
    var notFirst = false;
    if (days > 0) {
      countdownString += days + ":";
      notFirst = true;
    }
    if (days > 0 || hours > 0) {
      if (notFirst) {
        countdownString += zeroPad(hours, 2) + ":";
      } else {
        countdownString += hours + ":";
      }
      notFirst = true;
    }
    if (days > 0 || hours > 0 || minutes > 0) {
      if (notFirst) {
        countdownString += zeroPad(minutes, 2) + ":";
      } else {
        countdownString += minutes + ":";
      }
      notFirst = true;
    }
    if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
      if (notFirst) {
        countdownString += zeroPad(seconds, 2);
      } else {
        countdownString += seconds;
      }
      notFirst = true;
    }

    document.getElementById(props.props.element)!.innerHTML = countdownString;

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById(props.props.element)!.innerHTML = "refresh site";
    }
  }, 1000);

  return <div id={props.props.element} className="timer"></div>;
}

function toggleSettings() {
  var settings = document.getElementById("settings")!;
  if (settings.classList.contains("hide")) {
    settings.classList.remove("hide");
  } else {
    location.reload();
  }
}

function zeroPad(num: number, places: number) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
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
  const nextWeek = new Date(now);

  nextWeek.setDate(nextWeek.getDate() + ((7 - nextWeek.getDay()) % 7 || 7));
  nextWeek.setUTCDate(nextWeek.getUTCDate() + 1);
  nextWeek.setUTCHours(7, 30, 0, 0);

  return nextWeek;
}

export default App;
