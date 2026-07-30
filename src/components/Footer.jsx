import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      className="app-footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <div className="footer-divider" />
      PROYECTO FINAL · MÉTODOS NUMÉRICOS · EULER Y EULER MEJORADO APLICADOS A UN CASO FORENSE
    </motion.footer>
  )
}
