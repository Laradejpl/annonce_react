import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { FaStar } from 'react-icons/fa';
import {getAllAdsByUser } from '../api/annonce';
import {getAvgNotesByUser,getAllNotesByUser} from '../api/note';
import {getOneUser} from '../api/user';
import {
    Image,
    Video,
    Transformation,
    CloudinaryContext
  } from "cloudinary-react";
  import { BsFillGeoFill,BsTelephoneFill } from "react-icons/bs";
  import { IoIosApps,IoMdBoat } from "react-icons/io";

import Fade from 'react-reveal/Fade';
import moment from "moment";
import localization from 'moment/locale/fr';

moment.updateLocale('fr', localization);


  

 

const Posteur = (props) => {
    
    const id = props.params.id
    const [posteur, setPosteur] = useState({});
    const [avisAffichage, setAvisAffichage] = useState(false);
    const [noteAvg, setNoteAvg] = useState(0);
    const [adsByUser, setAdsByUser] = useState([]);
    const [titleValue, setTitleValue] = useState("Toutes ces annonces");
    const [allNotes, setAllNotes] = useState([]);
    
   
  

   useEffect(() => {
    getOneUser(id).then(res => {
        setPosteur(res.result)
        console.log(res.result);
    })

    getAvgNotesByUser(id).then(res => {
        console.log( "LA NOTE MOYENNE" ,res.result[0].moyenne);
        setNoteAvg(res.result[0].moyenne);
    })

    getAllAdsByUser(id).then(res => {
        setAdsByUser(res.result);
        console.log(res.result);
    })

    


   } , [])


   useEffect(() => {
  
  }, [])

   const loadAvis = () => {
     

     getAllNotesByUser(id).then(res => {
      console.log("LES AVIS",res.result);
      setAllNotes(res.result);
      setAvisAffichage(true);
     
  })

     
     setTitleValue("Les avis");
     
     

   }
   const loadAnnonces = () => {
    setAvisAffichage(false);
    setTitleValue("Toutes ces annonces");
  }

   

  return (
    <div>
   <main className='main_poster'>

   
    <h1 className='titlePosteur'>Le profil du vendeur</h1>
    <ul className='Linkposter'>
       <li onClick={loadAvis}><IoIosApps/>Avis</li>
        <li onClick={loadAnnonces}><IoMdBoat />Annonces</li>
    </ul>

    <div className='divider'></div>
    <main className='mainContainerPoster'>
       <section className='secondContainerPoster'>

       <Fade left>
                 <article className='containerImageAndInfoUser'>

                 <CloudinaryContext cloudName="dehjoundt">
            <div className='ads-card-detail-infouser'>
 

           <Image publicId={posteur.imageUser} className='imginfouser'>
                      <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
               {/*
               <p>{`NOTE ${parseInt(noteAvg)} | 5 ` }</p>

               */} 
                <div>
            {[...Array(5)].map((star,i) => {
            const ratingValue = i + 1; 
            return (
                <label>
                   
                    <FaStar color={ratingValue <= (noteAvg) ? "#ffc107" : "#e4e5e9"}
                      className="star"
                      size={20}
                     
                       />
               
                </label>
                

                
            );
        })}
            </div>
                  </div>
               </CloudinaryContext>

               <div className="info_poster_cont">

                <h3 className='nameUser'>{posteur.lastName}|{posteur.firstName}</h3>
                <p className='infoUser'><BsFillGeoFill />{posteur.city}</p>
                <p><BsTelephoneFill /> {posteur.phone}</p>
                            
               </div>


                 </article>
                  </Fade>
                  <h2 id="titreAvisAnnonces" >{titleValue}</h2>
                  <div className='divider'></div> 
                 <article className='containerInfo'>
                 {/* ont map pour avoir toutes les annonces du user sous form de tableau avec petite image le titre et description ,la date*/}
                  {!avisAffichage ? (
                <div className='containerAnnonces_poster'>
                  {adsByUser.map(annonce => (
                 <Fade right>
                <div className='annonce_poster'>
                   <div className='annonce_poster_img'>
                    <Link to={`/detail/${annonce.id}`}>
                    <CloudinaryContext cloudName="dehjoundt">
                      <div className='ads-card-detail-infouser'>
                        <Image publicId={annonce.imageUrl} className='imginfouser'>
                          <Transformation quality="auto" fetchFormat="auto" />
                        </Image>
                       </div>
                      </CloudinaryContext>
                    </Link>
                   </div>
                  <div className='info_annonce_poster'>
                     <h5 className='title_annonce'>{`${annonce.title.substr(0, 14)}`}</h5>
                     
                     <p className='ads-card-description'>{`${annonce.description.substr(0, 80)} ...`}</p>
                      
                      <p className='ads-card-date_poster'>{moment(annonce.creationTimestamp).format('LL')}</p>
                    
                   </div>  


                  </div>
                </Fade>

                  ))}
                  
                  </div>) : (
                    <div className='containerAnnonces_poster'>
                  {allNotes.map(avis => (
                 <Fade right>
                <div className='annonce_poster'>
                   <div className='annonce_poster_img'>
                    
                    <CloudinaryContext cloudName="dehjoundt">
                      <div className='ads-card-detail-infouser'>
                        <Image publicId={avis.imageUser} className='imginfouser'>
                          <Transformation quality="auto" fetchFormat="auto" />
                        </Image>
                        <h5>{avis.lastName}</h5>
                       </div>
                      </CloudinaryContext>
                   
                   </div>
                  <div className='info_annonce_poster'>
                     <h5 className='title_annonce'>{`${avis.title_note.substr(0, 14)}`}</h5>
                     <p className='ads-card-description'>{`${avis.description.substr(0, 80)} ...`}</p>
                     <p className='ads-card-date_poster'>{`Note:${avis.note}/5`}</p>
                      
                     
                    
                   </div>  


                  </div>
                </Fade>

                  ))}
                  
                  </div>

                  )}
                  
                 </article>



       </section>


     </main>
    </main>
    </div>
  )
}

export default Posteur
