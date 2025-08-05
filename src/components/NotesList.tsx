import type { Note } from '../types';
import NoteCard from './NoteCard';
import { useNotes } from '../hooks/useNotes';

const NotesList = () => {
    const { notes, fetchError, isLoading } = useNotes();

    // Show loading state
    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="text-center text-gray-500 py-10">
                    Loading notes...
                </div>
            </div>
        );
    }

    // Show rate limiting error
    if (fetchError) {
        const errorMessage = fetchError.message;
        const isRateLimitError = errorMessage.includes('Too many') || errorMessage.includes('rate limit');
        
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="col-span-2 text-center py-10">
                    <div className={`inline-block p-4 rounded-lg border ${
                        isRateLimitError 
                            ? 'bg-orange-100 border-orange-400 text-orange-700' 
                            : 'bg-red-100 border-red-400 text-red-700'
                    }`}>
                        <div className="flex items-center justify-center">
                            {isRateLimitError && (
                                <svg className="w-6 h-6 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            )}
                            <div>
                                {isRateLimitError && (
                                    <div className="font-semibold mb-1">Rate Limit Exceeded</div>
                                )}
                                <div>{errorMessage}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Show notes or "No notes found"
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {notes.length > 0 ? (
                    notes.map((note: Note) => (
                        <NoteCard key={note._id} note={note} />
                    ))
                ) : (
                    <div className="col-span-2 text-center text-gray-500 py-10">
                        No notes found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesList;
