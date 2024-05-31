import {useDispatch} from 'react-redux'
import { fetchContent } from '../store/reducer'
import { useState } from 'react'
import '../Styles/searchbar.css'

export default function Searchbar() {

    let dispatch = useDispatch()
    let [inputValue, setInputValue] = useState('')

    return (
        <>
            <div className="searchbar_container">
                <input type="text" name="search_news" onChange={(e)=> setInputValue(e.target.value)} />
                <button className='search_button' onClick={()=> dispatch(fetchContent(inputValue))} >Search</button>
            </div>
        </>
    )
}