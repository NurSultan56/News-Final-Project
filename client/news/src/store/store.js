import { configureStore } from "@reduxjs/toolkit";
import newsSlice from './reducer.js'

const store = configureStore({
    reducer: {
        news: newsSlice
    }
})

export default store