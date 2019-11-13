exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('volunteers')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('volunteers').insert([
        {
          fname: 'John',
          lname: 'Smith',
          email: 'john@smith.com',
          password: 'password',
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
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John3',
          lname: 'Smith',
          email: 'john@smith.com3',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John4',
          lname: 'Smith',
          email: 'john@smith.com4',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John5',
          lname: 'Smith',
          email: 'john@smith.com5',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John6',
          lname: 'Smith',
          email: 'john@smith.com6',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John7',
          lname: 'Smith',
          email: 'john@smith.com7',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John8',
          lname: 'Smith',
          email: 'john@smith.com8',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John9',
          lname: 'Smith',
          email: 'john@smith.com9',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John10',
          lname: 'Smith',
          email: 'john@smith.com10',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John11',
          lname: 'Smith',
          email: 'john@smith.com11',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John12',
          lname: 'Smith',
          email: 'john@smith.com12',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John13',
          lname: 'Smith',
          email: 'john@smith.com13',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John14',
          lname: 'Smith',
          email: 'john@smith.com14',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John15',
          lname: 'Smith',
          email: 'john@smith.com15',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John16',
          lname: 'Smith',
          email: 'john@smith.com16',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John17',
          lname: 'Smith',
          email: 'john@smith.com17',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John18',
          lname: 'Smith',
          email: 'john@smith.com18',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John19',
          lname: 'Smith',
          email: 'john@smith.com19',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John20',
          lname: 'Smith',
          email: 'john@smith.com20',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John21',
          lname: 'Smith',
          email: 'john@smith.com21',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John22',
          lname: 'Smith',
          email: 'john@smith.com22',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        },
        {
          fname: 'John23',
          lname: 'Smith',
          email: 'john@smith.com23',
          phone: '+14802658966',
          password: 'password',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States',
          comment: 'No comment'
        }
      ]);
    });
};
