import axios from 'axios'
import { toast } from 'react-toastify'
import { sha256 } from 'js-sha256'
import Router from 'next/router'
import {
    LOGGED_IN,
    SIGNED_UP,
    WAITLISTS,
    SIGNUPS,
    DELETED
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

function hash(password) {
    return sha256(password)
}


export const notify = (type, msg) => {
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


export const check_cookie = () => (dispatch) => {
    const config = getConfig()

    axios.get('http://127.0.0.1:5000/api/user', config)
        .then(res => {
            dispatch({
                type: LOGGED_IN,
                payload: res.data.user
            })
        })
}


export const login = (email, password) => (dispatch) => {
    const pass = hash(password)
    const config = getConfig({email, password: pass})

    axios.get('http://127.0.0.1:5000/api/user/login', config)
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


export const createWaitlist = (name, ref_num, origin_urls) => {
    const config = getConfig()
    const body = JSON.stringify({ name, origin_urls, ref_num })

    axios.post('http://127.0.0.1:5000/api/waitlist/new', body, config)
        .then(() => {
            Router.push('/dashboard')
        }).catch((err) => {
            notify("error", err.response.data.msg || "Error getting waitlists")
            return true
        })
}


export const getSignups = (wl_id) => (dispatch) => {
    const config = getConfig()

    axios.get('http://127.0.0.1:5000/api/signup/' + wl_id, config)
        .then(res => {
            dispatch({
                type: SIGNUPS,
                payload: {data: res.data, wl_id}
            })
        }).catch((err) => {
            notify("error", err.response.data.msg || "Error getting signups")
        })
}


export const deleteSignups = (emails, wl_id) => (dispatch) => new Promise((myResolve, myReject) => {
    const config = getConfig()
    const body = JSON.stringify({ emails, wl_id })

    axios.post('http://127.0.0.1:5000/api/signup/delete', body, config)
        .then((res) => {
            dispatch({
                type: DELETED,
                payload: {signups: res.data.signups, wl_id}
            })
            myResolve()
        }).catch((err) => {
            if (err.response.status == 400) {
                notify("error", err.response.data.msg || "Error deleting signups")
            }
            else {
                notify("error", err.response.data.msg || "Error deleting signups")
                dispatch({
                    type: DELETED,
                    payload: {signups: err.response.data.signups, wl_id}
                })
            }            
            myReject()
        })
})
