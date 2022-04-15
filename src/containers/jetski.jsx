import React, { useState, useEffect } from 'react';
import jetskimg from '../assets/jetskii.png'
import Connected from './connected';
import Categories from './categories';
import {getAllAdsByCat} from '../api/annonce';
import {
    Image,
    Video,
    Transformation,
    CloudinaryContext
  } from "cloudinary-react";

import moment from "moment";
import '../card.css';

moment.locale('fr');


const Jetski = (props) => {



const [annonces, setAnnonces] = useState([]);




let category = props.category;
category="Jetski";
useEffect(()=>{
	getAllAdsByCat(category)
	.then((res)=>{
		console.log(res);
		setAnnonces(res.result)
		

	})
	.catch((err)=>{
		console.log(err);
	})
},[])
useEffect(()=>{
	
},[annonces])





    return (
        <main className='main_home'>
		  <header className='homeheader'>
		  <img src={jetskimg} alt="logo application" className="logohome"/>
			<h1 className='titlehome'>Jetski</h1>
			<p>Plus qu'un bateau une monture puissante</p>
		  </header>
		  <section className='sectforcards'>

		
			{annonces.map((annonce, index) => {
				return (


					<div className='ads-card'>
					<CloudinaryContext cloudName="dehjoundt">
					 <div className='ads-card-image'>
					 <Image publicId={annonce.imageUrl1} className='imgsads'>
			                <Transformation quality="auto" fetchFormat="auto" />
			              </Image>
			            </div>
			         </CloudinaryContext>

					 <span className='ads-card-date'>{moment(annonce.creationTimestamp).format("YYYY-MM-DD")}</span><p className='ads-card-title'>{annonce.title}</p>
								  <p className='ads-card-description'>{`${annonce.description.substr(0, 80)} ...`}</p>
								  <p className='slider-card-price'>{`${annonce.price} €`}</p>
								  <p className='ads-card-city'>{annonce.city}</p>

                     </div>



				
				)
			})}
		
			</section>
		
		    <aside className='profil_aside_jski'>
			   <Connected/>
			</aside>
		    <aside className='profil_aside_cat_jski'>
		              <Categories/>
		    </aside>
			
		</main>
    );
    }
    export default Jetski;