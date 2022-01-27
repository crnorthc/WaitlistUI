import axios from 'axios'
import { toast } from 'react-toastify'
import { sha256 } from 'js-sha256'
import {
    LOGGED_IN,
    SIGNED_UP,
    WAITLISTS
} from "../types"

function getConfig(params={}) {
    return {
        withCredentials: true,
        params: params,
        headers: {
            'Content-Type': 'application/json'
        }
    }
}

function notify(type, msg) {
    const options = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined
    }

    if (type == 'info') {
        toast.info(msg, options)
    }

    if (type == 'warning') {
        toast.warning(msg, options)
    }

    if (type == "success") {
        toast.success(msg, options)
    }

    if (type == "error") {
        toast.error(msg, options)
    }
}

function hash(password) {
    return sha256(password)
}


export const login = (email, password) => (dispatch) => {
    const pass = hash(password)
    const config = getConfig({email, password: pass})

    axios.get('http://127.0.0.1:5000/api/user', config)
        .then(res => {
            dispatch({
                type: LOGGED_IN,
                payload: res.data.user
            })
        }).catch((err) => {
            notify("error", err.response.data.msg || "Login Failed")
        })
}


export const signup = (email, password, first_name, last_name) => (dispatch) => {
    const config = getConfig()
    const body = JSON.stringify({ email, password: hash(password), first_name, last_name })

    axios.post('http://127.0.0.1:5000/api/user', body, config)
        .then(res => {
            dispatch({
                type: SIGNED_UP,
                payload: res.data.user
            })
        }).catch(err => {
            notify("error", err.response.data.msg || "Signup Failed")
        })
}


export const getWaitlists = () => (dispatch) => {
    const config = getConfig()

    axios.get('http://127.0.0.1:5000/api/waitlist', config)
        .then(res => {
            dispatch({
                type: WAITLISTS,
                payload: res.data.waitlists
            })
        }).catch((err) => {
            notify("error", err.response.data.msg || "Error getting waitlists")
        })
}