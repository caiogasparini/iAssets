import React from 'react';

import '../css/css components/expensecards.css'

function ExpenseCards({ data }) {

    let datePayment	
    let dataValue
    
    function verifyDate(data) {
        if (!data.datePayment) {
            datePayment = 'N/A';
        } else {
            datePayment = data.datePayment.slice(8,10) + '-' + data.datePayment.slice(5,7) + '-' + data.datePayment.slice(0,4);
        }
    }

    function verifyValue(data) {
        dataValue = data.value.toString();
        console.log(dataValue)
        let dvIndexOfv = dataValue.indexOf(',');
        let dvIndexOfp = dataValue.indexOf('.')

        if (dvIndexOfp != -1) {
            dataValue = dataValue.replace(/\./g, ",");
            console.log(dataValue)
        }

        if(dvIndexOfv === -1 && dvIndexOfp === -1){
            dataValue += ',00';
        } else if (dataValue.length - dvIndexOfv === 1) {
            dataValue += '00';
        } else if (dataValue.length - dataValue.indexOf(',') === 2) {
            dataValue += '0';
        }
    }

    function openEditExpense() {
        document.getElementById('root-EditExpense').style.display = 'block';
    }


    verifyValue(data);
    verifyDate(data);

    return (
    <>
        <div className="conteiner-card">
            <div className="card">
                <div className="descriptions">
                    <h2>{data.expenseName}</h2>
                    <p>{data.obs}</p>
                    <div className="options">
                        <div className="mini-card"><p><i className="far fa-trash-alt" id="content-trash"></i>Deletar</p></div>
                        <div className="mini-card" onClick={()=> openEditExpense()}><p><i className="far fa-edit" id="content-edit"></i>Editar</p></div>
                    </div>
                </div>
                <div className="info">
                    <div className="value-name">
                        <p>Valor:</p>
                    </div>
                    <div className="value"> 
                        <span>R$ {dataValue}</span>
                    </div>
                    <div className="value-name">
                        <p>Data de Vencimento:</p>
                    </div>
                    <div className="value"> 
                        <span>{data.dueDate.slice(8,10)}-{data.dueDate.slice(5,7)}-{data.dueDate.slice(0,4)}</span>
                    </div>
                    <div className="value-name">
                        <p>Data de Pagamento:</p>
                    </div>
                    <div className="value"> 
                        <span>{datePayment}</span>
                    </div>
                    
                </div>
            </div>
        </div>
    </>
    );
}

export default ExpenseCards;