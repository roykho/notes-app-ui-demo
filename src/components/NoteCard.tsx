import React, { useState } from 'react';
import type { NoteCardProps } from '../types';
import { useNotes } from '../hooks/useNotes';
import EditNote from './EditNote';

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
    const { deleteNote } = useNotes();
    const [error, setError] = useState<string>('');
    const [showEditNote, setShowEditNote] = useState(false);
    const [showFullContent, setShowFullContent] = useState(false);

    const deleteHandler = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                setError('');
                await deleteNote(id);
            } catch (err) {
                const errorMessage = (err as Error).message;
                if (errorMessage.includes('Too many') || errorMessage.includes('rate limit')) {
                    setError(`Rate limit exceeded: ${errorMessage}`);
                } else {
                    setError(errorMessage || 'Failed to delete note');
                }
            }
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out p-6 border border-gray-200 relative">
            {/* Error message */}
            {error && (
                <div className="absolute top-2 left-2 right-2 z-10 p-2 bg-orange-100 border border-orange-400 text-orange-700 rounded text-xs">
                    <div className="flex items-start">
                        <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{error.replace('Rate limit exceeded: ', '')}</span>
                    </div>
                </div>
            )}

            <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {note.title}
                </h3>
                <div className="text-gray-600 text-base">
                    <p className={`whitespace-pre-wrap ${showFullContent ? '' : 'line-clamp-4'}`}>
                        {note.content}
                    </p>
                    {note.content.length > 200 && (
                        <button
                            onClick={() => setShowFullContent(!showFullContent)}
                            className="cursor-pointer text-blue-600 hover:text-blue-800 text-xs font-medium mt-1 transition-colors"
                        >
                            {showFullContent ? 'Show less' : 'Read more'}
                        </button>
                    )}
                </div>
            </div>

            {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {note.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex space-x-2">
                    <button
                        className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                        onClick={() => setShowEditNote(true)}
                    >
                        Edit
                    </button>
                    <button
                        className="cursor-pointer text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                        onClick={() => deleteHandler(note._id)}
                    >
                        Delete
                    </button>
                </div>
                <div className="text-right">
                    <div className="text-xs text-black">
                        Created: {formatDate(note.createdAt)}
                    </div>
                    <div className="text-xs text-black">
                        Updated: {formatDate(note.updatedAt)}
                    </div>
                    <div className="text-xs text-black mt-1">
                        ID: {note._id.slice(-8)}
                    </div>
                </div>
            </div>
        </div>

        {showEditNote && (
            <EditNote
                note={note}
                onClose={() => setShowEditNote(false)}
            />
        )}
    </>
    );
};

export default NoteCard;
