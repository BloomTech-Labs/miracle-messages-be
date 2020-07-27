const Airtable = require("Airtable");
const airDB = require("../models/airtable-model");
const axios = require("axios");
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
function Records() {
  var base = new Airtable({ apiKey: "keyWYkAWkZFab8hog" }).base(
    "appZsM9RmLGlwJqx0"
  );
  base("Imported table")
    .select({
      // maxRecords: 3,
      fields: [
        "CASE RECORD",
        "OUTCOME: REUNION STORY",
        "Loved One Last Known Location",
        "Client Current City",
        "Link to the MM (YouTube)",
      ],
      filterByFormula:
        "AND(NOT({OUTCOME: REUNION STORY}=''), NOT({Client Current City}=''), NOT({Loved One Last Known Location}=''))",
      view: "Grid view",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        newReunion = {};
        asyncForEach(records, async (record) => {
          newReunion = {};
          newReunion.title = record.fields["CASE RECORD"];
          newReunion.story = record.fields["OUTCOME: REUNION STORY"];
          newReunion.origin = record.fields["Client Current City"];
          newReunion.destination = record.fields[
            "Loved One Last Known Location"
          ].replace("?", " ");
          newReunion.destination = newReunion.destination.replace(";", " ");
          newReunion.destination = newReunion.destination.replace("#", " ");
          newReunion.destination = newReunion.destination.replace(".", " ");
          newReunion.destination = newReunion.destination.replace(/\//g, " ");
          if (newReunion.destination.includes("Schererville")) {
            newReunion.destination = "Schererville,IN";
          }
          if (newReunion.destination.includes("Littleton")) {
            newReunion.destination = "Littleton,CO";
          }
          if (newReunion.destination.includes("Birmingham")) {
            newReunion.destination = "Birmingham, AL";
          }
          const originCord = await axios
            .get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${newReunion.origin}.json?access_token=${process.env.MAPBOX_API}`
            )
            .then((res) => {
              if (res.data.features) {
                return res.data.features[0].geometry.coordinates;
              }
            })
            .catch((err) => {
              console.log("could not get lat & lng from mapbox", err);
            });
          const destCord = await axios
            .get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${newReunion.destination}.json?access_token=${process.env.MAPBOX_API}`
            )
            .then((res) => {
              if (res.data.features) {
                return res.data.features[0].geometry.coordinates;
              }
            })
            .catch((err) => {
              console.log("could not get lat & lng from mapbox", err);
            });
          if (originCord.length > 0) {
            newReunion.originLatitude = originCord[1];
            newReunion.originLongitude = originCord[0];
          }
          if (destCord.length > 0) {
            newReunion.destLatitude = destCord[1];
            newReunion.destLongitude = destCord[0];
          }
          if (record.fields["Link to the MM (YouTube)"]) {
            newReunion.link_to_media =
              record.fields["Link to the MM (YouTube)"];
          }
          await airDB.update(newReunion);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
}

module.exports = Records;
