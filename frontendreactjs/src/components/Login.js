import React, { useState } from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

import '../css/css Login/login.css';

function Login() {      
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            const response = await api.post('/login', {
                email,
                password
            });

            if (response.status === 400) {
                return console.log(response.data);
            } else if (response.status === 200) {
                localStorage.authToken = response.headers["authorization-token"];
                history.push('/user');
            }             
        } catch (error) {
            console.log(error);
        }
        
        
    };

    return (
        <>
            <main className="main-login">
                <div className="div-login">
                    <div className="aside-login">
                        <div className="header-aside-login">
                            <h1 className="text-center txt">iAssets</h1>
                            <p  className="text-center bold txt">Cansado de se perder em contas? <br/> iAssets da um jeito para você!</p>
                        </div>
                        <div className="content-aside-login">
                            <ul> Organize
                                <li>
                                    Contas a Pagar.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <form className="form-login" id="formLogin" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <h1>Login</h1>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" 
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                            <div id="emailHelp" className="form-text">Nunca compartilhe seu login e senha.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Senha</label>
                            <input type="password" className="form-control" id="inputPassword" 
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="checkConnect" />
                            <label className="form-check-label" htmlFor="checkConnect">Mantenha-me Conectado</label>
                        </div>
                        <div className="div-button">
                            <button type="submit" className="btn btn-orange" id="btnLogin">Entrar</button>
                            <label>Cadastrar</label>
                        </div>
                        
                    </form>
                </div>
            </main>
        </>
    );
}

export default Login;