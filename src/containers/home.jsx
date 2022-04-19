import React, { useState, useEffect } from 'react';
import logo from '../assets/pharelogo.png'
import Connected from './connected';
import Categories from './categories';
import {categorys} from '../helpers/category';

import {Link} from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import '../home.css';
import '../temporary.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import {getNbAds,getLastSixAds,getAdsByDistance} from '../api/annonce';
import axios from 'axios';
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
const API_KEY = 'AIzaSyDnxU0AwNwyTGSo1RAcsa4Dr27Xt0ngbaI';



const Jetboat = (props) => {


	const defaultProps = {
		center: {
		  lat: 49.8865792,
		  lng: 2.359296
		},
		zoom: 13
	  };

       const [totalAds, setTotalAds] = useState(0);
	   const [lastAds, setLastAds] = useState([]);
	   const [toggleMenu, setToggleMenu] = useState(false)
	   const [position, setPosition] = useState(defaultProps.center)
	   const [zoom, setZoom] = useState(defaultProps.zoom)
	   const [address, setAddress] = useState("")
	   const [radius, setRadius] = useState(5)
	   const [adsLocalized, setAdsLocalized] = useState([])
	   const [category, setCategory] = useState("")
	   const [error, setError] = useState(null)
       const [screenWidth, setScreenWidth] = useState(window.innerWidth)



	   useEffect(()=>{
        mygeoloc()
    }, [position])
    
    const mygeoloc = ()=>{
        console.log("coucou")
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
			 	
			 	let coords = {lat: position.coords.latitude, lng: position.coords.longitude};
			 	console.log(coords)
			 	setPosition(coords)
			 	
            })
            
        }else{
            alert("Vous n'êtes pas géolocalisé")
        }
    }
    
    const onSubmitForm = ()=>{
		
        axios.get('https://nominatim.openstreetmap.org/search?q='+address+'&format=geocodejson')
        .then((res)=>{
            if(res.data.features.length === 0) {
                setError("Address inexistante")
            }else{
                let lat = res.data.features[0].geometry.coordinates[1];
		        let lng = res.data.features[0].geometry.coordinates[0];
		        
		        let coords = {
		        	lat: lat,
		        	lng: lng
		        }
		        
		        let deg = radius * 0.009
		        
		        let lat_min = lat - deg; // -1.7
	        	let lat_max = lat + deg; // -1.5
	        	let long_max = lng + (deg / Math.cos( lat * (Math.PI/180)));
	        	let long_min = lng - (deg / Math.cos(lat*Math.PI/180))
	        	
	        	let data = {
					  min_lat: lat_min,
					  max_lat: lat_max,
					  min_lng: long_min,
					  max_lng: long_max,
					  category: category
					}
					
				getAdsByDistance(data)
				.then((res)=>{
				    setAdsLocalized(res.result)
				    setPosition(coords)
				    setZoom(12)
				    console.log(adsLocalized)
				})
				.catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log(err))
		
    }
    
    const createMarkers = ()=>{
        return adsLocalized.map((locals)=>{
            return (
                <div
		          	className="coachMarker"
		          	lat={locals.lat}
				    lng={locals.lng}
				    text="My Marker"
		         >	
		        	<CloudinaryContext cloudName="dehjoundt">
			            <div>
			              <Image publicId={locals.imageUrl}  id ="MarkerImage">
			                <Transformation quality="auto" fetchFormat="auto" />
			              </Image>
			            </div>
			         </CloudinaryContext>
		          	<Link to={"/detail/"+locals.id}>{locals.title} </Link>
			     </div>
                
            )
        })
    }
	
	
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
				  <form
				className="c-form"
				onSubmit={(e)=>{
					e.preventDefault();
					onSubmitForm()
				}}
			>
				<input 
					type="text" 
					placeholder="Tapez un adresse"
					onChange={(e)=>{
						setAddress(e.currentTarget.value)
					}}
				/>
				<p>Choisissez une categorie : </p>
				<select
					onChange={(e)=>{
						setCategory(e.currentTarget.value)
					}}
				>
					{
						categorys.map((category, index)=>{
							return (<option key={index} value={category}>
										{category}
									</option>)
						})
					}
				</select>
				<p>Quelle distance (km) : </p>
				<select
					onChange={(e)=>{
						setRadius(e.currentTarget.value)
					}}
				>
					{
						[...Array(20).keys()].map((num, index)=>{
							return (<option key={index} value={num+1}>
										{num+1}
									</option>)
						})
					}
				</select>
				<input type="submit" name="Chercher"/>
			     </form> 
                </div>

				<div id='mapSearch' >
		        <GoogleMapReact
		          bootstrapURLKeys={{ key: API_KEY }}
		          center={position}
		          zoom={zoom}
		        >
		        	<div
    		            lat={position.lat}
    		            lng={position.lng}
    		            text="My Marker"
		            ><img src="http://www.robotwoods.com/dev/misc/bluecircle.png" alt="..."/>
		            </div>
		         {createMarkers()}
		        </GoogleMapReact>
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