import React, { useState } from 'react'
import './Notes.css'
import ColorPopup from './../Colors/ColorPopperComponent'
import { moveToTrash, putInArchive, deleteNote, pinUnPinNote } from '../../services/UserService'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NoteTwoComponent from '../CreateNotes/NoteTwo/NoteTwoComponent';

function NotesComponent({ location, notes, allNotes }) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: 'auto',
    };

    const [currentObj, setCurrentObj] = useState({})
    const [open, setOpen] = React.useState(false);
    const handleOpen = (obj) => {
        setOpen(true);
        setCurrentObj(obj)
    }
    const handleClose = () => setOpen(false);
    const [changeNote, setchangeNote] = useState(false)



    const clickHandler = (data) => {
        if (data) {
            setchangeNote(true)
        } else {
            setchangeNote(false)
        }
    }

    const putNoteInArchive = (id) => {
        putInArchive(id).then((res) => {
            console.log(res)
            allNotes()
        }).catch((e) => {
            console.log(e)
            console.log('Error!')
        })
        console.log(id)
    }
    const deleteNotes = (id) => {
        console.log(id)
        deleteNote(id).then((res) => {
            console.log(res)
            allNotes()
        }).catch((e) => {
            console.log(e)
        })
    }
    const restoreNotes = (id) => {
        moveToTrash(id).then((res) => {
            console.log(res)
            console.log(id)
            allNotes()
        }).catch((e) => {
            console.log(e)
        })
    }
    const pinUnPin = (id) => {
        pinUnPinNote(id).then((res) => {
            allNotes()
        }).catch((e) => {
            console.log(e)
        })
    }
    const removeNote = (data) => {
        console.log(data)
    }
    return (
        <>
            {
                notes.filter((e) => {
                    if (location === "/dashboard") {
                        if (e.status === 0) {
                            return e
                        }
                    } else if (location === "/archive") {
                        if (e.status === 1) {
                            return e
                        }
                    }
                    if (location === "/trash") {
                        if (e.status === 2) {
                            return e
                        }
                    }
                }).map(data => {
                    return <div key={data.noteId} className='notesdata'>
                        <div className='allmainnotes' style={{ backgroundColor: data.theme }}>
                            <div className='noteheading'>
                                <p className='shownotetitle' style={{ paddingLeft: '12px' }}>{data.title}</p>
                                <button className="notepin" onClick={() => pinUnPin(data.noteId)}>{data.pin === false ? <i className="material-icons-outlined"
                                    style={{ fontSize: '19px' }}>push_pin</i> : <i className="material-icons"
                                        style={{ fontSize: '19px' }}>push_pin</i>}</button>
                            </div>
                            <p onClick={() => handleOpen(data)} style={{ paddingLeft: '12px' }}>{data.body}</p>
                            {location !== "/trash" ? <div className='noteicons'>
                                <button className="hovericonsnote"><i className="material-icons-outlined"
                                    style={{ fontSize: '19px' }}>add_alert</i></button>
                                <button className="hovericonsnote"><i className="material-icons-outlined"
                                    style={{ fontSize: '19px' }}>person_add_alt</i></button>
                                <ColorPopup action='Update' noteId={data.noteId} allNotes={allNotes} />
                                <button className="hovericonsnote"><i className="material-icons-outlined"
                                    style={{ fontSize: '19px' }}>insert_photo</i></button>
                                <button className="hovericonsnote" onClick={() => putNoteInArchive(data.noteId)}>{location === "/archive"
                                    ?
                                    <i className="material-icons-outlined"
                                        style={{ fontSize: '19px' }}>unarchive</i>
                                    : <i className="material-icons-outlined"
                                        style={{ fontSize: '19px' }}>archive</i>}</button>
                                <button className="hovericonsnote" onClick={() => removeNote(data.noteId)}
                                ><i className="material-icons-outlined"
                                    style={{ fontSize: '19px' }}>more_vert</i></button>
                            </div> : <div className='noteiconstrash'>
                                <button className="hovericonsnotetrash" onClick={() => deleteNotes(data.noteId)}><i className="material-icons-outlined"
                                    style={{ fontSize: '19px' }}>delete_forever</i></button>
                                <button className="hovericonsnotetrash" onClick={() => restoreNotes(data.noteId)}><i className="material-icons-outlined"
                                    style={{ fontSize: '19px' }}>restore_from_trash</i></button>
                            </div>
                            }
                        </div>

                    </div>
                })
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <NoteTwoComponent reason="Update" currentNote={currentObj} handleClose={handleClose} clickHandler={clickHandler} allNotesFromNotes={allNotes} />
                </Box>
            </Modal>
        </>
    )
}

export default NotesComponent
