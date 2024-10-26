import React from 'react'
import { Link, NavLink } from "react-router-dom"
import '../styles/Navbar.css'

const NavbarPersonal = ({modal, setModal}) => { 
    const verFormNuevoIngreso = () =>{
        setModal(true)
    } 
  return (
    <> 
        <nav className="navbar navbar-expand-lg bg-personal border-bottom border-body fixed-top" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand logotipo" href="/home">
                    <div className="text-logo">
                        <div className='titulo'>
                            <span>U.P.E.M. | PLANTEL TEXCOCO</span>
                        </div>
                        <div className='titulo'>
                            <small>Universidad Privada del Estado de México</small>
                        </div>
                    </div>
                </Link>
                
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">                                        
                <button className='btn-nuevoIngreso' onClick={verFormNuevoIngreso}>Soy de Nuevo Ingreso</button>               
            </div>
        </nav>  
    </>
  )
}

export default NavbarPersonal
