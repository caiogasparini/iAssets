require('dotenv').config();
const {registerValidate, loginValidate} = require('./Validate');

const exConn = require('../config/dbConfig');
const authConn = require('../config/userDbConfig');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    register: async function (req, res) {
        const {name, email} = req.body;

        const {error} = registerValidate(req.body);
        if (error) return res.status(400).json(error.message);

        const password = bcrypt.hashSync(req.body.password);

        try {
            let users = await authConn.model('AuthModels').findOne({ email: email });
            if (users) {
                return res.status(400).json({ "Error": "O email já existe!"});
            }

            const accountCreated = await authConn.model('AuthModels').create({
                name,
                email,
                password
            });
    
            let userId = accountCreated._id + '';

            const collectionCreated = await exConn.createCollection(userId);
            //console.log(collectionCreated)
            return res.send(collectionCreated.collectionName);
        } catch (error) {
            //console.log(error)
            res.status(400).send(error);
        }
        

    },
    
    login: async function (req, res) {
        const {email, password} = req.body;
 
        const {error} = loginValidate(req.body);
        if (error) return res.status(400).json(error.message);

        try {
            let users = await authConn.model('AuthModels').findOne({ email: email });
            if (!users) return res.json('Email ou Senha incorreta!');
            const passMatch = bcrypt.compareSync(password, users.password);
            if (!passMatch) {
                return res.json('Email ou Senha incorreta!');
            } else {
                const token = jwt.sign({_id: users._id}, process.env.TOKEN_SECRET);
                res.header('Access-Control-Expose-Headers', 'Authorization-Token')
                res.header('Authorization-Token', token);
                res.json('Usuário logado!');
                return
            }
        } catch (error) {
            return res.status(400).json(error);
        }
        
        
    }
}


module.exports = authController;
