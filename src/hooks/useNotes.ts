import { useContext, createContext } from 'react';
import type { NotesContextType } from '../types';

export const NotesContext = createContext<NotesContextType>({
    notes: [],
    deleteNote: async () => { },
    createNote: async () => { },
    updateNote: async () => { },
    showCreateNote: false,
    setShowCreateNote: () => { },
    fetchError: null,
    isLoading: false
} as NotesContextType);

export const useNotes = () => {
    return useContext(NotesContext);
};
