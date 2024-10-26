import React from 'react'
const PillsStatus = ({ status }) => {
    const className = `tab-status-cred-alumns ${status === 'GENERADA' ? 'generada' : (status === 'ENTREGADA')? 'entregada':'impresa'}`;  
    return (
      <span className={className}>{status}</span>
    );
  };
const TableNi = ({alumnos}) => {
  return (
    <>
      <table className="tableMatchs">
        <thead>
            <tr>
                <th>Matricula</th>
                <th>Nombre</th>
                <th>Carrera</th>
                <th>Modalidad</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {alumnos.map(alumno=>(
                <tr>
                    <td>{alumno.MATRÍCULA}</td>
                    <td>{alumno.NOMBRE} {alumno.PATERNO} {alumno.MATERNO}</td>
                    <td>{alumno.carrera} </td>
                    <td>{alumno.modalidad} </td>
                    <td><PillsStatus status={alumno.status}/></td>
                </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default TableNi
