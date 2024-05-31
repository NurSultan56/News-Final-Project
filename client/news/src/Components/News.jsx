import React from "react";
import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "../store/reducer";
import '../Styles/news.css'

function News() {
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchContent)
    }, [])

    let articles = useSelector((state)=>state.news.articles)
    let isLoading = useSelector((state)=>state.news.isLoading)
    let error = useSelector((state)=>state.news.error)
    let searchError = useSelector((state)=>state.news.searchError)

    if(isLoading) {
        return <h1>Loading....</h1>
    }

    if(error) {
        return <h1>Error</h1>
    }

    if(searchError) {
        return <h1>Search Error</h1>
    }

    return (
        <>
            <div className="news">
                <ul className="news_list">
                    {articles.map((item)=> 
                    (
                        <li className="news_list_item" key={item.publishedAt}>
                            <NewsItem {...item}/>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default React.memo(News)