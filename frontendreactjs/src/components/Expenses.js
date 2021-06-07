import React, {useEffect, useState} from 'react';
import ExpenseCards from './ExpenseCards';
import api from '../services/api';

import '../css/css components/expenses.css';

function Expenses() {

    const [allExpenses, setAllExpenses] = useState([])

    useEffect(() => {
      async function getAllExpenses() {
        const response = await api.get("/expenses",);
    
        setAllExpenses(response.data);
    
      }
  
      getAllExpenses();
    }, [])

    function openAddExpense() {
        document.getElementById('root-addExpense').style.display = 'block';
    }

    return (
        <>
            <header className="header">
                <div><h1>Olá Caio,<br/><span>Contas a Pagar</span></h1></div>
                <div className="nav-header">
                    <i className="fas fa-search" id="search-top"></i>
                    <input type="search" name="search" id="nav-search" placeholder="Pesquisar"/>
                    <i className="far fa-bell"></i>
                </div>
            </header>
            <div className="conteiner-main">
                <div className="main">
                    <div className="card-top">
                        <div className="clock">
                            <div className="date"><p>06 de Junho</p></div>
                            <div className="hours"><p>01:40</p></div>
                        </div>
                        <div className="view-on-top">
                            <div className="vot-top">
                                <p>Pare de se preocupar com as contas, a iAssets organiza para você!</p>
                            </div>
                            <div className="vot-bottom">
                                <div className="vot-b-left">
                                    <div className="vot-b-l-t">
                                        <p>Vence Hoje</p>
                                    </div>
                                    <div className="vot-b-l-b">
                                        <p>R$ 125,03</p>
                                    </div>
                                </div>
                                <div className="vot-b-right">
                                    <div className="vot-b-r-t">
                                        <p>Dívidas Totais</p>
                                    </div>
                                    <div className="vot-b-r-b">
                                        <p>R$ 325,03</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="toolbars">
                        <div className="create-expense">
                            <i className="fas fa-search" id="search-content"></i>
                            <input type="search" name="search" id="content-search" placeholder="Pesquisar Conta"/>
                            <div className="mini-cards" onClick={()=> openAddExpense()}><p><i className="fas fa-plus" id="content-plus"></i>Adicionar nova despesa</p></div>
                        </div>
                        <div className="mini-cards-conteiner">
                            <div className="mini-cards"><p>Vence hoje</p></div>
                            <div className="mini-cards"><p>Vence em 7 dias</p></div>
                            <div className="mini-cards"><p>Vence em 15 dias</p></div>
                            <div className="mini-cards"><p>Vence em 30 dias</p></div>
                            <div className="mini-cards"><p>Todos</p></div>
                        </div>
                    </div>
                    {allExpenses.map( data => (
                        <ExpenseCards data={data}/>
                    ))}
                    
                </div>
                <div className="right-aside">
                    <div className="card-right-aside"></div>
                </div>
            </div>

        </>
    );
}

export default Expenses;