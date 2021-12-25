import React, { useState, useRef, useEffect } from 'react'
import './NoteTwo.css'
import { Input } from 'antd'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { AddNote, pinUnPinNote, UpdateNote } from '../../../services/UserService'
import ColorPopup from './../../Colors/ColorPopperComponent'


function NoteTwoComponent({ reason, clickHandler, allNotes, allNotesFromNotes, currentNote, handleClose }) {
    const [notedata, setnotedata] = useState({
        title: "",
        body: "",
        status: 0,
        theme: ""
    })
    const [currentNoteData, setCurrentNoteData] = useState(currentNote)

    const ref = useRef(null)
    useEffect(() => {
        ref.current.focus()
        console.log(reason)
        console.log(currentNote)
    }, [])

    const noteTitle = (e) => {
        setnotedata({ ...notedata, title: e.target.value })
    }
    const noteBody = (e) => {
        setnotedata({ ...notedata, body: e.target.value })
    }

    const handleClickAway = () => {
        if (reason === "Create") {
            clickHandler(false)
        } else if (reason === "Update") {
            clickHandler(false)
        }
    }

    const sendData = () => {
        if (reason === "Create") {
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
        else if (reason === "Update") {
            console.log('Updating...')
            handleClose()
        }
    }
    const pinUnPinNotes = (id) => {
        pinUnPinNote(id).then(() => {
            allNotesFromNotes()
            setCurrentNoteData({ ...currentNoteData, pin: !currentNoteData.pin })

        }).catch((e) => {
            console.log(e)
        })
        console.log(id)
    }

    const UpdateNotes = () => {
        UpdateNote(currentNoteData).then((res) => {
            console.log(res)
            allNotesFromNotes()
            handleClose()
        }).catch((e) => {
            console.log(e)
        })
        console.log('Updating')
        console.log(currentNoteData)
    }

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className="addnotestwo" style={{ backgroundColor: reason === "Update" ? currentNote.theme : notedata.theme, width: reason === "Update" ? '100%' : null, height: reason === "Update" ? '100%' : null }}>
                    <div className="titlestwo">
                        {reason === "Create" ? <Input type="text" placeholder="Title" className="titletwo"
                            style={{ fontSize: '17px', color: 'rgb(41, 41, 41)', backgroundColor: 'transparent' }} onChange={noteTitle} /> :
                            <Input value={currentNoteData.title} type="text" placeholder="Title" className="titletwo"
                                style={{ fontSize: '17px', color: 'rgb(41, 41, 41)', backgroundColor: 'transparent' }} onChange={(e) => setCurrentNoteData({ ...currentNoteData, title: e.target.value })} />
                        }
                        <button className="optiontwo btntwo" onClick={() => pinUnPinNotes(currentNoteData.noteId)}>
                            {reason === "Update" ? currentNoteData.pin ? <i className="material-icons" style={{ fontSize: '19px' }}>push_pin</i> :
                                <i className="material-icons-outlined" style={{ fontSize: '19px' }}>push_pin</i> :
                                <i className="material-icons" style={{ fontSize: '19px' }}>push_pin</i>}
                        </button>
                    </div>
                    {reason === "Create" ? <Input ref={ref} type="text" name="body" style={{ fontSize: '14px', color: 'rgb(41, 41, 41)', backgroundColor: 'transparent' }}
                        placeholder="Take a note..." id="notebody" className="notebody" onChange={noteBody} /> :
                        <Input value={currentNoteData.body} ref={ref} type="text" name="body" style={{ fontSize: '14px', color: 'rgb(41, 41, 41)', backgroundColor: 'transparent' }}
                            placeholder="Take a note..." id="notebody" className="notebody" onChange={(e) => setCurrentNoteData({ ...currentNoteData, body: e.target.value })} />
                    }
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
                            {reason === "Update" ? <button className="closebtntwo" onClick={UpdateNotes}>Close</button> :
                                <button className="closebtntwo" onClick={sendData}>Close</button>
                            }
                        </div>
                    </div>
                </div>
            </ClickAwayListener>
        </>
    )
}

export default NoteTwoComponent
