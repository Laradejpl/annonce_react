import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { FaStar } from 'react-icons/fa';
import {getOneAnnonce,getUserInfoByAnnonce,getLastTreeAdsByCat } from '../api/annonce';
import {getAvgNotesByUser} from '../api/note';
import {getOneUser} from '../api/user';
import {
    Image,
    Video,
    Transformation,
    CloudinaryContext
  } from "cloudinary-react";
  import { BsFillGeoFill,BsTelephoneFill } from "react-icons/bs";
  import { IoIosApps,IoMdBoat } from "react-icons/io";
  


  

 

const Posteur = (props) => {
    
    const id = props.params.id
    const [posteur, setPosteur] = useState({});
    const [avisAffichage, setAvisAffichage] = useState(false);
    const [noteAvg, setNoteAvg] = useState(0);
   
  

   useEffect(() => {
    getOneUser(id).then(res => {
        setPosteur(res.result)
        console.log(res.result);
    })

    getAvgNotesByUser(id).then(res => {
        console.log( "LA NOTE MOYENNE" ,res.result[0].moyenne);
        setNoteAvg(res.result[0].moyenne);
    })


   } , [])



  return (
    <div>
   <main className='main_poster'>

   
    <h1 className='titlePosteur'>Le profil du vendeur</h1>
    <ul className='Linkposter'>
       <li><IoIosApps/>Avis</li>
        <li><IoMdBoat />Annonces</li>
    </ul>

    <div className='divider'></div>
    <main className='mainContainerPoster'>
       <section className='secondContainerPoster'>


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
                 <article className='containerInfo'>

                 </article>



       </section>


     </main>
    </main>
    </div>
  )
}

export default Posteur
