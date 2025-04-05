import React from 'react'
import {motion} from 'motion/react'


const TitlesPage = ({children}) => {
  return (
    <div className='title-page-container'>
        <motion.h1
            initial={{scale:0.5}}
            animate={{scale:1}}
            transition={{
                duration: 2,
                ease: 'easeInOut',
                delay: 0.2,
                type: 'spring'
            }}
            className='title-page'
        >
            {children}      
        </motion.h1>
        <hr />
    </div>
  )
}

export default TitlesPage
