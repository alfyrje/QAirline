import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"; // Import useParams
import 'react-multi-carousel/lib/styles.css';
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import './cityPage.css';

const CityPage = () => {
    const { city_name } = useParams();
    console.log("this is city_name", city_name);
    const [cityData, setCityData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/city_introduction/${city_name}/`); // Use city_name in the URL
                const data = await response.json();
                console.log(data); 
                setCityData(data);
            } catch (error) {
                console.error('Error fetching city introductions:', error);
            }
        };

        if (city_name) { 
            fetchData();
        }
    }, [city_name]); 

    return (
        <>
            <Header />
            {cityData && (

                <div style={{ width: '100%', height: '25rem', overflow: 'hidden' }}>
                <img
                    src={cityData.introduce_picture}
                    alt={`${cityData.city_name} Image`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
            </div>
           
            )}
            <div className='city_page_container'> 
                <div className = 'inside_container'>
                    <div className="artificial_padding"></div>
                    <h1 className='city_name'> {city_name}</h1>
                    {cityData && (
            <div className='city_introduction_container'>
                <div dangerouslySetInnerHTML={{
                    __html: cityData.city_introduction.replace(/\n/g, '<br>')
                }} />
            </div>
        )}
                </div>
                
            </div>

            <Footer />
        </>
    );
};

export default CityPage;
