import React from 'react';
import Moment from 'react-moment';


const Article = ({title, byline, url, _id, date, handleClick, buttonText, saved}) => (
    
    <div className="box">
        <p>Title: <em>{title}</em></p>
        <p><Moment format="MMMM Do YYYY, h:mm:ss a">{date}</Moment></p>
        <p>{url}</p>
        <p>{byline}</p>
        <button onClick={() => handleClick(_id)}>
            {buttonText}
            </button>
    </div>
);

export default Article;