const Expenses = require('../models/ExpensesData');

module.exports = {

    async read(req, res) {
        const expensesList = await Expenses.find();

        return res.json(expensesList);
    },


    create(req, res) {
        const { expenseName, value, dueDate, obs, datePayment } = req.body;

        console.log(expenseName);
        console.log(value);
        console.log(dueDate);
        console.log(obs);
        console.log(datePayment);

    }


}