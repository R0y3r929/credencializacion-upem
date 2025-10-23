import { useEffect, useState } from 'react';
import credenciales from '../../files/credenciales'

const useSolicitante = () => {
    const [user, setUser] = useState({matricula: '', nombre: '', carrera: '', status: ''});
    const [matchedUser, setMatchedUser] = useState(false);
    const buscarSolicitante = (matricula) => {
        const solicitanteEncontrado = credenciales.find((alumno) => alumno.MATRÍCULA === matricula);
        if (solicitanteEncontrado) {
            console.log('Solicitante encontrado:', solicitanteEncontrado);
            setUser(
                {
                    matricula: solicitanteEncontrado.MATRÍCULA,
                    nombre: solicitanteEncontrado.NOMBRE+' '+solicitanteEncontrado. PATERNO+' '+solicitanteEncontrado.MATERNO,
                    carrera: solicitanteEncontrado.carrera,
                    status: solicitanteEncontrado.status,
                }
            );
            setMatchedUser(true);
        } 
    };
    useEffect(()=>{        
        buscarSolicitante(user.matricula);        
    }, [user.status]);

    return {
        user, 
        setUser,
        matchedUser,
    };
};

export default useSolicitante;