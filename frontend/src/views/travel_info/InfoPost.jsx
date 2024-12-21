import React, { useState, useEffect } from 'react';
import Header from '../partials/Header';
import { useParams } from 'react-router-dom'; 
import Footer from '../partials/Footer';
import ImageSeparator from '../partials/ImageSeparator';

const InfoPost = () => { // Destructure title prop properly
    const [htmlContent, setHtmlContent] = useState('');
    const [error, setError] = useState('');
    const { title } = useParams();


    useEffect(() => {
        if (title) {
            fetchTravelInfo();
            console.log("mewo mewo meow mewo", title);
        }
    }, [title]); 

    const fetchTravelInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8000/travel_info/${title}/`);
            if (!response.ok) {
                throw new Error('Travel info not found');
            }
            const data = await response.json();
            setHtmlContent(data.html_content);
            setError('');
        } catch (err) {
            setError(err.message);
            setHtmlContent('');
        }
    };

    return (
        <>
            <Header />
            <ImageSeparator imagePath="/images/gigapixel-bg3(1).png"/>
            <div className="info-post-container">
                {error && <div className="error">{error}</div>}
                {htmlContent && (
                    <div 
                        className="content"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                )}
            </div>
            <Footer />
        </>
    );
};

export default InfoPost;