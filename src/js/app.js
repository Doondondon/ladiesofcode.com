const fetchJsonP = require("fetch-jsonp");

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

const renderEvents = data => {
  const ul = document.getElementById("events-upcoming");
  let events = data.results;
  return events.map(event => {
    let li = createNode("li"),
      span = createNode("span"),
      a = createNode("a");
    a.href = event.event_url;
    a.innerHTML = `${event.name}`;
    append(span, a);
    append(li, span);
    append(ul, li);
  });
};

init();
