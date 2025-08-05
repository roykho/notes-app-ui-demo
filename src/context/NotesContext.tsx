import { useState } from 'react';
import { NotesContext } from '../hooks/useNotes';
import type { CreateNoteData, UpdateNoteData, ApiError } from '../types';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const NotesProvider = ({
    children,
}: { children: React.ReactNode }) => {
    const queryClient = useQueryClient();
    const { data: notes = [], error: fetchError, isLoading } = useQuery({
        queryKey: ['getNotes'],
        queryFn: async () => {
            const res = await fetch('/api/notes');
            if (!res.ok) {
                const errorData: ApiError = await res.json();
                throw new Error(errorData.error || 'Unable to fetch notes');
            }
            return res.json();
        },
    });

    const [showCreateNote, setShowCreateNote] = useState(false);

    const deleteNote = async (id: string) => {
        try {
            const res = await fetch(`/api/notes/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                const errorData: ApiError = await res.json();
                throw new Error(errorData.error || 'Unable to delete note');
            }
            // Invalidate and refetch notes
            queryClient.invalidateQueries({ queryKey: ['getNotes'] });
        } catch (err) {
            console.log((err as Error).message);
            throw err; // Re-throw to handle in component
        }
    };

    const createNote = async (noteData: CreateNoteData) => {
        try {
            const res = await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData)
            });

            if (!res.ok) {
                const errorData: ApiError = await res.json();
                throw new Error(errorData.error || 'Unable to create note');
            }

            // Invalidate and refetch notes
            queryClient.invalidateQueries({ queryKey: ['getNotes'] });

        } catch (err) {
            console.log((err as Error).message);
            throw err; // Re-throw to handle in component
        }
    };

    const updateNote = async (id: string, noteData: UpdateNoteData) => {
        try {
            const res = await fetch(`/api/notes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData)
            });

            if (!res.ok) {
                const errorData: ApiError = await res.json();
                throw new Error(errorData.error || 'Unable to update note');
            }

            // Invalidate and refetch notes
            queryClient.invalidateQueries({ queryKey: ['getNotes'] });

        } catch (err) {
            console.log((err as Error).message);
            throw err; // Re-throw to handle in component
        }
    };

    return (
        <NotesContext.Provider value={{
            notes,
            deleteNote,
            createNote,
            updateNote,
            showCreateNote,
            setShowCreateNote,
            fetchError: fetchError as Error | null,
            isLoading
        }}>
            {children}
        </NotesContext.Provider>
    );
};
