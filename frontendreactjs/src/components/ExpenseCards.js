import React from 'react';

import '../css/css components/expensecards.css'

function ExpenseCards() {

    return (
    <>
        <div className="conteiner-card">
            <div className="card">
                <div className="descriptions">
                    <h2>Título</h2>
                    <p>Observações</p>
                    <div className="options">
                        <div className="mini-card"><p><i className="far fa-trash-alt" id="content-trash"></i>Deletar</p></div>
                        <div className="mini-card"><p><i className="far fa-edit" id="content-edit"></i>Editar</p></div>
                    </div>
                </div>
                <div className="info">
                    <div className="value-name">
                        <p>Valor:</p>
                    </div>
                    <div className="value"> 
                        <span>R$ 125,30</span>
                    </div>
                    <div className="value-name">
                        <p>Data de Vencimento:</p>
                    </div>
                    <div className="value"> 
                        <span>10/06/2021</span>
                    </div>
                    <div className="value-name">
                        <p>Data de Pagamento:</p>
                    </div>
                    <div className="value"> 
                        <span>10/06/2021</span>
                    </div>
                    
                </div>
            </div>
        </div>
    </>
    );
}

export default ExpenseCards;