import React from 'react'
import './NoteOne.css'
import "antd/dist/antd.css";
import { Input } from 'antd'

function NoteOneComponent(eventData) {
    const tapNoteOne = () => {
        eventData.clickHandler(true)
    }
    return (
        <>
            <div className='mainone'>
                <div className="singlenotelineone" onClick={tapNoteOne}>
                    <Input type="text" placeholder="Take a note..." />
                    <div className="singlebtnsone">
                        <button className="btnone"><i className="material-icons-outlined">check_box</i></button>
                        <button className="btnone"><i className="material-icons-outlined">brush</i></button>
                        <button className="btnone"><i className="material-icons-outlined">insert_photo</i></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteOneComponent
