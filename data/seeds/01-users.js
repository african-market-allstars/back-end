
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Britney', email: 'Britney@email.com', password: 'BP-Pass', country: 'USA'},
        {username: 'Paulo', email: 'Paulo@gmail.com', password: 'PA-Pass', country: 'USA'},
        // {username: '', email_address: 'email address', password: 'password', country: 'country', image_url: 'image_url'},
        // {username: 'username', email_address: 'email address', password: 'password', country: 'country', image_url: 'image_url'},
        // {username: 'username', email_address: 'email address', password: 'password', country: 'country', image_url: 'image_url'},
        // {username: 'username', email_address: 'email address', password: 'password', country: 'country', image_url: 'image_url'},
        // {username: 'username', email_address: 'email address', password: 'password', country: 'country', image_url: 'image_url'},
        // {username: 'username', email_address: 'email address', password: 'password', country: 'country', image_url: 'image_url'},
        // {username: 'username', email_address: 'email address', password: 'password', country: 'country', image_url: 'image_url'},
        // {username: 'username', email_address: 'email address', password: 'password', country: 'country', image_url: 'image_url'},
      ]);
    });
};