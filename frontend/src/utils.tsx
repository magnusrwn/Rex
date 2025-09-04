// this file is messy.

import axios from "axios";
import type { AxiosInstance } from "axios";


// TYPES (interfaces, etc...)
type Success<T> = { data: T; error: null }
type Failure<E> = { data: null; error: E }
type Result<T, E = Error> = Success<T> | Failure<E>

interface


// FUNCS
export async function tryCatch<T, E = Error>(
    promise: Promise<T>,
): Promise<Result<T, E>> {
    try {
        const data = await promise
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err as E }
    }
}

export const axiosAuthed = ():AxiosInstance => {
    const token = sessionStorage.getItem('sessionToken')
    if (!token) {
        throw new Error("err: NO_SESSION_TOKEN")
    }
    return (
        axios.create({
            baseURL: 'https://your-backend.com/api', // LOCAL
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    )
}
