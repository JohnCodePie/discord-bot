const request = require("request");
const utils = require("../utils/shuffle.js");
var optionsEintracht = {
  method: "GET",
  url: "https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=de-DE&leagueId=105266091639104326",
  headers: {
    "X-Api-Key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
  },
};

var optionsFav = {
  method: "GET",
  url: "https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=de-DE&leagueId=105266091639104326%2C98767991302996019%2C98767991310872058%2C98767991299243165%2C98767991314006698%2C98767991325878492%2C98767975604431411%2C98767991295297326",
  headers: {
    "X-Api-Key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
  },
};

exports.getScheduleEintracht = (callback) => {
  request(optionsEintracht, function (error, response) {
    if (error) throw new Error(error);
    try {
      const schedule = JSON.parse(response.body);
      const openMatch = schedule.data.schedule.events.filter((event) => {
        return event.state == "unstarted";
      });
      const openEintrachtMatch = openMatch.filter((event) => {
        return (
          event.match.teams[0]?.name == "Eintracht Frankfurt" ||
          event.match.teams[1]?.name == "Eintracht Frankfurt"
        );
      });
      callback(openEintrachtMatch);
    } catch (error) {
      console.log(error);
    }
  });
};

exports.getScheduleFavToday = (callback) => {
  request(optionsFav, function (error, response) {
    if (error) throw new Error(error);
    try {
      const schedule = JSON.parse(response.body);
      const openMatch = schedule.data.schedule.events.filter((event) => {
        var targetDate = new Date(event.startTime);
        return utils.isToday(targetDate) == true;
      });
      callback(openMatch);
    } catch (error) {
      console.log(error);
    }
  });
};
