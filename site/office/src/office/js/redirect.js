import {settings} from "./settings";
import {setupCalendar} from "./calendar";
const today = function() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const date_string = `${year}-${month}-${day}`;
    return date_string
}

const current_office = function() {
     const date = new Date();
     const hours = date.getHours()
     const office = hours >= 12 ? 'evening_prayer' : 'morning_prayer';
     return office
}

const current_office_label = function() {
     const date = new Date();
     const hours = date.getHours()
     const office = hours >= 12 ? 'Evening Prayer' : 'Morning Prayer';
     return office
}

const getAdvent = function(year) {

    let date = new Date(Date.parse(year + '-12-25'));
    let sundays = 0;
    while (sundays < 4) {
        date.setDate(date.getDate() - 1);
        if (date.getDay() === 0) {
            sundays++;
        }
    }
    return date;
}

const getChurchYearStartYear = function(date) {
    const advent = getAdvent(date.getFullYear())
    if (date > advent) {
        return parseInt(date.getFullYear())
    }
    return parseInt(date.getFullYear()) -1
}

const redirect = function() {
  if (document.getElementById("redirect-to-today")) {
    const date_string = today();
    const office = current_office();
    const path = `\\${office}\\${date_string}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', path);
    xhr.responseType = "document"
    xhr.onload = function() {
        if (xhr.status === 200) {

            const elem = document.querySelector("#body");
            const newBody = xhr.response.querySelector("#body");
            elem.innerHTML = newBody.innerHTML;
            document.querySelector("#messages").innerHTML = "<a href='" + path + "'>Permanent link for " + current_office_label() + " for " + new Date().toDateString() + "</a></a></p>"
            settings();
            setupCalendar();
            document.getElementById("now-button").classList.add('on')
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
  }
};

const setupRedirect = () =>
{
  if (
      document.readyState === "complete" ||
      (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    redirect();
  } else {
    document.addEventListener("DOMContentLoaded", redirect);
  }
}
export { setupRedirect, today, current_office, getChurchYearStartYear };
