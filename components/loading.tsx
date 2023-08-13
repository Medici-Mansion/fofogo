'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Loading = () => {
  return (
    <motion.div
      key="loading"
      className="fixed top-0 flex w-full h-full items-center justify-center overflow-x-hidden"
    >
      <motion.div
        exit={{
          opacity: 0,
        }}
        initial={{ opacity: 0, rotateZ: 0, scale: 0.2 }}
        animate={{
          opacity: 1,
          rotateZ: 360,
          scale: 1,
          transition: {
            damping: 5,
            stiffness: 50,
            duration: 0.4,
          },
        }}
      >
        <Image
          src={'/fofogo_symbol.png'}
          alt="logo"
          className="rounded-lg"
          objectFit="none"
          width={100}
          height={100}
        />
      </motion.div>
    </motion.div>
  )
}

export default Loading
