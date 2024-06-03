import React from 'react'
import { Link } from 'react-router-dom'
import './RegisterUser.css';

export default function RegisterUser(){
    return (
        <div className='register'>
            <h2>Cadastro de usuários</h2>
            <form>
                <label className='form-label' htmlFor="email">E-mail:</label>
                <input className='form-input' type="email" name="email" required/>
                <label className='form-label' htmlFor="senha">Senha:</label>
                <input className='form-input'  type="password" name="senha" required/>
                <label className='form-label' htmlFor="senha">Digite novamente a senha:</label>
                <input className='form-input'  type="password" name="senha" required/>
                <input className='form-submit' type="submit" value="Cadastrar" />
            </form>
            <label htmlFor="">Já tem login?</label>
            <span><Link to={'/'}>Faça o Login</Link></span>
        </div>
    )

}