const newUserSchema = require('../models/createUserCollection');
const mongoose = require('mongoose');

module.exports = {
    async create(req, res) {
        let { userId } = req.params;
        let newCollection = mongoose.model(userId, newUserSchema)
            //const userIdString = Number.prototype.toString(userId);
        //console.log(newCollection);
        const collectionCreated = await newCollection.createCollection();
        console.log('collection created');
    }
}