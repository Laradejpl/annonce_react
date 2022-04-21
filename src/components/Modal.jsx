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

                 <p>Voulez vous notez ce vendeur</p>
                 <h3>une note entre 0 et 5</h3>
                 <p>Donnez votre avis!</p>
                 <form>
                  {/* 
                  <div className="rating">
                    <input type="radio" id="star5" name="rating" value="5" /><label htmlFor="star5" title="text">5 stars</label>
                    <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="star4" title="text">4 stars</label>
                    <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="star3" title="text">3 stars</label>
                    <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="star2" title="text">2 stars</label>
                    <input type="radio" id="star1" name="rating" value="1" /><label htmlFor="star1" title="text">1 star</label>
                  </div>
                   end rating star */}
                   <StarRating />


                 </form>
                  


            </div>
            <div className='btnContainer'>
        <button className='btnPrimary'>

            <span className='bold'>YES</span>, I love NFT's
      </button>
               <button className='btnOutline'>
                     <span className='bold'>NO</span>, thanks
              </button>
    </div>
          </div> 
        </div>
    </div>
  )
}

export default Modal;
