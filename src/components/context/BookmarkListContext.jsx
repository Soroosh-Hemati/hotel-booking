import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import useFetch from '../../hooks/useFetch'
import toast from 'react-hot-toast';
import axios from 'axios';

const BookmarkContext = createContext();
const BASE_URL = 'http://localhost:5000';

function BookmarkListProvider({ children }) {
    const [currentBookmark, setCurrentBookmark] = useState(null);
    const [bookmarks, setBookmarks] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchAllBookmarks() {
            setIsLoading(true)
            try {
                const { data } = await axios.get(`${BASE_URL}/bookmarks`)
                setBookmarks(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setIsLoading(false);
            }
        }
        fetchAllBookmarks();
    }, [])

    async function getBookmark(id) {
        setIsLoading(true)
        try {
            const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`)
            setCurrentBookmark(data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false);
        }
    }
    async function createBookmark(newBookmark) {
        setIsLoading(true)
        try {
            const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark)
            console.log(data);
            setCurrentBookmark(data)
            setBookmarks((prev) => [...prev, data])
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <BookmarkContext.Provider value={{ isLoading, bookmarks, currentBookmark, getBookmark, isLoading, createBookmark }}>
            {children}
        </BookmarkContext.Provider>
    )
}

export default BookmarkListProvider

export function useBookmark() {
    return useContext(BookmarkContext)
}