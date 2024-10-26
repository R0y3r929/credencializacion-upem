import React, { useEffect, useState } from 'react'
import nuevoIngreso from '../files/nuevoIngreso'
import Chips from './Chips';

const ChipsCarreras = ({selectedCarrera, setSelectedCarrera, setFiltroNi}) => {
    const [credsNuevoIng, setCredsNuevoing] = useState(nuevoIngreso);
    const carrerasUnicas = credsNuevoIng.reduce((carreras, objeto) => {
        const carrera = objeto.carrera;
        if (!carreras.includes(carrera)) {
            carreras.push(carrera);
        }
        return carreras;
    },[]).sort((a, b) => a.localeCompare(b));
    useEffect(()=>{
        const registrosFiltrados = nuevoIngreso.filter((alumno)=>{
            return Object.values(alumno).some((value) => {
                if (typeof value === 'string') {
                    return value.match(selectedCarrera)
                }  
                return false;
            });  
        })
        setFiltroNi(registrosFiltrados)
    }, [selectedCarrera])
  return (
    <div className='box-chips'>
      {carrerasUnicas.map(carrer=>(
        <Chips key={carrer} carrer={carrer} selectedCarrera={selectedCarrera} setSelectedCarrera={setSelectedCarrera}/>
      ))}
    </div>
  )
}

export default ChipsCarreras
