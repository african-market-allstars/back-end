git # back-end


End Points
Users
POST - new user - base-url/api/auth/register

For registration:

{
    "username": "testusername",
    "email": "email@email.com",
    "password": "password"
}
POST - login user - base-url/api/auth/login

Login:

{
    "username": "testusername",
    "password": "password"
}
GET - specific user - base-url/api/users/:id

PUT - update specific user - base-url/api/users/:id

DELETE - delete specific user - base-url/api/users/:id

Items
POST - add new item - base-url/api/users/:id/items

{
    "id": 9,
    "name": "Eggs",
    "image_url": "https://cdn.pixabay.com/photo/2020/09/30/18/09/eggs-5616647_960_720.jpg",
    "price": 2.69,
    "description": "Farm Fresh Eggs",
    "region": "Kenya",
    "city": "Nairobi",
    "address": "123 Market Street",
    "zip_code": "00100",
    "created_at": "2020-10-21 19:09:27",
    "user_id": 3,
    "category_id": 1
}
GET - all items - base-url/api/users/:id/items

[
    {
        "id": 9,
        "name": "Meat",
        "image_url": "https://cdn.pixabay.com/photo/2020/09/30/18/09/eggs-5616647_960_720.jpg",
        "price": 14.59,
        "description": "Farm Fresh Eggs",
        "region": "Kenya",
        "city": "Nairobi",
        "address": "123 Market Street",
        "zip_code": "00100",
        "created_at": "2020-10-21 19:09:27",
        "user_id": 3,
        "category_id": 1
    },
    {
        "id": 10,
        "name": "Eggs",
        "image_url": "https://cdn.pixabay.com/photo/2020/09/30/18/09/eggs-5616647_960_720.jpg",
        "price": 2,
        "description": "Farm Fresh Eggs",
        "region": "Kenya",
        "city": "Nairobi",
        "address": "123 Market Street",
        "zip_code": "00100",
        "created_at": "2020-10-23 01:52:02",
        "user_id": 3,
        "category_id": 1
    }
]
PUT - update specific item - base-url/api/users/:id/items/:item_id

{
    "updatedItem": {
        "id": 9,
        "name": "Cake",
        "image_url": "https://cdn.pixabay.com/photo/2020/09/30/18/09/eggs-5616647_960_720.jpg",
        "price": 20,
        "description": "Farm Fresh Eggs",
        "region": "South Africa",
        "city": "Nairobi",
        "address": "123 Market Street",
        "zip_code": "00100",
        "created_at": "2020-10-23 01:52:02",
        "user_id": 3,
        "category_id": 1
    },
    "message": "Item updated"
}
DELETE - delete specific item - base-url/api/users/:id/items/:item_id

{
    "deleteItem": [
        {
            "id": 9,
            "name": "Cake",
            "image_url": "https://cdn.pixabay.com/photo/2020/09/30/18/09/eggs-5616647_960_720.jpg",
            "price": 20,
            "description": "Farm Fresh Eggs",
            "region": "South Africa",
            "city": "Nairobi",
            "address": "123 Market Street",
            "zip_code": "00100",
            "created_at": "2020-10-23 01:52:02",
            "user_id": 3,
            "category_id": 1
        }
    ],
    "message": "item deleted"
}
Categories
POST - add new category- base-url/api/categories

GET - all categories - base-url/api/categories

GET - specific category - base-url/api/categories/:id

GET - all items from

PUT - update specific category - base-url/api/categories/:id

DELETE - delete specific category - base-url/api/categories/:id
