const fetchJsonP = require("fetch-jsonp");
const moment = require('moment');

const init = function() {
  const options = {
    method: "GET"
  };

  const query =
    "https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=2236821,4498742,20118887,19538127,15544522,22816111,9584122&page=20";

  const corsQuery =
    "https://cors-anywhere.herokuapp.com/https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=2236821,4498742,20118887,19538127,15544522,22816111,9584122&page=20";

  fetchJsonP(query, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("parsed json", data);
      renderEvents(data);
    })
    .catch(function(ex) {
      console.log("parsing failed", ex);
    });
};

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

function showDate(time) {
  return moment(time).format("MMMM Do, YYYY");
}
  
function mapLink(venue) {
  const { name, lat, lon, city } = venue;
  const safeName = encodeURIComponent(name)
  return `http://www.google.com/maps/place/${safeName},${city}/${lat},${lon}`
  }

const renderEvents = data => {
  const ul = document.getElementById("events-upcoming");
  let events = data.results;
  return events.map(event => {
    let li = createNode("li"),
      div = createNode('div'),
      span = createNode("span"),
      a = createNode("a");
    a.href = event.event_url;
    a.innerHTML = `${event.name}`;
    li.className = "col-4 p2 border-box border m4";
    span.innerHTML = `<h3>${showDate(event.time)}</h2><p>Venue: ${event.venue ? `<a href="${mapLink(event.venue)}">${event.venue.name}</a><p>City: ${event.venue.city}</p>` : 'TBC'}</p>`;

    append(div, span)
    append(div, a);
    append(li, div);
    append(ul, li);
  });
};

init();
