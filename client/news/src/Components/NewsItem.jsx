import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToRead } from "../store/reducer";
import { deleteFromRead } from "../store/reducer";
import '../Styles/newsItem.css'
import { Link } from "react-router-dom";

export default function NewsItem({source, author, title, description, url, urlToImage, publishedAt, content} ) {
    
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

   

    let notClickedSavedArticles = useSelector(state=>state.news.notClickedSavedArticles)
    let [notClicked, setNotClicked] = useState(true)
    let [saved, setSaved] = useState(false)
    let [clickedButton, setClickedButton] = useState('article_item_add_to_list')
    let [buttonInnerText, setButtonInnerText] = useState('Add to Favourites')
    let dispatch = useDispatch()
    let savedArticles = useSelector(state=>state.news.savedArticles) 

    useEffect(()=>{
        if((savedArticles.findIndex(item=>item.publishedAt===publishedAt)) >=0 ) {
            setNotClicked(false)
            setClickedButton('article_item_added_to_list')
        }
        else {
            setNotClicked(true)
            setClickedButton('article_item_add_to_list')
        }
    },[savedArticles])

    useEffect(()=>{
        if(!notClickedSavedArticles) {
            handleFavourites()
        }
    }, [notClickedSavedArticles])

    function handleFavourites() {
        if(notClicked) {
            let object = 
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
        
            fetch('http://localhost:5000/addtofavourites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            setClickedButton('article_item_added_to_list')
            setButtonInnerText('In Favourites')
            dispatch(addToRead({
                source: source,
            author: author,
            title: title,
            description: description,
            url: url,
            urlToImage: urlToImage,
            publishedAt: publishedAt,
            content: content
            }))
        }
        else {
            deleteFavourite(publishedAt)
            dispatch(deleteFromRead({
                source: source,
            author: author,
            title: title,
            description: description,
            url: url,
            urlToImage: urlToImage,
            publishedAt: publishedAt,
            content: content
            }))
            setClickedButton('article_item_add_to_list')
            setButtonInnerText('Add to Favourites')
        }
        setNotClicked(!notClicked)
    }

    function deleteFavourite(publishedAt) {
        fetch(`http://localhost:5000/delete-favourites/${publishedAt}`, {
            method: 'DELETE'
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
                            <button onClick={handleFavourites} className={clickedButton} >{buttonInnerText}</button>
                            <Link to="/read"><button className="news_item_add_to_read" onClick={handleAdd}>READ</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}