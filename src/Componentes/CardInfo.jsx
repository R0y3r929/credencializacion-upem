import { motion } from "motion/react"
import '../styles/CardInfo.css'

const CardInfo = ({ icon, title, descript, index = 0 }) => {
  return (
    <motion.div
      className='card-info'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div style={{ display: 'flex', gap: 10 }}>
        <img src={`/${icon}.png`} alt={icon} className='icon-cardInfo' />
        <h3 className='title-info'>{title || 'TITULO'}</h3>
      </div>
      <p className='descript-info'>{descript}</p>
    </motion.div>
  )
}

export default CardInfo
