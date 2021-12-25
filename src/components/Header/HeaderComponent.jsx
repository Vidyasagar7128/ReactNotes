import React from 'react'
import './Header.css'
import "antd/dist/antd.css";
import { Input, Image } from 'antd'
import Tooltip from '@mui/material/Tooltip';

function HeaderComponent({ sidebar, setSidebar }) {

    return (
        <>
            <div className="headerheader">
                <div className="leftheader">
                    <button className="btnheader" onClick={() => setSidebar(!sidebar)}><i className="material-icons">menu</i></button>
                    <Image src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" alt="note"
                        className="noteiconheader" style={{ cursor: 'pointer' }} preview={false} />
                    <span style={{ color: '#5F6371', fontSize: '22px', cursor: 'pointer' }} className='keep'>Keep</span>
                </div>
                <div className="centerheader">
                    <div className="searchheader">
                        <button className="btnheader"><i className="material-icons">search</i></button>
                        <Input type="text" name="search" id="search" className='searcharea' placeholder="Search" autoComplete="off" />
                    </div>
                </div>
                <div className="rightheader">
                    <div className="menuiconsleftheader">
                        <button className="btnheader"><i className="material-icons">refresh</i></button>
                        <button className="btnheader"><i className="material-icons-outlined">view_agenda</i></button>
                        <button className="btnheader"><i className="material-icons-outlined">settings</i></button>
                    </div>
                    <div className="menuiconsrightheader">
                        <button className="btnheader"><i className="material-icons">apps</i></button>

                        <Tooltip title='Profile'><button className="btnheader"><i className="material-icons" style={{ fontSize: '35px' }}>account_circle</i></button></Tooltip>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderComponent
