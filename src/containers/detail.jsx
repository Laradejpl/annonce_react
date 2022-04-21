import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {getOneAnnonce,getUserInfoByAnnonce,getLastTreeAdsByCat } from '../api/annonce';
import logo from '../assets/pharelogo.png'
import { BsSearch } from "react-icons/bs";
import { BsFillGeoFill,BsFillCreditCardFill,BsTelephoneFill } from "react-icons/bs";

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";
import moment from "moment";
import localization from 'moment/locale/fr';
import Modal from '../components/Modal';

moment.updateLocale('fr', localization);

const Detail = (props)=>{
    

    
    
  const id = props.params.id
  const [userId, setUserId] = useState(0);
  const [OneAd, setOneAd] = useState({});
  const [user, setUser] = useState({});
  const [treeAds, setTreeAds] = useState([]);
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [pictureUser, setPictureUser] = useState('');
  const [categoryAds, setCategoryAds] = useState('');
  const [img, setImg] = useState('');
  const  [img1, setImg1] = useState('');
  const  [img2, setImg2] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [openModal, setOpenModal] = useState(false);
  // pour les trois annonces similaires
    
    
    
    
    useEffect(() => {
        getOneAnnonce(id)
        .then(res => {
        
          setOneAd(res.result);
          setImg(res.result.imageUrl);
          setImg1(res.result.imageUrl1);
          setImg2(res.result.imageUrl2);
          setTitle(res.result.title);
          setDescription(res.result.description);
          setPrice(res.result.price);
          setCity(res.result.city);
          setCategoryAds(res.result.category);

        
          
        })
        .catch(err => {
            console.log(err)
        })


        getUserInfoByAnnonce(id,userId)
        .then(res => {
         
          setUser(res.result[0]);
          setLastName(res.result[0].lastName);
          setPhone(res.result[0].phone);
          setPictureUser(res.result[0].imageUser);
         
        })
        .catch(err => {
            console.log(err)
        })

        getLastTreeAdsByCat(categoryAds)
        .then(res => {
          console.log("LAST",res.ads);
         
          setTreeAds(res.ads);
         
        })
        .catch(err => {
            console.log(err)
        })


        
    },[])
    
   

  

    


    //affichage du posteur de l'annonce
    console.log("LES TROIS ANNONCESS",treeAds); 
   
    
    
  return (
    <main className="container">

      <Modal open={openModal} />
      <header className='detailheader'>
		           <img src={logo} alt="logo application" className="logohome"/>
                <div className='bg_detail_header'>
                     <h1 className='titledetailhead'> le Phare!</h1>
			               <p className='pfdetail'>Une aventure ,une passion ,la mer vous attend...</p>

              </div>
		
		  </header>

 <div className='detail'>
    <section className='sect_detail'>
    <article className='aside_photo_container'>

      <div className='ads-card-detail'>

          <CloudinaryContext cloudName="dehjoundt">
           <div className='ads-card-detail'>
 

           <Image publicId={img} className='imgsadetail'>
                      <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                  </div>
               </CloudinaryContext>
 
          </div>

          <div className='ads-card-detail'>

          <CloudinaryContext cloudName="dehjoundt">
           <div className='ads-card-detail'>
 
           <Image publicId={img1} className='imgsadetail'>
                      <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                  </div>
               </CloudinaryContext>
 
          </div>

          <div className='ads-card-detail'>

          <CloudinaryContext cloudName="dehjoundt">
           <div className='ads-card-detail'>
 
           <Image publicId={img2} className='imgsadetail'>
                      <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                  </div>
               </CloudinaryContext>
 
</div>

</article>

 <article className='article-detail'>
    <div className='detail_annonce'>
           <h3 className='titledet'>{title}</h3>
           <div className='divider'></div>
           <p className='descdetail'>{description}</p>
           <div className='divider'></div>
           <div className='iconNtext'>
               <BsFillCreditCardFill style={{marginRight:5}}/><p className='pricedetail'>{`Le prix: ${price}`} €</p>
           </div>
            <div className='divider'></div>
            <div className='iconNtext'>
                 <BsFillGeoFill style={{marginRight:5}}/><p className='citydetail'>{`l'annonce se situe: ${city}`}</p>
            </div>
            
    </div>
   </article>

    <article className='article-detail-user'>
       <div className='detail_annonce'>
       <h4>Publier par:</h4>
       <CloudinaryContext cloudName="dehjoundt">
           <div className='ads-card-detail-infouser'>
 

           <Image publicId={pictureUser} className='imginfouser'>
                      <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                  </div>
               </CloudinaryContext>

            <h3 className='titledet'>{lastName}</h3>
            <div className='iconNtext'>
            <BsTelephoneFill  style={{marginRight:5,fontSize:10}}/> <p className='descdetail'>{phone}</p>

            </div>
            <button onClick={()=> setOpenModal(true)}>Modal</button>
            
            <div className='divider'></div>

       </div>

    </article>

    </section>
  <div>

   <section className='sect_detail_adsim'>
   {/*
   
   <div className='sectforcards'>
					{treeAds.map((ad,index)=>{
						return (
							<div className='ads-card'>
					<Link to={"/detail/" + ad.id}>
					<CloudinaryContext cloudName="dehjoundt">
					 <div className='ads-card-image'>
					 <BsSearch  className='iconsearch'></BsSearch>
					
					 <Image publicId={ad.imageUrl1} className='imgsads'>
			                <Transformation quality="auto" fetchFormat="auto" />
			              </Image>
			            </div>
			         </CloudinaryContext>
					 </Link>

					 <span className='ads-card-date'>{moment(ad.creationTimestamp).format("YYYY-MM-DD")}</span><p className='ads-card-title'>{ad.title}</p>
								  <p className='ads-card-description'>{`${ad.description.substr(0, 80)} ...`}</p>
								  <p className='slider-card-price'>{`${ad.price} €`}</p>
								  <p className='ads-card-city'>{ad.city}</p>

                     </div>
						)
					}
					)}
				</div>
   
   */}



      
   </section>

  </div>
   </div>
   </main>
  );
}


export default Detail