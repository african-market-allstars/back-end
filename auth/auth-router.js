const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../data/secret.js');

const Users = require('..users/users-model.js');
const {isvalid} = require('../users/users-service.js');

router.post('/register', async (req, res, next) => {
    const user = req.body
    const userExist = await Users.findBy({email:user.email}).first();
    if (userExist) {
        res.status(400).json({ message: 'user already exists, please login'});
        return;
        
    }

    const rounds = process.env.BCRYPT_ROUNDS ? parseInt(process.env.BCRYPT_ROUNDS) : 10;
    const hash = bcryptjs.hashSync(user.password, rounds);
	user.password = hash;

    try {
        if(isvalid(user)) {
            const newUser = await Users.add(user);
            res.status(201).json({
                auth: {
                    id: newUser.id,
                    userName: newUser.username,
                    email: newUser.email,
                }
            })
        } else {
            next({
                apiCode: 400,
				apiMessage: 'name, email or password missing',
			});
		}
	} catch (error) {
		next({ apiCode: 500, apiMessage: 'error saving new user', ...error });
	}
});

   
