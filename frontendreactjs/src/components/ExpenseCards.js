import React, { useState } from 'react';
import api from '../services/api';
import Expenses from './Expenses';

import '../css/css components/expensecards.css'

function ExpenseCards({ data }) {

    const [expenseName, setExpenseName] = useState(data.expenseName);
    const [obs, setObs] = useState(data.obs);
    const [value, setValue] = useState(data.value);
    const [dueDate, setDueDate] = useState(data.dueDate);
    const [datePayment, setDatePayment] = useState(data.datePayment);

    let dtPayment
    let dtDue	
    
    function verifyDate(data) {
        if (!data.datePayment) {
            dtPayment = '--';
        } else {
            dtPayment = data.datePayment.slice(8,10) + '-' + data.datePayment.slice(5,7) + '-' + data.datePayment.slice(0,4);
        }

        if (!data.dueDate) {
            dtDue = '--';
        } else {
            dtDue = data.dueDate.slice(8,10) + '-' + data.dueDate.slice(5,7) + '-' + data.dueDate.slice(0,4);
        }

    }

    verifyDate(data);

    async function handleSubmit(e) {
        e.preventDefault();

        const response =  await api.post('/expenses', {
            expenseName,
            value,
            dueDate,
            obs,
            datePayment
        });

       
    }

    function setIdForm (id) {
        document.querySelector('#cd-edit form').setAttribute('id', id);
    }

    return (
    <>
        <div className="card border-orange bg-transparent mb-3 ec" id={data._id} onClick={() => setIdForm(data._id)}>
            <div className="card-header text-header-color d-flex justify-content-between"><div>{data.expenseName}</div>
                <div>
                    <span className="title-valor-ec">
                        Valor
                    </span>
                    <span className="content-valor-ec">
                        R$
                    </span>
                    <span className="content-valor-ec" id="data">
                        {data.value}
                    </span>
                </div>
            </div>
            <div className="card-body content-color body-viewer">
                <div className="obs-conteiner-ec">{data.obs}</div>
                <div className="detail-conteiner">
                    <div className="dates">
                        <div className="due">
                            <div className="title-due-ec">Data de Vencimento</div>
                            <div className="content-due-ec">{dtDue}</div>
                        </div>
                        <div className="payment">
                            <div className="title-payment-ec">Data de Pagamento</div>
                            <div className="content-payment-ec">{dtPayment}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default ExpenseCards;