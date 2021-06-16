import React, {useState, useEffect} from 'react';
import ExpenseCards from './ExpenseCards';

import '../css/css components/expenses.css';
import api from '../services/api';

function Expenses({data}) {

    const [expenseName, setExpenseName] = useState('');
    const [obs, setObs] = useState('');
    const [value, setValue] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [datePayment, setDatePayment] = useState('');

    const [allData, setAllData] = useState([]);

    const [proxDay, setProxDay] = useState('');
    const [calc,setCalc] = useState('');

    useEffect(() => {
        //console.log(data[0])
        setAllData(data);
    },[data]);

    function openFormEdit(data) {
        document.querySelector('#add-expense').style.backgroundColor = 'transparent';
        document.querySelector('#add-expense').style.color = '#df3030';
        //document.getElementById(data._id).style.backgroundColor = '#1a1a1a';
        document.querySelector('.card-info').style.display = 'none';
        document.querySelector('#cd-add').style.display = 'none';
        document.querySelector('#cd-edit').style.display = 'flex';

        //dando valores para o form Edit
        setExpenseName(data.expenseName);
        setObs(data.obs);
        setDueDate(data.dueDate.slice(0,10));
        if (data.datePayment) {
            setDatePayment(data.datePayment.slice(0,10));
        } else {
            setDatePayment('');
        }
        setValue(data.value);
    }

    function openFormAdd() {
        document.querySelector('#add-expense').style.backgroundColor = '#df3030';
        document.querySelector('#add-expense').style.color = '#e9e9e9';
        document.querySelector('.card-info').style.display = 'none';
        document.querySelector('#cd-edit').style.display = 'none';
        document.querySelector('#cd-add').style.display = 'flex';

        //dando valores para o form Edit
        setExpenseName('');
        setObs('');
        setDueDate('');
        setDatePayment('');
        setValue('');
    }

    function filtrar(data) {
        let idForm = document.querySelector('#cd-edit form').id; 
        let filtro = data.filter( data => data._id === idForm);
        return filtro;
    }

    useEffect(() => {
        let todosS = document.querySelector('#btn-todos').style;
        todosS.backgroundColor = '#df3030';
        todosS.color = '#e9e9e9';
    },[])

    function getDate(days,data) {
        let monthlyDaysJSON = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        let todayDate = getTodayDate();
        let m = Number(todayDate.slice(5,7));
        let annualDays = Number(todayDate.slice(8,10)) + monthlyDaysJSON[m - 1];
        let calc = annualDays + days;
        if (calc > 334 && calc <= 365) {
          let newDay = calc - 334;
          if (newDay < 10) {
              newDay = '0' + newDay;
            }
          let result = todayDate.slice(0,7) + '-' + newDay;
          return result;
        } else if (calc > 365) {
          let newDay = calc - 365;
          if (newDay < 10) {
              newDay = '0' + newDay;
            }
          let result = (Number(todayDate.slice(0,4)) + 1) + '-01-' + newDay;
          return result;
        }
        for (let i = 0; i < 12; i++) {
          if (monthlyDaysJSON[i] >= calc) {
            let newDay = calc - monthlyDaysJSON[i-1];
            if (newDay < 10) {
              newDay = '0' + newDay;
            }
            let newMonth = i;
            if (newMonth < 10) {
              newMonth = '0' + newMonth;
            }
            let result = todayDate.slice(0,4) + '-' + newMonth + '-' + newDay;
            return result;
          }
        }
    }

    function getTodayDate() {
        let dt = new Date();
        let y = Number(dt.getYear()) + 1900;
        let m = Number(dt.getMonth()) + 1;
        if (m < 10) {
            m = '0' + m;
        }
        let d = Number(dt.getDate());
        if (d < 10) {
            d = '0' + d;
        }
        let today = y + '-' + m + '-' + d;
        return today;
    }

    function setTotalCalc (d) {
        let r
        if (d.length > 0) {
            let c = d.value;
            console.log(d)
            d.value.forEach(e => {
                r += c;
            });
        } else {
            r = 0.00;
        }
        return r;
    }

    function filterJSONbtn(id,data) {
        let dateMax, today, dados, result
        switch (id) {
            case '#btn-7dias':
                dateMax = getDate(7);
                today = getTodayDate();
                dados = data.filter( data => data.dueDate.slice(0,10) >= today && data.dueDate.slice(0,10) <= dateMax);
                console.log(dados)
                result = setTotalCalc(dados);
                setProxDay('Próximos 7 dias');
                setCalc(result)
                setAllData(dados);
                break;
                case '#btn-15dias':
                dateMax = getDate(15);
                today = getTodayDate();
                dados = data.filter( data => data.dueDate.slice(0,10) >= today && data.dueDate.slice(0,10) <= dateMax);
                result = setTotalCalc(dados);
                setProxDay('Próximos 15 dias');
                setCalc(result)
                setAllData(dados);
                break;
            case '#btn-30dias':
                dateMax = getDate(30);
                today = getTodayDate();
                dados = data.filter( data => data.dueDate.slice(0,10) >= today && data.dueDate.slice(0,10) <= dateMax);
                result = setTotalCalc(dados);
                setProxDay('Próximos 30 dias');
                setCalc(result)
                setAllData(dados);
                break;
            default:    
                setProxDay('');
                setCalc('');   
                setAllData(data);
        }
        //return data.filter( data => data._id === idForm);

    }

    function clickedBtn(id,data) {
        let btn = ['#btn-7dias', '#btn-15dias', '#btn-30dias', '#btn-todos']
        
        btn.map(btn => {
            let btnS = document.querySelector(btn).style;
            btnS.backgroundColor = 'transparent';
            btnS.color = '#df3030';
        });
        let idS = document.querySelector(id).style;
        idS.backgroundColor = '#df3030';
        idS.color = '#e9e9e9';
        //console.log(allData)
        filterJSONbtn(id,data);
    }

    function setUpdateJSON(dID,dEN,dV,dDD,dOBS,dDP) {
        for (let i = 0; i < data.length; i++) {
          if (data[i]._id === dID) {
            //console.log(data[i])
            //console.log(JSONfile)
            data[i].expenseName = dEN;
            data[i].value = dV;
            data[i].dueDate = dDD;
            data[i].obs = dOBS;
            data[i].datePayment = dDP;
            //console.log(data)
            setAllData(data);
            return;
          }
        }
      }

    async function handleSave(e, data) {
        let JSONFiltered = filtrar(data);
        let response
        //console.log(JSONFiltered[0]);
        if (expenseName && dueDate && value) {
            if (expenseName !== JSONFiltered[0].expenseName || 
                dueDate !== JSONFiltered[0].dueDate || 
                value !== JSONFiltered[0].value || 
                obs !== JSONFiltered[0].obs || 
                datePayment !== JSONFiltered[0].datePayment) {
                    //console.log('temdif')
                    response = await api.post('/expenses/update/' + JSONFiltered[0]._id, {
                        expenseName: expenseName,
                        value: value,
                        dueDate: dueDate,
                        obs: obs,
                        datePayment: datePayment,
                    });
                    
            }
        }

        setUpdateJSON(JSONFiltered[0]._id,expenseName,value,dueDate,obs,datePayment);
        if (response) {
            if (response.status === 200) {
                document.getElementById('http-edit').style.display = 'flex';
                document.getElementById('http-edit').innerText = 'Salvo com sucesso!'
            }
            setTimeout(() => {
                document.getElementById('http-edit').style.display = 'none';
                //console.log(response.status)
            }, 3000);
            
        }
    }

    async function handleDelete(e, data) {
        let JSONFiltered = filtrar(data);
        let response = await api.delete('/expenses/' + JSONFiltered[0]._id);
        //console.log(response);
        if (response) {
            if (response.status === 200) {
                document.getElementById('http-edit').style.display = 'flex';
                document.getElementById('http-edit').innerText = 'Excluído com sucesso!'
            }
            setTimeout(() => {
                document.getElementById('http-edit').style.display = 'none';
                //console.log(response.status)
            }, 3000);
        }
        }

    let valor

    function maskCurrency() {
        let e = document.querySelector('#value');
        valor = e.value;
        //h1.innerHTML = valor;
        valor = valor + '';
        //h1.innerHTML = valor;
        valor = parseInt(valor.replace(/[\D]+/g, ''));
        //h1.innerHTML = valor;
        valor = valor + '';
        if (valor.length === 1) valor = '0' + valor;
        valor = valor.replace(/([0-9]{2})$/g, ".$1");
        if (valor.indexOf('.') === 0) valor = '0' + valor;
        //h1.innerHTML = valor;

        if (valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, "$1.$2");
        }
        setValue(valor);
    }

    //definir relógio
    const [hour, setHour] = useState(Date().slice(16,21));
    const [day, setDay] = useState(Date().slice(8,10) + ', ' + Date().slice(4,7));
    
    let vH
    setInterval( () => {
        let newData = Date();
        let newHour = newData.slice(16,21);
        if (newHour !== vH) {
            setHour(newHour);
            vH = newHour;
        }
        let newDay = newData.slice(8,10);
        let newMonth = newData.slice(4,7);
        if (newDay !== day) {
            setDay(newDay + ', ' + newMonth);
        }
        
    },1000)

    return (
        <>
            <div className="conteiner-expenses">
                <div className="conteiner-list">
                    <div className="header-list">
                        <div className="create-button-list">
                            <button className="btn btn-outline-orange long-button" id="add-expense" type="button" onClick={() => openFormAdd()}>Adicionar Despesa</button>
                        </div>
                        <div className="text-color text-center">Selecionar os Próximos:</div>
                        <div className="button-list">
                            <button className="btn btn-outline-orange" onClick={() => clickedBtn('#btn-7dias',data)} id="btn-7dias" type="button">7 Dias</button>
                            <button className="btn btn-outline-orange" onClick={() => clickedBtn('#btn-15dias',data)} id="btn-15dias" type="button">15 Dias</button>
                            <button className="btn btn-outline-orange" onClick={() => clickedBtn('#btn-30dias',data)} id="btn-30dias" type="button">30 Dias</button>
                            <button className="btn btn-outline-orange" onClick={() => clickedBtn('#btn-todos',data)} id="btn-todos" type="button">Todos</button>
                        </div>
                    </div>
                    <div className="list">
                        <ul className="u-list">
                            {allData.map( data => (<li className="list-cards" on onClick={() => openFormEdit(data)}><ExpenseCards data={data}/></li>))}
                        </ul>
                        
                    </div>
                </div>
            </div>
            <div className="conteiner-viewer">
                <div className="card-menu">
                    <div className="card border-orange bg-base-primary mb-3">
                        <div className="card-header text-header-color text-center">Cansado de se perder em contas? iAssets da um jeito para você!</div>
                        <div className="card-body content-color">
                            <div className="clocker">
                                <div className="clock text-center">{hour}</div>
                                <div className="date text-center">{day}</div>
                            </div>
                            <div className="somas">
                                <div className="total-expense">
                                    <div className="te-text text-center">{proxDay}</div>
                                    <div className="te-value text-center">R$ 4,20</div>
                                </div>
                                <div className="parcial-expense">
                                    <div className="te-text text-center">Despesas Totais</div>
                                    <div className="te-value text-center">R$ 54,20</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-viewer">
                    <div className="card-info text-center">Selecione uma <span className="bold">Despesa</span> para ver detalhes, <br/> ou então clique em <span className="bold">Adicionar Despesa</span> para cadastrar uma nova!</div>
                    <div className="card-detail" id="cd-add">
                        <form className="card border-orange bg-base-primary mb-3">
                            <div className="msg-http" id="http-add">Salvo com sucesso!</div>
                            <input className="card-header text-header-color" type="text" onChange={e => setExpenseName(e.target.value)} value={expenseName} placeholder="Digite o nome da despesa" required/>
                            <div className="card-body content-color body-viewer">
                                <textarea className="obs-conteiner" type="text" onChange={e => setObs(e.target.value)} value={obs} placeholder="Observações"/>
                                <div className="detail-conteiner">
                                    <div className="dates">
                                        <div className="due">
                                        <div className="title-due">Data de Vencimento</div>
                                        <input className="content-due" type="date" onChange={e => setDueDate(e.target.value)} value={dueDate}/>
                                        </div>
                                        <div className="payment">
                                        <div className="title-payment">Data de Pagamento</div>
                                        <input className="content-payment" type="date" onChange={e => setDatePayment(e.target.value)} value={datePayment}/>
                                        </div>
                                    </div>
                                    <div className="value">
                                        <div className="title-valor">Valor</div>
                                        <div className="div-cv">
                                            <input className="content-valor" type="number" onChange={() => maskCurrency()} value={value} placeholder="0,00"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card-detail" id="cd-edit">
                        <form className="card border-orange bg-base-primary mb-3">
                        <div className="msg-http" id="http-edit">Salvo com sucesso!</div>
                            <div className="d-flex">
                                <input className="card-header text-header-color" id="expenseName" type="text" onChange={e => setExpenseName(e.target.value)} value={expenseName} required/>
                                <div className="card-header div-buttons d-flex justify-content-around align-items-center">
                                <button className="btn btn-sm btn-outline-orange" onClick={e => handleDelete(e.target, data)} type="button">Descartar</button>
                                <button className="btn btn-sm btn-outline-orange" onClick={e => handleSave(e.target, data)} type="button">Salvar</button>
                                </div>
                            </div>
                            <div className="card-body content-color body-viewer">
                                <textarea className="obs-conteiner" id="obs" type="text" onChange={e => setObs(e.target.value)} value={obs}/>
                                <div className="detail-conteiner">
                                    <div className="dates">
                                        <div className="due">
                                        <div className="title-due">Data de Vencimento</div>
                                        <input className="content-due" id="due" type="date" onChange={e => setDueDate(e.target.value)} value={dueDate}/>
                                        </div>
                                        <div className="payment">
                                        <div className="title-payment">Data de Pagamento</div>
                                        <input className="content-payment" id="payment" type="date" onChange={e => setDatePayment(e.target.value)} value={datePayment}/>
                                        </div>
                                    </div>
                                    <div className="value">
                                        <div className="title-valor">Valor</div>
                                        <div className="div-cv">
                                            <input className="content-valor" id="value" type="number" onChange={() => maskCurrency()} value={value}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Expenses;