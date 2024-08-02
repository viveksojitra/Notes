import '/src/styles/noteList.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, deleteNote } from '../store/actions/noteActions';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const NoteList = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const { notes } = useSelector((state) => state.noteReducer || {});

    const handleEdit = (id) => {

        console.log("Editing note with ID:", id);
        dispatch(fetchNotes(id));
        navigateTo(`/update/:id`);
    };

    const handleDelete = (id) => {
        if (id) {
            dispatch(deleteNote(id));
        } else {
            console.error("No note ID provided for deletion.");
        }
    };

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);


    if (notes.length === 0) {
        return (
            <div className='empty'>
                <div className='empty-item empty-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" className="bi bi-lightbulb" viewBox="0 0 16 16">
                        <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1" />
                    </svg>
                </div>
                <div className='empty-item'>Notes you add appear here</div>
            </div>
        );
    }

    return (
        <div className="note-list">
            {
                notes.map(note => (
                    <div className={`note-card ${note.color}`} key={note.id} style={{ backgroundColor: note.color }}>
                        <h3 className="note-label">{note.label}</h3>
                        <h3 className="note-title">{note.title}</h3>
                        <p className="note-description">{note.description}</p>
                        <div className="note-actions">
                            <button className="note-btn" onClick={() => handleEdit(note.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                </svg>
                            </button>
                            <button className="note-btn" onClick={() => handleDelete(note.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default NoteList;