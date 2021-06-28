import React, {useEffect, useState} from 'react';

import Expenses from './expenseComp/Expenses';

import api from '../services/api';

import '../css/css Logged/global.css'
import '../css/css Logged/aside.css'
import '../css/css Logged/main.css'


function Logged() {

  const [authToken, setAuthToken] = useState(localStorage.authToken);
  const [allExpenses, setAllExpenses] = useState([]);
  const [sessionName, setSessionName] = useState('Contas a Pagar');

    useEffect(() => {
      async function getAllExpenses() {
        const response = await api.get("/expenses",{
          headers: {
            Authorization: authToken
          }
         });
        setAllExpenses(response.data);
        //console.log(allExpenses);
      }
      getAllExpenses();
       
    }, [authToken])

    //document.querySelector('#cd-edit form').addEventListener('click')

    // alterar o nome da sessão na navbar
    function getSession(session) {
      setSessionName(session); 
    }

    

  return (
    <>
      <aside>
        <div>
          <div className="cont-nav">
            <span className="navbar-brand mb-0 h1"><h1>iAssets</h1></span>
            </div>
          <ul className="nav flex-column nav-pills">
              <li className="nav-item">
                <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Controle</a>
              </li>
          </ul>
          <div className="inner-aside">
              <ul className="nav flex-column nav-pills">
                  <li className="nav-item">
                    <a className="nav-link color" aria-current="page" href="#" id="expenses-nav-link" onClick={() => getSession('Contas a Pagar')}>
                      <i className="far fa-money-bill-alt"></i>Contas a Pagar</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link space-li disabled" href="#">Em construção</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link space-li disabled" href="#">Em construção</a>
                  </li>
              </ul>
          </div>
          <ul className="nav flex-column nav-pills">
              <li className="nav-item">
                <a className="nav-link space-li disabled" href="#" tabIndex="-1" aria-disabled="true">Opções</a>
              </li>
          </ul>
          <div className="inner-aside">
              <ul className="nav flex-column nav-pills">
                  <li className="nav-item">
                    <a className="nav-link space-li color" aria-current="page" href="#" onClick={() => getSession('Minha Conta')}>
                    <i className="far fa-user"></i>Minha Conta</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link space-li color" href="#" onClick={() => getSession('Configurações')}>
                    <i className="fas fa-cog"></i>Configurações</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link space-li color" href="#" onClick={() => getSession('Notificações')}>
                    <i className="far fa-bell"></i>Notificações</a>
                  </li>
              </ul>
          </div>
        </div>
        <div>
        <ul className="nav flex-column nav-pills">
              <li className="nav-item">
                <a className="nav-link space-li disabled" href="#" tabIndex="-1" aria-disabled="true">Feito por Caio Gasparini</a>
              </li>
          </ul>
        </div>
      </aside>
      <main>
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <span className="navbar-text h5 color-span-nav">
                    Olá Caio, <br/> <span className="h2">{sessionName}</span>
                  </span>
                </ul>
                <form className="d-flex">
                  <input className="form-control me-4" type="search" placeholder="Pesquisar" aria-label="Search" />
                  <button className="btn btn-outline-orange" type="submit">Pesquisar</button>
                </form>
              </div>
            </div>
          </nav>
          <div className="main"><Expenses data={allExpenses} /></div>
      </main>
    </>
  );
}

export default Logged;
