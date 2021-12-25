import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import HeaderComponent from '../../components/Header/HeaderComponent'
import NoteOneComponent from '../../components/CreateNotes/NoteOne/NoteOneComponent'
import MenuComponent from '../../components/SideMenu/MenuComponent'
import NoteTwoComponent from '../../components/CreateNotes/NoteTwo/NoteTwoComponent'
import NotesComponent from '../../components/Notes/NotesComponent'
import { getAllNotes } from '../../services/UserService'
import { useLocation } from "react-router-dom";


function DashboardPage() {
    const [changeNote, setchangeNote] = useState(false)
    const [notes, setnotes] = useState([])
    const [sidebar, setSidebar] = useState(false)
    let location = useLocation();

    useEffect(() => {
        allNotes()
        console.log('useEffect')
    }, [])
    console.log(location.pathname)
    const allNotes = () => {
        getAllNotes().then((response) => {
            setnotes(response.data.data)
            // var filterData = response.data.data.filter((e) => e.status == 1)
            // console.log('Filter Data: ', filterData)
        }).catch((e) => {
            console.log(e)
        })
    }

    const clickHandler = (data) => {
        if (data) {
            setchangeNote(true)
        } else {
            setchangeNote(false)
        }
    }

    return (
        <>
            <div className='eventdash'>
                <div className='headerdash' style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '1' }}>
                    <HeaderComponent sidebar={sidebar} setSidebar={setSidebar} />
                </div>
                <div className='maindash'>
                    <div className='leftdash'>
                        <MenuComponent sidebar={sidebar} />
                    </div>
                    <div className='rightdash'>
                        {
                            changeNote ? location.pathname === "/dashboard" ? <NoteTwoComponent reason="Create" clickHandler={clickHandler} allNotes={allNotes} /> : null : location.pathname === "/dashboard" ? <NoteOneComponent clickHandler={clickHandler} /> : null
                        }
                        <div className='allnotesdash'>
                            <div className='notesdash' style={{ flexWrap: 'wrap', paddingRight: '30px' }}>
                                <NotesComponent location={location.pathname} notes={notes} allNotes={allNotes} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardPage
