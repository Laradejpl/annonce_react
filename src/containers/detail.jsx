import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'

//import {getOneCoach, getAllLessonsByCoach} from '../api/lesson'
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
    

    const dispatch = useDispatch()
    
    const id = props.params.id
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [description, setDescription] = useState("");
	const [imgUrl, setImgUrl] = useState('')
	const [lessons, setLessons] = useState([]);
	const [msg, setMsg] = useState(null);
    
    useEffect(() => {
        
    },[])
    
  
    
    
    
   
}

export default Detail