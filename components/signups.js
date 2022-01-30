import { useEffect, useState } from 'react'

// Redux
import { connect } from "react-redux"
import PropTypes from "prop-types"

function Signups(props) {
    const NONE = [false, false, false, false, false, false, false, false]
    const ALL = [true, true, true, true, true, true, true, true]
    const [signups, setSignups] = useState()
    const [page, setPage] = useState(0)
    const [selected, setSelected] = useState(NONE)
    const [all, setAll] = useState(false)
    const [update, setUpdate] = useState(false)
    const [deleting, setDeleting] = useState(false)

	Signups.propTypes = {
        waitlists: PropTypes.array
	}

    useEffect(() => {
        if (!props.waitlist) return 
        var page = []
        var signups = []
        for (const signup in props.waitlist.signups) {
            page.push(props.waitlist.signups[signup])

            if (page.length % 8 == 0) {
                signups.push(page)
                page = []
            }
        }
        signups.push(page)
        setSignups(signups)
        setSelected(NONE)
    }, [props.waitlist.signups])

    const list = (signups) => {
        var render = []
        for (let i = 0; i < 8; i++) {
            if (i < signups.length) {
                render.push(
                    <div className={"grid grid-cols-12 w-full py-6 px-12 border-b" + `${i % 8 == 7 ? 'x': ' border-slate-200'}`}>
                        <button className={'w-5 h-5 border border-sky-300 rounded-sm' + `${selected[i] ? ' bg-sky-200' : ''}`} onClick={() => select(i)}/>
                        <h2 className="col-span-1 text-gray-600">{signups[i].pos.N}</h2>
                        <h2 className="col-span-3 ml-8 text-gray-600">{signups[i].first_name.S} {signups[i].last_name.S}</h2>
                        <h2 className="col-span-3 text-gray-600">{signups[i].email.S}</h2>
                        <h2 className="col-span-3 text-gray-600">{format_date(signups[i].created_at.N)}</h2>
                        <h2 className="col-span-1 text-gray-600">{signups[i].refs.N}</h2>
                    </div>
                )
            }
            else {
                render.push(<h2 className="py-6 text-white">.</h2>)
            }
        }
        return render
    }

    const format_date = (ts) => {
        const date = new Date(parseInt(ts))
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }

    const select = (index) => {
        const temp = selected
        temp[index] = !temp[index]
        setSelected(temp)
        setUpdate(!update)
    }

    const handle_all = () => {
        if (all) {
            setSelected(NONE)            
        }
        else {
            setSelected(ALL)
        }
        setAll(!all)
    }

    const handle_delete = () => {
        var deletes = []
        setDeleting(true)
        for (const item in signups[page]) {
            if (selected[item]) {
                deletes.push(signups[page][item].email.S)
            }
        }
        props.delete(deletes).then(() => {
            setDeleting(false)
        })
    }

    const handle_csv = () => {
        const column_names = ['Position', 'First Name', 'Last Name', 'Email', 'Referrals', 'Joined At']
        var csv = "data:text/csv;charset=utf-8," + column_names.join(',') + '\n'
        props.waitlist.signups.forEach(signup => {
            var row = signup.pos.N + ','
            row += signup.first_name.S + ','
            row += signup.last_name.S + ','
            row += signup.email.S + ','
            row += signup.refs.N + ','
            row += signup.created_at.N + '\n'
            csv += row
        })
        var encodedURI = encodeURI(csv)
        window.open(encodedURI)
    }

    const handle_page = (next) => {
        if (next) {
            if (page + 1 != signups.length) {
                setPage(page + 1)
            }
        }
        else {
            if (page != 0) {
                setPage(page - 1)
            }
        }
        setSelected(NONE)
    }

	return (
        <div className="flex flex-col items-center justify-center w-full pt-6 bg-slate-50 rounded-md">
            <div className="w-4/5 bg-white rounded-xl">
                <div className="grid grid-cols-12 w-full py-4 px-12 border-b border-slate-200">
                    <button className={'w-5 h-5 border border-sky-300 rounded-sm' + `${all ? ' bg-sky-200' : ''}`} onClick={() => handle_all()}/>
                    <h2 className="col-span-1 text-gray-400">Position</h2>
                    <h2 className="col-span-3 ml-8 text-gray-400">Name</h2>
                    <h2 className="col-span-3 text-gray-400">Email</h2>
                    <h2 className="col-span-3 text-gray-400">Joined</h2>
                    <h2 className="col-span-1 text-gray-400">Referrals</h2>
                </div>
                {signups ? list(signups[page]) : <h1>here</h1>}
            </div>
            <div className="flex flex-row w-full justify-center mt-6">
                <button onClick={() => handle_page(false)} className="text-gray-400">&#x3c; Prev</button>
                <h2 className="text-gray-400 mx-10">Page {page + 1} of {signups ? signups.length : 0}</h2>
                <button onClick={() => handle_page(true)} className="text-gray-400">Next &#x3e;</button>              
            </div>
            <div className="flex flex-row w-4/5 justify-between mt-6 mb-6">
                <button onClick={() => handle_delete()} className="text-white bg-red-400 hover:bg-red-500 py-2 px-4 rounded-xl">Delete Selected</button>
                <button onClick={() => handle_csv()} className="text-white bg-sky-300 hover:bg-sky-400 py-2 px-4 rounded-xl">Export to CSV</button>              
            </div>            
        </div>
	)
}

const mapStateToProps = (state) => ({
    waitlists: state.user.waitlists
})

export default connect(mapStateToProps, { })(Signups)