import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {categorys} from '../helpers/category';


const Categories = (props)=>{
    
        const [screenWidth, setScreenWidth] = useState(window.innerWidth)
        useEffect(() => {
	
            const changeWidth = () => {
              setScreenWidth(window.innerWidth);
            }
        
            window.addEventListener('resize', changeWidth)
        
            return () => {
                window.removeEventListener('resize', changeWidth)
            }
        
          }, [])


          return (
            <div className='connected_aside_cat'>
               <ul className="connected_ul">
                {categorys.map((category,index)=>{
                    return(
                        <div className='container_cat_inter'>
                        <li key={index} ><Link to={`/${category}`}  className="profile_link">{category}</Link></li>
                        {( screenWidth > 500) && (
                                   <div className='divider'></div>

                          )}

                        </div>
                        
                    )
                }
                )}
              </ul>

             </div>

        )

              
}
export default Categories;