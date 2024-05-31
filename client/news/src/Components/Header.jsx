import {Link} from 'react-router-dom'
import '../Styles/header.css'

export default function Header() {

    return (
        <>
        <div className="header">
            <Link to="/"><h1>News Search</h1></Link>
            <Link to="/latest"><h1>Latest</h1></Link>
            <Link to="/favourites"><h1>Favourites</h1></Link>
        </div>
        </>
    )
}