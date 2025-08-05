export type Note = {
    _id: string,
    title: string,
    content: string,
    tags?: string[],
    createdAt: string,
    updatedAt: string,
};

export type NoteCardProps = {
    note: Note;
}

export type CreateNoteData = {
    title: string;
    content: string;
    tags?: string[];
};

export type UpdateNoteData = {
    title: string;
    content: string;
    tags?: string[];
};

export type ApiError = {
    error: string;
};

export type NotesContextType = {
    notes: Note[];
    deleteNote: (id: string) => Promise<void>;
    createNote: (noteData: CreateNoteData) => Promise<void>;
    updateNote: (id: string, noteData: UpdateNoteData) => Promise<void>;
    showCreateNote: boolean;
    setShowCreateNote: (show: boolean) => void;
    fetchError: Error | null;
    isLoading: boolean;
};
