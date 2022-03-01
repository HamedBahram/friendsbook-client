import { useState, useEffect, useCallback } from 'react'

const useFetch = URL => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const fetchData = useCallback(async URL => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch(URL)
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error)
            }

            setData(data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!URL) return
        fetchData(URL)
    }, [URL, fetchData])

    return { loading, data, error, setData }
}

export default useFetch
