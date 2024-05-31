import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LatestNewsItem from "./LatestNewsItem";
export default function LatestNews() {

  let [latestNews, setLatestNews] = useState([{}]);
  const apiKey = "c43326b951fe4c0082d43d473a810aa6";
  useEffect(() => {
    const fetchPosts = async () => {
        const response = await fetch(`https://newsapi.org/v2/everything?q=t&apiKey=${apiKey}`)
        const posts = await response.json()
        setLatestNews(posts)
    }

    fetchPosts()

  }, []);
  console.log(latestNews['articles'])
  if (latestNews.status === "ok") {
    return (
      <>
        <div className="news">
                <ul className="news_list">
                    {latestNews.articles.map((item)=> 
                    (
                        <li className="news_list_item" key={item.publishedAt}>
                            <LatestNewsItem {...item}/>
                        </li>
                    ))}
                </ul>
            </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  }
}
