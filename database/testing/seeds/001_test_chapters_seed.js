exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('chapters')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('chapters').insert([
        {
          location: 'Dallas, TX',
          numvolunteers: 26,
          longitude: -97.040443,
          latitude: 32.89748
        },
        {
          location: 'Los Angeles, CA',
          numvolunteers: 52,
          longitude: -118.243683,
          latitude: 34.052235
        },
        {
          location: 'San Diego, CA',
          numvolunteers: 22,
          longitude: -117.161087,
          latitude: 32.715736
        },
        {
          location: 'Charlotte, NC',
          numvolunteers: 13,
          longitude: -80.843124,
          latitude: 35.227085
        },
        {
          location: 'Vancouver, BC',
          numvolunteers: 38,
          longitude: -123.116226,
          latitude: 49.246292
        },
        {
          location: 'Boston, MA',
          numvolunteers: 6,
          longitude: -71.057083,
          latitude: 42.361145
        },
        {
          location: 'St Louis, MO',
          numvolunteers: 18,
          longitude: -90.199402,
          latitude: 38.627003
        },
        {
          location: 'Calgary, AB',
          numvolunteers: 15,
          longitude: -114.062019,
          latitude: 51.04427
        },
        {
          location: 'New York, NY',
          numvolunteers: 64,
          longitude: -73.935242,
          latitude: 40.73061
        },
        {
          location: 'Memphis, TN',
          numvolunteers: 3,
          longitude: -89.971107,
          latitude: 35.1175
        },
        {
          location: 'Grand Rapids, MI',
          numvolunteers: 11,
          longitude: -85.670006,
          latitude: 42.963795
        },
        {
          location: 'Washington, DC',
          numvolunteers: 21,
          longitude: -77.009003,
          latitude: 38.889931
        },
        {
          location: 'Hampton Roads, VA',
          numvolunteers: 15,
          longitude: -76.380557,
          latitude: 36.949074
        },
        {
          location: 'London, UK',
          numvolunteers: 85,
          longitude: -0.118092,
          latitude: 51.509865
        },
        {
          location: 'Grants Pass, OR',
          numvolunteers: 31,
          longitude: -123.30439,
          latitude: 42.436386
        },
        {
          location: 'Ottawa, ON',
          numvolunteers: 15,
          longitude: -75.692482,
          latitude: 45.425533
        },
        {
          location: 'San Francisco, CA',
          numvolunteers: 77,
          longitude: -122.431297,
          latitude: 37.773972
        },
        {
          location: 'Sydney, Australia',
          numvolunteers: 22,
          longitude: 151.2099,
          latitude: -33.865143
        },
        {
          location: 'South Bay, CA',
          numvolunteers: 26,
          longitude: -118.3813,
          latitude: 33.8798
        },
        {
          location: 'Ann Arbor, MI',
          numvolunteers: 32,
          longitude: -83.732124,
          latitude: 42.279594
        },
        {
          location: 'Philadelphia, PA',
          numvolunteers: 59,
          longitude: -75.165222,
          latitude: 39.952583
        }
      ]);
    });
};
