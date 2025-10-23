import React from 'react'
import '../styles/Timeline.css'

const Timelineprocess = ({user}) => {
    const estados = ['Por procesar', 'GENERADA', 'IMPRESA', 'ENTREGADA'];
  return (
    <div className="timeline-container">
      {estados.map((estado, index) => {
        const estadoIndex = estados.indexOf(user.status || 'Por procesar')
        const clase =
          index < estadoIndex
            ? 'estado completado'
            : index === estadoIndex
            ? 'estado actual'
            : 'estado pendiente';

        return (
          <div key={estado} className={clase}>
            <div className="circulo">{index + 1}</div>
            <div className="etiqueta">{estado}</div>
            {index < estados.length - 1 && <div className="linea" />}
          </div>
        );
      })}
    </div>
  )
}

export default Timelineprocess
