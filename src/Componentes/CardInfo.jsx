import React from 'react'
import '../styles/CardInfo.css'

const CardInfo = ({icon, title, descript}) => {
  return (
    <div className='card-info'>
        <div style={{display: 'flex', gap:10}}>
            <img src={`../../public/${icon}.png`} alt={icon} className='icon-cardInfo' />
            <h3 className='title-info'>{title || 'TITULO'}</h3>
        </div>      
      <p className='descript-info'>{descript}</p>
    </div>
  )
}

export default CardInfo
