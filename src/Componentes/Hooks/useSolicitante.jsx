import { useEffect, useState, createContext, useContext } from 'react';
import credenciales from '../../files/credenciales'
import Constantes from '../../Constantes';

const SolicitanteContext = createContext();

export const SolicitanteProvider = ({ children }) => {
    const [user, setUser] = useState({ matricula: '', nombre: '', carrera: '', status: '' });
    const [matchedUser, setMatchedUser] = useState(false);
    const [sendSolicitud, setSendSolicitud] = useState(false);

    const buscarSolicitante = async (matricula) => {
        const url = `${Constantes.RUTA_API_GLOBAL}/api/credenciales/getCredencialAlumn/${matricula}`;
        const peticion = await fetch(url)
        const resp = await peticion.json()

        if (resp.status !== 500) {
            if (resp.length > 0) {
                console.log('solicitante encontrado', resp[0])
                setUser({
                    matricula: resp[0].folio,
                    nombre: resp[0].NOMBRE + ' ' + resp[0].PATERNO + ' ' + resp[0].MATERNO,
                    carrera: resp[0].carrera,
                    status: resp[0].status,
                })
                setMatchedUser(true)
            }
        }
    }
    useEffect(() => {
        buscarSolicitante(user.matricula);
    }, [user.status]);

    const guardaUser = (datosUsuario) => {
        setUser(datosUsuario);
        localStorage.setItem('solicitante', JSON.stringify(datosUsuario));
    };

    const guardaSendSolicitud = () => {
        localStorage.setItem('sendSolicitud', 'true');
        setSendSolicitud(true);
    }

    return (
        <SolicitanteContext.Provider value={{
            user,
            setUser,
            matchedUser,
            setMatchedUser,
            guardaUser,
            guardaSendSolicitud,
            setSendSolicitud,
            sendSolicitud
        }}>
            {children}
        </SolicitanteContext.Provider>
    );
};

const useSolicitante = () => useContext(SolicitanteContext);
export default useSolicitante;