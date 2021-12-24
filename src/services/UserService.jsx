import axios from 'axios'

let config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

export const Login = async (data) => {
    return await axios.post('https://localhost:44352/api/User/login', data)
}
export const Register = async (data) => {
    return await axios.post('https://localhost:44352/api/User/signup', data)
}
export const AddNote = async (data) => {
    return await axios.post('https://localhost:44352/api/Notes/create', data, config);
}
export const getAllNotes = async () => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    return await axios.get('https://localhost:44352/api/Notes/allnotes', config);
}
export const putInArchive = async (noteId) => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }
    return await axios.put('https://localhost:44352/api/Notes/archive', noteId, config);
}
export const changeColor = async (id, color) => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }
    return await axios.put(`https://localhost:44352/api/Notes/color?noteId=${id}`, color, config)
}