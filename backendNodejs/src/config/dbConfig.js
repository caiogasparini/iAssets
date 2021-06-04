const mongoose = require('mongoose');

const dbConfig = 'mongodb+srv://caiogasparini:K@ka47425022@cluster0.anc85.mongodb.net/expenses?retryWrites=true&w=majority';

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;