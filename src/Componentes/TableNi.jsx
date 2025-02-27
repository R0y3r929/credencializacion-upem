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
                <th>#</th>
                <th>Matricula</th>
                <th>Nombre</th>
                <th>Modalidad</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {alumnos.map((alumno, index)=>(
                <tr>
                  <td><font className="numb-reg">{index+1}</font></td>
                  <td>{alumno.MATRÍCULA}</td>
                  <td>{alumno.NOMBRE} {alumno.PATERNO} {alumno.MATERNO}</td>
                  <td className='modalidad-ni'>{alumno.modalidad}</td>
                  <td><PillsStatus status={alumno.status}/></td>
                </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default TableNi
