import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/pharelogo.png'
import {getNbAds,getLastSixAds} from '../api/annonce';
import { config } from "../config";
import Connected from './connected';
import Categories from './categories';
import ReactCardSlider from './ReactCardSlider';
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

moment.updateLocale('fr', localization);




const Home = (props)=>{


	const [totalAds, setTotalAds] = useState(0);
	const [lastAds, setLastAds] = useState([]);

	 
	
	
	// le nombre total d'annonces
	useEffect(()=>{
		getNbAds()
		.then((res)=>{
			setTotalAds(res.result[0].total)
		})
		.catch((err)=>{
			console.log(err);
		})

		getLastSixAds()
		.then((res)=>{
			console.log(res);
			setLastAds(res.ads)
		}
		)
		.catch((err)=>{
			console.log(err);
		}
		)
		
			
	},[])

	


	return (
		<main className='main_home'>
		  <header className='homeheader'>
		  <img src={logo} alt="logo application" className="logohome"/>
			<h1 className='titlehome'>Bienvenue sur le Phare!</h1>
			<p>Ici vous trouverez votre dernier bijoux nautique ,</p>
		  </header>

		  <div className='totalAds'>{`Nous avons ${totalAds} Annonces`}</div>
		
		    <aside className='profil_aside'>
			   <Connected/>
			</aside>
		    <aside className='profil_aside_cat'>
		              <Categories/>
		    </aside>
	<div className='mainHome'>
				<h2 className='lastAds_title'>Dernières Annonces</h2>
	        <section className='lastAds_sect'>
				<div className='sectforcards'>
					{lastAds.map((ad,index)=>{
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
			</section>
			<section>
			
		  <div id='body'>
               <ReactCardSlider/>
          </div>
			</section>


    </div>
			
		</main>
	)
}


export default Home;