import React from 'react'
import modalimg from '../assets/voilier.png'

 const Modal = ({open}) => {
    if(!open) return null  
  return (
    <div className='overlay'>
        <div className='modalContainer'>
            <img src={modalimg} alt=" " />
          <div  className="modalRight">
            <p className="closeBtn ">X</p>
            <div className="modalContent">

                 <p>Voulez vous notez ce vendeur</p>
                 <h3>une note entre 0 et 5</h3>
                 <p>Donnez votre avis!</p>

            </div>
          </div> 
        </div>
    </div>
  )
}

export default Modal;
