import * as React from 'react';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import './Colors.css'
import { changeColor } from '../../services/UserService';

export default function ColorPopup({ action, notedata, setnotedata, noteId, allNotes }) {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const colors = ['white', '#CDDEFF', '#F9C5D5', '#97BFB4', '#FFFCDC', '#28FFBF', '#F5ABC9', '#FFBCBC', '#B6C9F0', '#C8C2BC', '#C1FFD7', '#FFCE45']

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    const pickColor = (e) => {
        console.log('Color:', e.target.id)
        if (action === "Update") {
            changeColor(noteId, e.target.id).then((res) => {
                allNotes()
                console.log(res)
            }).catch((e) => {
                console.log(e)
            })
            console.log(noteId)
            console.log('ColorPopper', action)
        }
        else {
            setnotedata({ ...notedata, theme: e.target.id })
            console.log('ColorPopper', action)
        }
    }

    return (
        <div>
            <button aria-describedby={id} type="button" onClick={handleClick} className="optiontwo btntwo"><i className="material-icons-outlined"
                style={{ fontSize: '19px' }}>palette</i>
            </button>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <div className='colors'>
                            {
                                colors.map(c => <div key={c} id={c} style={{ backgroundColor: c }} className='colorDiv' onClick={pickColor}></div>)
                            }
                        </div>
                    </Fade>
                )}
            </Popper>
        </div>
    );
}
