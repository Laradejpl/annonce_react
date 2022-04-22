import React from 'react'
import modalimg from '../assets/voilier.png'
import '../Modal.css'
import StarRating from './StarRating'

 const Modal = ({open,onClose}) => {
    if(!open) return null  
  return (
    <div onClick={onClose} className='overlay'>
        <div onClick={(e)=>{e.stopPropagation()}} 
         className='modalContainer'>
            <img className='imgModal' src={modalimg} alt=".. " />
          <div  className="modalRight">
           <p onClick={onClose} className='closeBtn'>X</p>
            
            <div className="modalContent">

                
                
                 <h5>Donnez votre avis!</h5>
                 <div className="divider"></div>
                 <form>

                 <input  className='inputModal' type="text" placeholder="titre de votre avis"/>
                 <textarea  placeholder="votre avis"></textarea>
                  
                   { /*<StarRating /*/}


                 </form>
                  


            </div>
            <div className='btnContainer'>
        <button className='btnPrimary'>

            <span className='bold'>NOTEZ</span>
      </button>
               <button className='btnOutline'>
                     <span className='bold'>NON</span>, Merci
              </button>
    </div>
          </div> 
        </div>
    </div>
  )
}

export default Modal;
