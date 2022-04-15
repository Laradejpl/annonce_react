import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {categorys} from '../helpers/category';
//import {getNbAdsByCat} from '../api/annonce';
import axios from 'axios';
import { config } from "../config";


const Categories = (props)=>{
        const [brand, setBrand] = useState('');
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

  
           const getNbAdsByCat = async (category) => {
            try {
               const response = await axios.get(config.api_url + "/api/v1/nbrads/category/" + category);
               return response.data;
             } catch (error) {
               return error;
             }
            
        }

        getNbAdsByCat(brand).then(res => {
            console.log(res.result);
        });


          return (
            <div className='connected_aside_cat'>
               <ul className="connected_ul">
                {categorys.map((category,index)=>{
                    return(
                        <div className='container_cat_inter'>
                        <li key={index} >
                                  <button   className="profile_link" 

                                  onClick={()=>{
                                     

                                    console.log(brand);
                                    setBrand(category);

                                      
                                  }}
                                  
                                  >{category}</button>
                        </li>
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