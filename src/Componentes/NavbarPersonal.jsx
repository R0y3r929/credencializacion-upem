import React from 'react'
import { Link } from "react-router-dom"
import { motion } from "motion/react";
import '../styles/Navbar.css'
import { useTheme } from '../Context/ThemeContext';

const NavbarPersonal = ({ modal, setModal }) => {
    const { theme, toggleTheme } = useTheme();
    const verFormNuevoIngreso = () => {
        setModal(true)
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-personal border-bottom border-body fixed-top" data-bs-theme={theme}>
                <div className="container-fluid">
                    <Link className="navbar-brand logotipo" href="/home">
                        <motion.div className="text-logo"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 2,
                                ease: 'easeInOut',
                                delay: 0.5,
                                type: 'spring'
                            }}
                        >
                            <div className='titulo'>
                                <span>U.P.E.M. | PLANTEL TEXCOCO</span>
                            </div>
                            <div className='titulo'>
                                <small>Universidad Privada del Estado de México</small>
                            </div>
                        </motion.div>
                    </Link>

                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <button className='btn-nuevoIngreso' onClick={verFormNuevoIngreso}>Soy de Nuevo Ingreso</button>
                    <div className="theme-switch-wrapper ms-3">
                        <label className="theme-switch" htmlFor="checkbox">
                            <input type="checkbox" id="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                            <div className="slider round">
                                <span className="icon sun">☀️</span>
                                <span className="icon moon">🌙</span>
                            </div>
                        </label>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavbarPersonal
