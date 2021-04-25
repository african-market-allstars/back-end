exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {category_name: 'Animal Products - Other'},
        {category_name: 'Meat'},
        {category_name: 'Poultry'},
        {category_name: 'Beans'},
        {category_name: 'Cereals-Maize'},
        {category_name: 'Cereals-Other'},
        {category_name: 'Cereals-Rice'},
        {category_name: 'Fruits'},
        {category_name: 'Peas'},
        {category_name: 'Roots & Tubers'},
        {category_name: 'Seeds & Nuts'},
        {category_name: 'Vegetables'},
        {category_name: 'Other'},
      ]);
    });
};