import React, { useEffect, useState } from 'react';

const PillsStatus = ({ status }) => {
  const className = `tab-status-cred-alumns ${status === 'GENERADA' ? 'generada' : (status === 'ENTREGADA') ? 'entregada' : 'impresa'}`;
  return (
    <span className={className}>{status}</span>
  );
};

const TableNi = ({ alumnos, selectedCarrera }) => {
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    setBusqueda('');
  }, [selectedCarrera]);

  const normalizarTexto = (texto) => String(texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const textoBusqueda = normalizarTexto(busqueda.trim());
  const alumnosFiltrados = alumnos.filter((alumno) => {
    const matricula = normalizarTexto(alumno.MATRÍCULA);
    const nombreCompleto = normalizarTexto(`${alumno.NOMBRE} ${alumno.PATERNO} ${alumno.MATERNO}`);
    return matricula.includes(textoBusqueda) || nombreCompleto.includes(textoBusqueda);
  });

  return (
    <>
      <div className="busqueda-table-ni">
        <label htmlFor="busqueda-table-ni">Buscar alumno</label>
        <input
          id="busqueda-table-ni"
          type="search"
          placeholder="Nombre o matrícula"
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
        />
      </div>
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
          {alumnosFiltrados.map((alumno, index) => (
            <tr key={alumno.MATRÍCULA || index}>
              <td><span className="numb-reg">{index + 1}</span></td>
              <td>{alumno.MATRÍCULA}</td>
              <td>{alumno.NOMBRE} {alumno.PATERNO} {alumno.MATERNO}</td>
              <td className='modalidad-ni'>{alumno.modalidad}</td>
              <td><PillsStatus status={alumno.status} /></td>
            </tr>
          ))}
          {alumnosFiltrados.length === 0 && (
            <tr>
              <td colSpan="5" className="sin-resultados-ni">
                No se encontraron alumnos con esa búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default TableNi
