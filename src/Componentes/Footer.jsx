import '../styles/Footer.css'
import FacebookIcon from './Icons/Facebook'
import InstagramIcon from './Icons/Instagram'
import MailIcon from './Icons/Mail'
import PaginaIcon from './Icons/Pagina'
import PhoneIcon from './Icons/Phone'

const Footer = () => {
  return (
    <footer>
        <div className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>CredencialUPEM</h3>
                    <p>Sistema de seguimiento de credenciales estudiantiles de la Universidad Privada del Estado de México | Plantel Texcoco.</p>
                </div>
                
                <div className="footer-section">
                    <h3>Contacto</h3>
                    <a href="mailto:rogelio.senovio@upemex.mx">
                        <MailIcon/> rogelio.senovio@upemex.mx
                    </a>
                    <a href="tel:+525959537813">
                        <PhoneIcon/> 595-95-3-78-13
                    </a>
                </div>
                
                <div className="footer-section">
                    <h3>Síguenos</h3>
                    <div className="social-links">
                        <a href="https://www.facebook.com/upem.texcoco.370" aria-label="Facebook">
                            <FacebookIcon/>
                        </a>
                        <a href="https://www.upemex.edu.mx/plantel-texcoco/" aria-label="Pagina Web">
                            <PaginaIcon/>
                        </a>
                        <a href="https://www.instagram.com/upemtexcoco/" aria-label="Instagram">
                            <InstagramIcon/>
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Universidad Privada del Estado de México. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
