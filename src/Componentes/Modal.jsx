import '../styles/Modal.css'

export const Modal = ({onClose, children}) => {
    return (
      <>
          <div className="bgventana">
              <div className="ventana">
                  <div id="contenido">
                    <div className="modal-header">
                    <font color='red' onClick={()=>onClose()} id='closeModalview1' >Cerrar</font>
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
  