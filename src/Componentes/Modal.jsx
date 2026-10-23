import '../styles/Modal.css'

export const Modal = ({ onClose, children }) => {
  return (
    <>
      <div className="bgventana">
        <div className="ventana">
          <div id="contenido">
            <div className="modal-header">
              <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar ventana">
                <i className="bi bi-x-circle" aria-hidden="true"></i>
              </button>
            </div>
            <div className="modal-content">
              {children}
            </div>
            <div className="modal-footer">
              <hr></hr>
            </div>
          </div>
          <div id="animatedShowPreviw"></div>
        </div>
      </div>
    </>
  )
}
