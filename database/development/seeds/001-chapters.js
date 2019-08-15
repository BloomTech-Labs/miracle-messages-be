exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('chapters')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('chapters').insert([
        {
          city: 'Dallas',
          state: 'TX',
          numvolunteers: 26,
          longitude: -97.040443,
          latitude: 32.89748
        },
        {
          city: 'Los Angeles',
          state: 'CA',
          numvolunteers: 52,
          longitude: -118.243683,
          latitude: 34.052235
        },
        {
          city: 'San Diego',
          state: 'CA',
          numvolunteers: 22,
          longitude: -117.161087,
          latitude: 32.715736
        },
        {
          city: 'Charlotte',
          state: 'NC',
          numvolunteers: 13,
          longitude: -80.843124,
          latitude: 35.227085
        },
        {
          city: 'Vancouver',
          state: 'BC',
          numvolunteers: 38,
          longitude: -123.116226,
          latitude: 49.246292
        },
        {
          city: 'Boston',
          state: 'MA',
          numvolunteers: 6,
          longitude: -71.057083,
          latitude: 42.361145
        },
        {
          city: 'St Louis',
          state: 'MO',
          numvolunteers: 18,
          longitude: -90.199402,
          latitude: 38.627003
        },
        {
          city: 'Calgary',
          state: 'AB',
          numvolunteers: 15,
          longitude: -114.062019,
          latitude: 51.04427
        },
        {
          city: 'New York',
          state: 'NY',
          numvolunteers: 64,
          longitude: -73.935242,
          latitude: 40.73061
        },
        {
          city: 'Memphis',
          state: 'TN',
          numvolunteers: 3,
          longitude: -89.971107,
          latitude: 35.1175
        },
        {
          city: 'Grand Rapids',
          state: 'MI',
          numvolunteers: 11,
          longitude: -85.670006,
          latitude: 42.963795
        },
        {
          city: 'Washington',
          state: 'DC',
          numvolunteers: 21,
          longitude: -77.009003,
          latitude: 38.889931
        },
        {
          city: 'Hampton Roads',
          state: 'VA',
          numvolunteers: 15,
          longitude: -76.380557,
          latitude: 36.949074
        },
        {
          city: 'London',
          state: '',
          numvolunteers: 85,
          longitude: -0.118092,
          latitude: 51.509865
        },
        {
          city: 'Grants Pass',
          state: 'OR',
          numvolunteers: 31,
          longitude: -123.30439,
          latitude: 42.436386
        },
        {
          city: 'Ottawa',
          state: 'ON',
          numvolunteers: 15,
          longitude: -75.692482,
          latitude: 45.425533
        },
        {
          city: 'San Francisco',
          state: 'CA',
          numvolunteers: 77,
          longitude: -122.431297,
          latitude: 37.773972
        },
        {
          city: 'Sydney',
          state: '',
          numvolunteers: 22,
          longitude: 151.2099,
          latitude: -33.865143
        },
        {
          city: 'South Bay',
          state: 'CA',
          numvolunteers: 26,
          longitude: -118.3813,
          latitude: 33.8798
        },
        {
          city: 'Ann Arbor',
          state: 'MI',
          numvolunteers: 32,
          longitude: -83.732124,
          latitude: 42.279594
        },
        {
          city: 'Philadelphia',
          state: 'PA',
          numvolunteers: 59,
          longitude: -75.165222,
          latitude: 39.952583
        }
      ]);
    });
};
