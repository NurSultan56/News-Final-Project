import data from "../../../../../server/data.json";
import '../../Styles/readpage.css'

export default function ReadPage() {
  return (
    <>
      <div className="article_container">
        <div className="article_header">
          <a href={data.articles.url}><img src={data.articles.urlToImage} alt={data.articles.title} />  </a> 
        </div>
        <div className="article_body">
          <h1>{data.articles.title}</h1>
          <p>{data.articles.content}</p>
        </div>
        <div className="article_footer">
          <div className="source_info">
            <h3>{data.articles.source.name}</h3>
            <h4>{data.articles.author}</h4>
            <small>{data.articles.publishedAt}</small>
          </div>
          <div className="article_link">
            <a href={data.articles.url}>{data.articles.url}</a>
          </div>
        </div>
      </div>
    </>
  );
}
