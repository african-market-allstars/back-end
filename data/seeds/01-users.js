
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'jon', email: 'jdeltoro88@gmail.com', password: 'BP-Pass', country: 'USA'},
        
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