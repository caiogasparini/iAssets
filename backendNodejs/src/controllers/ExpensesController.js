const Expenses = require('../models/ExpensesData');

const exConn = require('../config/dbConfig');
const authConn = require('../config/userDbConfig');

module.exports = {

    async read(req, res) {
        // console.log('1')
        const expenseList = await exConn.model('Expenses').find();
        // console.log('2')
        return res.json(expenseList);
    },


    async create(req, res) {
        const { expenseName, value, dueDate, obs, datePayment } = req.body;

        if (!expenseName || !value || !dueDate) {
            return res.status(400).json({ error: "Nome da conta, valor e data de vencimento precisam estar preenchidos!" });
        }

        const expenseCreated = await exConn.model('Expenses').create({
            expenseName,
            value,
            dueDate,
            obs,
            datePayment
        });

        return res.json(expenseCreated);
    },

    async delete(req, res) {
        const { id } = req.params;

        const expenseDeleted = await exConn.model('Expenses').findOneAndDelete({ _id: id });

        if (expenseDeleted) {
            return res.json(expenseDeleted);
        }

        return res.json({ error: 'Não foi possível encontrar o registro para deletar!' });
    },

    async update(req, res) {
        const { id } = req.params;

        //console.log(id);

        const { expenseName, value, dueDate, obs, datePayment } = req.body;

        if (!expenseName || !value || !dueDate) {
            return res.status(400).json({ error: "Nome da conta, valor e data de vencimento precisam estar preenchidos!" });
        }

        const expense = await exConn.model('Expenses').findOne({ _id: id });

        if (expense.expenseName != expenseName || expense.value != value || expense.dueDate != dueDate || expense.obs != obs || expense.datePayment != datePayment) {
            if (expense.expenseName != expenseName) {
                expense.expenseName = expenseName;
            }
            if (expense.value != value) {
                expense.value = value;
            }
            if (expense.dueDate != dueDate) {
                expense.dueDate = dueDate;
            }
            if (expense.obs != obs) {
                expense.obs = obs;
            }
            if (expense.datePayment != datePayment) {
                expense.datePayment = datePayment;
            }

            await expense.save();
        }

        return res.json(expense);
    }


}