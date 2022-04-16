import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {getOneAnnonce,getUserInfoByAnnonce } from '../api/annonce';
import { useParams } from "react-router";
import {selectUser,connectUser} from '../slices/userSlice';
import {useDispatch,useSelector } from 'react-redux';
import { getOneUser } from '../api/user';
import logo from '../assets/pharelogo.png'

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";
import moment from 'moment';
import localization from 'moment/locale/fr';

moment.updateLocale('fr', localization);

const Detail = (props)=>{
    

    
    
  const id = props.params.id
  const [userId, setUserId] = useState(0);
  const [OneAd, setOneAd] = useState({});
  const [user, setUser] = useState({});
  const [img, setImg] = useState('');
  const  [img1, setImg1] = useState('');
  const  [img2, setImg2] = useState('');
    
    useEffect(() => {
        getOneAnnonce(id)
        .then(res => {
          console.log("ANNONCE",res);
          console.log( "ZZZZ",res.result.imageUrl);
          setOneAd(res.result);
          setImg(res.result.imageUrl);
          setImg1(res.result.imageUrl1);
          setImg2(res.result.imageUrl2);
          
           
            
          
        })
        .catch(err => {
            console.log(err)
        })
        
    },[])
    
    useEffect(() => {
        getUserInfoByAnnonce(id,userId)
        .then(res => {
          console.log("USER",res);
          setUser(res.result[0]);
         
        })
        .catch(err => {
            console.log(err)
        })
        
    },[])
    


    //affichage du posteur de l'annonce
    
    
  return (
    <main className="container">

      <header className='detailheader'>
		           <img src={logo} alt="logo application" className="logohome"/>
                <div className='bg_detail_header'>
                     <h1 className='titledetailhead'> le Phare!</h1>
			               <p className='pfdetail'>Une aventure ,une passion ,la mer vous attend...</p>

              </div>
		
		  </header>



        <div className='ads-card'>
					
					<CloudinaryContext cloudName="dehjoundt">
					 <div className='ads-card-imag'>
					 
					
					 <Image publicId={img} className='imgsad'>
			                <Transformation quality="auto" fetchFormat="auto" />
			              </Image>
			            </div>
			         </CloudinaryContext>
					 
          </div>

          <div className='ads-card'>
					
					<CloudinaryContext cloudName="dehjoundt">
					 <div className='ads-card-imag'>
					 
					
					 <Image publicId={img1} className='imgsad'>
			                <Transformation quality="auto" fetchFormat="auto" />
			              </Image>
			            </div>
			         </CloudinaryContext>
					 
          </div>

          <div className='ads-card'>
					
					<CloudinaryContext cloudName="dehjoundt">
					 <div className='ads-card-imag'>
					 
					
					 <Image publicId={img2} className='imgsad'>
			                <Transformation quality="auto" fetchFormat="auto" />
			              </Image>
			            </div>
			         </CloudinaryContext>
					 
          </div>



              

      




    </main>
   


  );

    
    
    
   
}

export default Detail