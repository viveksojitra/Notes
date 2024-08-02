import { CREATE_NOTE, DELETE_NOTE_SUCCESS, FETCH_NOTES, SET_ERROR, UPDATE_NOTE } from "../actions/noteActions";

const initialState = {
    notes: [],
    error: null,
};

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTE:
            return {
                ...state,
                notes: [...state.notes, action.payload],
                error: null,
            };

        case FETCH_NOTES:
            return {
                ...state,
                notes: action.payload,
                error: null,
            };

        case UPDATE_NOTE:
            return {
                ...state,
                notes: state.notes.map(note =>
                    note.id === action.payload.id ? { ...note, ...action.payload } : note
                ),
                error: null,
            };

        case DELETE_NOTE_SUCCESS:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload),
                error: null,
            };

        case 'DELETE_NOTE_ERROR':
            return {
                ...state,
                error: action.payload,
            };

        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default noteReducer;
