/* eslint-disable react/prop-types */
import '/src/styles/createNote.css';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, updateNote } from '../store/actions/noteActions';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const CreateNote = () => {
    const now = moment();
    const { isLogin } = useSelector((state) => state.authReducer);
    const { id } = useParams();
    const { note } = useSelector((state) => state.noteReducer);

    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const [color, setColor] = useState('#ffffff');

    const [input, setInput] = useState({
        id: note?.id || '',
        label: note?.label || '',
        title: note?.title || '',
        description: note?.description || '',
        color: note?.color || '#ffffff',
        createdAt: now.format('YYYY-MM-DD HH:mm:ss'),
    });

    const [isSubmit, setIsSubmit] = useState(false);

    const inputStyle = {
        backgroundColor: color,
        color: '#000000',
        border: `1px solid ${color}`,
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prevInput => ({
            ...prevInput,
            [name]: value
        }));
    };

    const handleColorChange = (newColor) => {
        setColor(newColor);
        setInput(prevInput => ({
            ...prevInput,
            color: newColor
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                await dispatch(updateNote(id, input));
            } else {
                await dispatch(createNote(input));
            }
            setIsSubmit(true);
        } catch (error) {
            console.error("Error creating or updating note:", error);
        }

        setColor('#ffffff');
        setInput({
            id: '',
            label: '',
            title: '',
            description: '',
            color: '#ffffff',
        });
    };


    useEffect(() => {
        if (id) {
            setInput(prevInput => ({
                ...prevInput,
                ...note,
                color: note.color || '#ffffff'
            }));
            setColor(note.color || '#ffffff');
        }
    }, [id, note]);

    useEffect(() => {
        if (isSubmit) {
            navigateTo('/');
        }
    }, [isSubmit, navigateTo]);

    useEffect(() => {
        if (!isLogin) {
            navigateTo("/login");
        }
    }, [isLogin, navigateTo]);



    return (
        <div className={`card ${input.color}`} id="main-card" style={inputStyle}>
            <form onSubmit={handleSubmit}>
                <input type="text" name="id" value={input.id} className="text-inputs" id="input-title" onChange={handleChange} hidden />
                <input type="text" name="label" value={input.label} placeholder="Label" className="text-inputs capitalize" id="input-title" onChange={handleChange} style={inputStyle} />
                <input type="text" name="title" value={input.title} placeholder="Title" className="text-inputs capitalize" id="input-title" onChange={handleChange} style={inputStyle} />
                <textarea type="text" rows={1} name="description" value={input.description} placeholder="Take a note.." className="text-inputs" id="input-feild" onChange={handleChange} style={inputStyle} />
                <div className="icons">
                    <a href="#"><i className="material-icons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                        </svg>
                    </i></a>
                    <a href="#"><i className="material-icons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                            <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                        </svg>
                    </i></a>
                    <a href="#" onClick={() => document.getElementById('color-change').style.display = document.getElementById('color-change').style.display === 'none' ? 'flex' : 'none'}><i className="material-icons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-palette" viewBox="0 0 16 16">
                            <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                            <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8m-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7" />
                        </svg>
                    </i></a>
                    <div className="colors" id="color-change" style={{ display: 'none' }}>
                        <div className="col bg-purple" onClick={() => handleColorChange('#cdb4db')}></div>
                        <div className="col bg-cream" onClick={() => handleColorChange('#faedcd')}></div>
                        <div className="col bg-pink" onClick={() => handleColorChange('#ffc8dd')}></div>
                        <div className="col bg-blue" onClick={() => handleColorChange('#bde0fe')}></div>
                        <div className="col bg-yellow" onClick={() => handleColorChange('#fae588')}></div>
                        <div className="col bg-red" onClick={() => handleColorChange('#f4978e')}></div>
                    </div>
                    <a href="#" type='file' ><i className="material-icons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                        </svg>
                    </i></a>
                    <a href="#"><i className="material-icons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-archive" viewBox="0 0 16 16">
                            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </i></a>
                    <a href="#"><i className="material-icons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                        </svg>
                    </i></a>
                    <a href="#"><i className="material-icons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z" />
                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                        </svg>
                    </i></a>
                    <a href="#"><i className="material-icons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                        </svg>
                    </i></a>
                    <Button id="save_note" className='btn border-0 p-1' variant='' type='submit'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-floppy2-fill" viewBox="0 0 16 16">
                            <path d="M12 2h-2v3h2z" />
                            <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1" />
                        </svg>
                    </Button>
                    {/* <Button id="save_note" className='btn' type='submit'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square sidebar-icon" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                        </svg>
                    </Button> */}
                </div>
            </form>
        </div>
    );
};

export default CreateNote;