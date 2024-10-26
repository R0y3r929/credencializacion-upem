import React from 'react'
const TabsStatus = ({ status, carrer, onClick}) => {  
  return (
    <span className={`status-chips ${status && 'activo'}`} onClick={onClick}>{status && '🟢'}{carrer}</span>
  );
};

const Chips = ({carrer, selectedCarrera, setSelectedCarrera}) => {
  const handleSelectCarrer = (carrera) =>{
    setSelectedCarrera(carrera)
  }
  return (
    <div className='chips'>
      <TabsStatus 
        status={selectedCarrera === carrer}
        carrer={carrer}
        onClick={() => handleSelectCarrer(carrer) }
      />
    </div>
  )
}

export default Chips
