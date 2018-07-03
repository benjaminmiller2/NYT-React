import React from 'react';
import Moment from 'react-moment';


const Article = ({title, url, _id, date, abstract, handleClick, buttonText, saved}) => (
    
    <div className="article">
        <p><b>Title: </b><a href={url} target="_blank"><em>{title}</em></a></p>
        <p><b>Published: </b><Moment format="MMMM Do YYYY, h:mm:ss a">{date}</Moment></p>
        <p><b>Snippet: </b>{abstract}</p>
        <button className="button" onClick={() => handleClick(_id)}>
            {buttonText}
            </button>
    </div>
);


export default Article;