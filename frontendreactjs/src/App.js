import Expenses from './components/Expenses';
import AddExpense from './components/AddExpense';
import EditExpense from './components/EditExpense';

import './css/global.css'
import './css/aside.css'
import './css/main.css'


function App() {

  return (
    <>
    <div id="root-addExpense"><AddExpense /></div>
    <div id="root-EditExpense"><EditExpense /></div>
    <aside>
      <div>
        <div className="logo-conteiner">
          <span>iAssets</span>
        </div>
        <div className="content-conteiner">
          <ul>
            <li className="li-disabled">Controle</li>
            <li className="li-active"><p><i className="fas fa-chart-line"></i>Contas a pagar</p></li>
            <li className="li-disabled">Não implementado</li>
            <li className="li-disabled">Não implementado</li>
            <li className="li-line"></li>
            <li className="li-disabled">Configurações</li>
            <li className="li-active"><p><i className="far fa-user"></i>Minha Conta</p></li>
            <li className="li-active"><p><i className="fas fa-cog"></i>Configurações</p></li>
            <li className="li-active"><p><i className="far fa-bell"></i>Notificações</p></li>
          </ul>
        </div>
      </div>
      <div className="copyright-conteiner">
        <ul>
            <li className="li-line"></li>
            <li className="li-disabled li-copyright">Feito por Caio Gasparini</li>
        </ul>
      </div>
    </aside>
    <main>
      <Expenses/>
    </main>
    </>
  );
}

export default App;
