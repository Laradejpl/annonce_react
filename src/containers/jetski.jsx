import React from "react";
import jetskimg from '../assets/jetskii.png'
import Connected from './connected';
import Categories from './categories';


const Jetski = () => {



    return (
        <main className='main_home'>
		  <header className='homeheader'>
		  <img src={jetskimg} alt="logo application" className="logohome"/>
			<h1 className='titlehome'>Bienvenue sur le Phare!</h1>
			<p>Ici vous trouverez votre dernier bijoux nautique ,</p>
		  </header>
		
		    <aside className='profil_aside'>
			   <Connected/>
			</aside>
		    <aside className='profil_aside_cat'>
		              <Categories/>
		    </aside>
			<section>
			
			  
			</section>
		</main>
    );
    }
    export default Jetski;