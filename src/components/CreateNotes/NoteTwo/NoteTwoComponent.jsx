import React, { useState, useRef, useEffect } from 'react'
import './NoteTwo.css'
import { Input } from 'antd'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { AddNote } from '../../../services/UserService'
import ColorPopup from './../../Colors/ColorPopperComponent'


function NoteTwoComponent({ clickHandler, allNotes }) {
    const [notedata, setnotedata] = useState({
        title: "",
        body: "",
        status: 0,
        theme: ""
    })

    const ref = useRef(null)
    useEffect(() => {
        ref.current.focus()
    }, [])

    const noteTitle = (e) => {
        setnotedata({ ...notedata, title: e.target.value })
    }
    const noteBody = (e) => {
        setnotedata({ ...notedata, body: e.target.value })
    }

    const handleClickAway = () => {
        clickHandler(false)
    }

    const AddNotes = () => {
        if (notedata) {
            AddNote(notedata).then((res) => {
                allNotes()
                console.log(res)
                console.log(notedata)
                clickHandler(false)
            }).catch((e) => {
                console.log(e)
            })
        } else {
            console.log('Empty Note Data!')
        }
    }
    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className="addnotestwo" style={{ backgroundColor: notedata.theme }}>
                    <div className="titlestwo">
                        <Input type="text" placeholder="Title" className="titletwo"
                            style={{ fontSize: '17px', color: 'rgb(41, 41, 41)', backgroundColor: 'transparent' }} onChange={noteTitle} />
                        <button className="optiontwo btntwo"><i className="material-icons-outlined" style={{ fontSize: '19px' }}>push_pin</i></button>
                    </div>
                    <Input ref={ref} type="text" name="body" style={{ fontSize: '14px', color: 'rgb(41, 41, 41)', backgroundColor: 'transparent' }}
                        placeholder="Take a note..." id="notebody" className="notebody" onChange={noteBody} />
                    <div className="btnstwo">
                        <div className="optionstwo">
                            <button className="optiontwo btntwo"><i className="material-icons-outlined"
                                style={{ fontSize: '19px' }}>add_alert</i></button>
                            <button className="optiontwo btntwo"><i className="material-icons-outlined"
                                style={{ fontSize: '19px' }}>person_add_alt</i></button>
                            <ColorPopup action='Create' notedata={notedata} setnotedata={setnotedata} />
                            <button className="optiontwo btntwo"><i className="material-icons-outlined"
                                style={{ fontSize: '19px' }}>insert_photo</i></button>
                            <button className="optiontwo btntwo"><i className="material-icons-outlined"
                                style={{ fontSize: '19px' }}>archive</i></button>
                            <button className="optiontwo btntwo"><i className="material-icons-outlined"
                                style={{ fontSize: '19px' }}>more_vert</i></button>
                            <button className="optiontwo btntwo"><i className="material-icons" style={{ fontSize: '19px' }}>undo</i></button>
                            <button className="optiontwo btntwo"><i className="material-icons" style={{ fontSize: '19px' }}>redo</i></button>
                        </div>
                        <div className="closetwo">
                            <button className="closebtntwo" onClick={AddNotes}>Close</button>
                        </div>
                    </div>
                </div>
            </ClickAwayListener>
        </>
    )
}

export default NoteTwoComponent
