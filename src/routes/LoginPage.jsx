import React from 'react'
import { Link } from 'react-router-dom'
import './LoginPage.css';

export default function LoginPage(){
    return (
        <div className='login'>
            <img src="./src/assets/logo.png" alt="logo"/>
            <h2>Login</h2>
            <form>
                <label className='form-label' htmlFor="email">E-mail:</label>
                <input className='form-input' type="email" name="email" required/>
                <label className='form-label' htmlFor="senha">Senha:</label>
                <input className='form-input'  type="password" name="senha" required/>
                <input className='form-submit' type="submit" value="Entrar" />
            </form>
            <label htmlFor="">Não tem cadastro?</label>
            <span><Link to={'/cadastrousuarios'}>Faça o cadastro</Link></span>
        </div>
    )

}