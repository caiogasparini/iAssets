import React, {useState} from 'react';
import api from '../../services/api';

import '../../css/css components/addEditExpense.css';


function AddExpense () {

    const [expenseName, setExpenseName] = useState('');
    const [obs, setObs] = useState('');
    const [value, setValue] = useState('0000');
    const [dueDate, setDueDate] = useState('');
    const [datePayment, setDatePayment] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response =  await api.post('/expenses', {
            expenseName,
            value,
            dueDate,
            obs,
            datePayment
        });

        closeAddExpense();
    }

    function closeAddExpense() {
        setExpenseName('');
        setValue('');
        setDueDate('');
        setObs('');
        setDatePayment('');
        document.getElementById('root-addExpense').style.display = 'none';
    }

    function formatarMoeda(eValue) {
        var elemento = document.getElementById('value-input');
        var valor = eValue;

        valor = valor + '';
        valor = parseInt(valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");

        if (valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }

        if (valor.indexOf(',') === 0) {
            valor.replace(/,/g, ".");
            valor = '00' + valor
            console.log(valor)
        }
        console.log(parseFloat(valor))
        setValue(parseFloat(valor))
        if(valor === 'NaN') setValue('0000');
    }


    return (
        <>
            <div className="add-main">
            <form onSubmit={handleSubmit} className="card-add">
                <div className="descriptions">
                    <input type="text" placeholder="Nome da despesa" id="expense-input" name="expenseName" value={expenseName} onChange= {e => setExpenseName(e.target.value)} required></input>
                    <textarea placeholder="Observações" id="obs-input" name="obs" value={obs} onChange= {e => setObs(e.target.value)}/>
                    <div className="options">
                        <div className="mini-card" id="cancel-add" onClick={()=> closeAddExpense()}><p>Cancelar</p></div>
                        <input className="mini-card" type="submit" value="Salvar" id="submit-add"/>
                    </div>
                </div>
                <div className="info">
                    <div className="value-name">
                        <p>Valor:</p>
                    </div>
                    <div className="value" id="value-div"> 
                        <div id="rs"><span>R$ </span></div><input type="number" min="0" max="9999999" step="0.01" lang="pt-BR" placeholder="00,00" id="value-input" name="value" value={value} onChange= {e => formatarMoeda(e.target.value)} required/>
                    </div>
                    <div className="value-name">
                        <p>Data de Vencimento:</p>
                    </div>
                    <div className="value"> 
                    <input type="date" id="dueDate-input" name="dueDate" value={dueDate} onChange= {e => setDueDate(e.target.value)} required/>
                    </div>
                    <div className="value-name">
                        <p>Data de Pagamento:</p>
                    </div>
                    <div className="value"> 
                    <input type="date" id="datePayment-input" name="datePayment" value={datePayment} onChange= {e => setDatePayment(e.target.value)} />
                    </div>
                    
                </div>
            </form>
            </div>
        </>
    );
}

export default AddExpense;