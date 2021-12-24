import React from 'react'
import './Notes.css'
import ColorPopup from './../Colors/ColorPopperComponent'
import { putInArchive } from '../../services/UserService'

function NotesComponent({ status, notes, filterData, allNotes }) {

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
    return (
        <>
            {
                notes.map(data => {
                    return <div key={data.noteId} className='notesdata'>
                        <div className='allmainnotes' style={{ backgroundColor: data.theme }}>
                            <div className='noteheading'>
                                <p className='shownotetitle' style={{ paddingLeft: '12px' }}>{data.title}</p>
                                <button className="notepin"><i className="material-icons-outlined"
                                    style={{ fontSize: '19px' }}>push_pin</i></button>
                            </div>
                            <p style={{ paddingLeft: '12px' }}>{data.body}</p>
                            <div className='noteicons'>
                                <button className="hovericonsnote"><i className="material-icons-outlined"
                                    style={{ fontSize: '19px' }}>add_alert</i></button>
                                <button className="hovericonsnote"><i className="material-icons-outlined"
                                    style={{ fontSize: '19px' }}>person_add_alt</i></button>
                                <ColorPopup action='Update' noteId={data.noteId} allNotes={allNotes} />
                                <button className="hovericonsnote"><i className="material-icons-outlined"
                                    style={{ fontSize: '19px' }}>insert_photo</i></button>
                                <button className="hovericonsnote" onClick={() => putNoteInArchive(data.noteId)}><i className="material-icons-outlined"
                                    style={{ fontSize: '19px' }}>archive</i></button>
                                <button className="hovericonsnote"><i className="material-icons-outlined"
                                    style={{ fontSize: '19px' }}>more_vert</i></button>
                            </div>
                        </div>
                    </div>
                })
            }
        </>
    )
}

export default NotesComponent
