exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('volunteers')
    // .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('volunteers').insert([
        {
          fname: 'John',
          lname: 'Smith',
          email: 'john@smith.com',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John2',
          lname: 'Smith',
          email: 'john@smith.com2',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John3',
          lname: 'Smith',
          email: 'john@smith.com3',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John4',
          lname: 'Smith',
          email: 'john@smith.com4',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John5',
          lname: 'Smith',
          email: 'john@smith.com5',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John6',
          lname: 'Smith',
          email: 'john@smith.com6',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John7',
          lname: 'Smith',
          email: 'john@smith.com7',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John8',
          lname: 'Smith',
          email: 'john@smith.com8',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John9',
          lname: 'Smith',
          email: 'john@smith.com9',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John10',
          lname: 'Smith',
          email: 'john@smith.com10',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John11',
          lname: 'Smith',
          email: 'john@smith.com11',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John12',
          lname: 'Smith',
          email: 'john@smith.com12',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John13',
          lname: 'Smith',
          email: 'john@smith.com13',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John14',
          lname: 'Smith',
          email: 'john@smith.com14',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John15',
          lname: 'Smith',
          email: 'john@smith.com15',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John16',
          lname: 'Smith',
          email: 'john@smith.com16',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John17',
          lname: 'Smith',
          email: 'john@smith.com17',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John18',
          lname: 'Smith',
          email: 'john@smith.com18',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John19',
          lname: 'Smith',
          email: 'john@smith.com19',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John20',
          lname: 'Smith',
          email: 'john@smith.com20',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John21',
          lname: 'Smith',
          email: 'john@smith.com21',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John22',
          lname: 'Smith',
          email: 'john@smith.com22',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John23',
          lname: 'Smith',
          email: 'john@smith.com23',
          password:'password',
          phone: '+14802658966',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        }
      ]);
    });
};
