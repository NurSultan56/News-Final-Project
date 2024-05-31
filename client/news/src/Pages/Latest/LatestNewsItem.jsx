import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToRead } from "../../store/reducer";
import { deleteFromRead } from "../../store/reducer";
import { Link } from "react-router-dom";

export default function LatestNewsItem({source, author, title, description, url, urlToImage, publishedAt, content} ) {
    
    function handleAdd() {
        let object = {
            articles: 
                {
                    source: source,
            author: author,
            title: title,
            description: description,
            url: url,
            urlToImage: urlToImage,
            publishedAt: publishedAt,
            content: content
                }
            
        }
        fetch('http://localhost:5000/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
    }

    return (
        <>
            <div className="news_item">
                <div className="card">
                    <div className="card__header">
                        <img src={urlToImage !== null ? urlToImage: "default-picture.png"} alt={title} className="article_thumbnail" />
                    </div>
                    <div className="card__body">
                        <h4>{title}</h4>
                    </div>
                    <div className="card__footer">
                        <div className="source__info">
                            <h5>{source.name}</h5>
                            <small>{publishedAt}</small>
                        </div>
                        <div className="add_to_read_container">
                            <Link to="/read"><button className="news_item_add_to_read" onClick={handleAdd}>READ</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}