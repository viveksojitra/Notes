import '/src/styles/noteContainer.css'
import CreateNote from "./CreateNote";
import NoteList from "./NoteList";
import Sidebar from "./Sidebar";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NoteContainer = () => {

    const { isLogin } = useSelector((state) => state.authReducer);
    const navigateTo = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            navigateTo("/login")
        }
    })
    
    return (
        <div className="note-container">
            <Sidebar />
            <div className="content">
                <CreateNote />
                <NoteList />
            </div>
        </div>
    );
};

export default NoteContainer;
