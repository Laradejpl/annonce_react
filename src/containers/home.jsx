import React, { useState, useEffect } from 'react';
import logo from '../assets/pharelogo.png'
import Connected from './connected';
import Categories from './categories';
import {Link} from 'react-router-dom';
import '../home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import {getNbAds,getLastSixAds} from '../api/annonce';
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




const Jetboat = (props) => {

     const [totalAds, setTotalAds] = useState(0);
	   const [lastAds, setLastAds] = useState([]);
	   const [toggleMenu, setToggleMenu] = useState(false)
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
          <h1 className='titlehome'>Bienvenues sur le Phare!</h1>
          <p>Ici vous trouverez votre dernier bijoux nautique ,</p>
        </header>
		
        <div className='containr'>
                  <div className='totalAds'>{`Nous avons ${totalAds} Annonces`}</div>
                  <div className='searchBarhome'>
                    <input type="text" placeholder="Rechercher" className='searchBarInput'/>
                    <button className='searchBarButton'><BsSearch/></button>
                </div>

                <h5 className='lastAds_title'>Dernières Annonces</h5>
                <div className='divider'></div>

        </div>
  
        <section className='maincontent'>

		
			 <div className='contversionHomeaside'>

			             <aside className='profil_aside'>
			                     <Connected/>
			            </aside>
		                <aside className='profil_aside_cats'>
		                        <Categories/>
		                </aside> 
			 </div>

             <article className='MainArticleHome'>
              
              

                <section className='lastAds_secte'>
				   <div className='sectforcardss'>
					  {lastAds.map((ad,index)=>{
						return (
							<div className='ads-cardss'>
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
        <div id='bodys'>
        <div className='divider'></div>
                  <ReactCardSlider/>
                  
                </div>
			          </section>

               

             </article>
              





        </section>

    
          
      </main>
    );
    }
    export default Jetboat;