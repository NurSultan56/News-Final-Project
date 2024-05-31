import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromRead, notClickedChange } from "../../store/reducer";
import { Link } from "react-router-dom";
import data from '../../../../../server/favourites.json'
import '../../Styles/favourites.css'

function Favourites() {
    let dispatch=useDispatch();

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


        function handleDeleteFavourite(id) {
            dispatch(deleteFromRead({publishedAt:id}))
        }
    
    

    if (data.length===0) {
        return (
            <>
                <h1>Nothing in favourites</h1>
            </>
        )
    } else {
        return (
            <>
            <ul className="news_item">
                {data.map((item)=>(
                    
                        <li key={item.publishedAt} className="card">
                        <div className="card__header">
                            <img src={item.urlToImage !== null ? item.urlToImage: "default-picture.png"} alt={item.title} className="article_thumbnail" />
                        </div>
                        <div className="card__body">
                            <h4>{item.title}</h4>
                        </div>
                        <div className="card__footer">
                            <div className="source__info">
                                <h5>{item.source.name}</h5>
                                <small>{item.publishedAt}</small>
                            </div>
                            <div className="add_to_read_container">
                                <button onClick={()=>{
                                    fetch(`http://localhost:5000/delete-favourites/${item.publishedAt}`, {
                                        method: 'DELETE'
                                    });
                                    handleDeleteFavourite(item.publishedAt)
                                }} >Delete</button>
                                <Link to="/read"><button className="news_item_add_to_read" onClick={handleAdd}>READ</button></Link>
                            </div>
                        </div>
                    </li>
                    
                ))}
            </ul>
            </>
        )
    }



    r
}

export default Favourites