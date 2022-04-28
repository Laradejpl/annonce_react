import React, {useState,useEffect} from 'react';
import { useSelector } from "react-redux";
import { selectUser } from '../slices/userSlice';

import { getAllAdsByUser,deleteAd,getNbAds,getAllAds,getAllAdsByCat } from '../api/annonce';
import missing from '../assets/missing.png'
import { FaStar,FaMarker,FaWindowClose } from 'react-icons/fa';
import {Link} from 'react-router-dom';

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";
import { BsFillGeoFill,BsTelephoneFill } from "react-icons/bs";
import { IoIosApps,IoMdBoat } from "react-icons/io";
import '../Submenu.css'
import { categorys } from '../helpers/category'

import moment from "moment";
import localization from 'moment/locale/fr';
moment.updateLocale('fr', localization);




 const Admin = (props) => {

  const user = useSelector(selectUser)
  const [allAnnonces, setAllAnnonces] = useState([]);
  const [allAnnoncesByCat, setAllAnnoncesByCat] = useState([]);
  const [error, setError] = useState(false);
  const [categorie, setCategorie] = useState('');
  const [nbAds, setNbAds] = useState(0);

  useEffect(() => {
    getAllAds()
    .then((res)=>{
      setAllAnnonces(res.ads)
      setNbAds(allAnnonces.length)
      console.log("MES ANNONCES",res.ads);
    }
    )
    .catch((err)=>{
      console.log(err);
      setError(true);
    }
    )
   
   

  }, [])

  useEffect(() => {
    getAllAdsByCat(categorie)
    .then((res)=>{
      setAllAnnoncesByCat(res.result)
      console.log("MES ANNONCES PAR CAT",res.result);
      setNbAds(allAnnoncesByCat.length)
    }
    )
    .catch((err)=>{
      console.log(err);
      setError(true);
    }
    )
  }, [categorie])





	
  return (
    <main className='contAdmin'>
      

            <div className='contAdmin_content'>

                 <h1>Administration</h1>
                 <div className='divider'></div>
                <div className='contAdmin_content_title'>
                  <p>Bienvenue <span className='usernameAdmin'>{user.infos.firstName}</span> dans
                   votre espace d'administration</p>
                 </div>
            </div>



            <div className='nav_Sub_menu'>
        {/* sous menu comprenant des boutons : annonces,category,user,avis */}
      <ul className='Sbul_menu'>
      <div className='dropdown'>
        <li className='Sbli_menu'>
          Annonces
          <ul className='dropdown-content'>
           {categorys.map((category, index) => (
               <div>

              
             
               <li className='catSubli' key={index} onClick={()=>{
                 setCategorie(category)
                
    
                 console.log(category)
                 }}>
                    {category}


                </li>
                    <div className='divider_Admin'></div>


               </div>
               

                
            )
            
            
            )}


              
          </ul>



        </li>
        </div>
        <li className='Sbli_menu'>
        Utilisateurs
        </li>
        <li className='Sbli_menu'>
          Avis
        </li>
      </ul>

    </div>




             <div className='divider'></div>
           <div className='main_cont_admin'>


            <div className='cont_admin_annonces'>
              <h1 className='titleAdmin'> <IoMdBoat /> Les annonces</h1>
               <div className='divider_blanc'></div>
             
                <div className='cont_admin_annonces_content'>
                  <div className='cont_admin_annonces_content_title'>
                 
                   <p>Nombre d'annonces : <span className='nbAnnonces'>{nbAds}</span></p>
                     </div>
                    </div>
                  
                  <div className='divider_blanc'></div>
                  <article className='containe'>
                     {/* ont map pour avoir toutes les annonces du user sous form de tableau avec petite image le titre et description ,la date*/}
           
                     <div className='containerAnnonces_poster'>
              {allAnnonces.map(ads => (
             
             <div className='containerCardwEdition'>
              <div className='annonce_poster'>
               <div className='annonce_poster_img'>
                <Link to={`/detail/${ads.id}`}>
                <CloudinaryContext cloudName="dehjoundt">
                  <div className='ads-card-detail-infouser'>
                    <Image publicId={ads.imageUrl} className='imginfouser'>
                      <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                   </div>
                  </CloudinaryContext>
                </Link>
               </div>
              <div className='info_annonce_poster'>
                 <h5 className='title_annonce'>{`${ads.title.substr(0, 14)}`}</h5>
                 
                 <p className='ads-card-description'>{`${ads.description.substr(0, 80)} ...`}</p>
                  
                  <p className='ads-card-date_poster'>{moment(ads.creationTimestamp).format('LL')}</p>
                
               </div>  


               </div>
             
               <div className='EditionPalette' >
                <div className='iconEdt'>

                 <Link to={`/edityourads/${ads.id}`}><FaMarker /></Link>
                </div>
                <FaWindowClose className='iconEdt' onClick={()=>{
                 deleteAd(ads.id)
                  .then(res=>{
                    setAllAnnonces(allAnnonces.filter(annonce=>annonce.id !== ads.id))
                    console.log("DELETE",res);
                  }
                  )
                  .catch(err=>{
                    console.log(err);
                  }
                  )
                 
                 
                 
                 
                 }} />


               </div>
              </div>
           

              ))}
              
                    </div> 
              
                  </article>
           </div> 
                  
                    

        </div>

    </main>
	)
  
}
export default Admin;
