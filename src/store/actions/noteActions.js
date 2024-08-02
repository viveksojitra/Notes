import generateUniqueId from 'generate-unique-id';
import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../../Firebaseconfig';

export const CREATE_NOTE = 'CREATE_NOTE';
export const FETCH_NOTES = 'FETCH_NOTES';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE';
export const SET_ERROR = 'SET_ERROR';

// Action to create a new note
export const createNote = (noteData) => async (dispatch) => {
    try {
        const newId = generateUniqueId({
            length: 4,
            useLetters: false,
        });

        const newNote = { ...noteData, id: newId };
        const notesCollectionRef = collection(db, 'notes');

        await addDoc(notesCollectionRef, newNote);

        dispatch({
            type: CREATE_NOTE,
            payload: newNote,
        });
    } catch (error) {
        console.error('Error creating note:', error);
    }
};

// Action to update an existing note
export const updateNote = (id, updatedData) => async (dispatch) => {
    try {
        const noteDocRef = doc(db, 'notes', id);

        await updateDoc(noteDocRef, updatedData);

        dispatch({
            type: UPDATE_NOTE,
            payload: { id, ...updatedData },
        });
    } catch (error) {
        console.error('Error updating note:', error);
    }
};

// Action to delete a note
export const deleteNote = (noteId) => {
    return async (dispatch) => {
        if (!noteId) {
            console.error("Error: noteId is empty or undefined.");
            return;
        }

        const noteRef = doc(db, 'notes', noteId);
        console.log(`Attempting to delete note with ID: ${noteId}`);

        try {
            await deleteDoc(noteRef);
            console.log("Note deleted successfully");
            dispatch({ type: DELETE_NOTE_SUCCESS, payload: noteId });
        } catch (error) {
            console.error("Error deleting note: ", error);
            dispatch({ type: 'DELETE_NOTE_ERROR', payload: error.message });
        }
    };
};

// Action to fetch all notes
export const fetchNotes = () => {
    return async (dispatch) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'notes'));
            const notes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            dispatch({ type: FETCH_NOTES, payload: notes });
        } catch (error) {
            dispatch({ type: SET_ERROR, payload: error.message });
        }
    };
};

