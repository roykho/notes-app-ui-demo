import { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import useClickOutside from '../hooks/useClickOutside';

const CreateNote = () => {
    const { createNote, setShowCreateNote } = useNotes();
    const containerRef = useClickOutside(() => setShowCreateNote(false));

    // Form state management
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }

        if (!formData.content.trim()) {
            setError('Note content is required');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            // Parse tags from comma-separated string to array
            const tags = formData.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            await createNote({
                title: formData.title.trim(),
                content: formData.content.trim(),
                tags: tags.length > 0 ? tags : undefined
            });

            // Reset form and close modal
            setFormData({ title: '', content: '', tags: '' });
            setShowCreateNote(false);
        } catch (err) {
            const errorMessage = (err as Error).message;

            // Check if it's a rate limiting error
            if (errorMessage.includes('Too many') || errorMessage.includes('rate limit')) {
                setError(`Rate limit exceeded: ${errorMessage}`);
            } else {
                setError(errorMessage || 'Failed to create note. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle form reset
    const handleReset = () => {
        setFormData({ title: '', content: '', tags: '' });
        setError('');
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50'>
            <div ref={containerRef as React.RefObject<HTMLDivElement>} className='bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md relative'>
                <h3 className='text-2xl font-bold text-blue-400 mb-6 text-center'>
                    Create a New Note
                </h3>

                {/* Error message */}
                {error && (
                    <div className={`mb-4 p-3 border rounded-lg ${
                        error.includes('Rate limit exceeded')
                            ? 'bg-orange-100 border-orange-400 text-orange-700'
                            : 'bg-red-100 border-red-400 text-red-700'
                    }`}>
                        <div className="flex items-start">
                            {error.includes('Rate limit exceeded') && (
                                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            )}
                            <div>
                                {error.includes('Rate limit exceeded') && (
                                    <div className="font-semibold mb-1">Rate Limit Exceeded</div>
                                )}
                                {error.replace('Rate limit exceeded: ', '')}
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    <div>
                        <label
                            htmlFor='title'
                            className='block text-sm font-medium text-gray-200 mb-1'
                        >
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            value={formData.title}
                            onChange={handleInputChange}
                            className='w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400'
                            placeholder='Enter note title'
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='content'
                            className='block text-sm font-medium text-gray-200 mb-1'
                        >
                            Note <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id='content'
                            name='content'
                            value={formData.content}
                            onChange={handleInputChange}
                            rows={4}
                            className='w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none placeholder-gray-400'
                            placeholder='Write your note here...'
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='tags'
                            className='block text-sm font-medium text-gray-200 mb-1'
                        >
                            Tags
                        </label>
                        <input
                            type='text'
                            id='tags'
                            name='tags'
                            value={formData.tags}
                            onChange={handleInputChange}
                            className='w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400'
                            placeholder='e.g. work, personal, ideas'
                            disabled={isSubmitting}
                        />
                        <p className='text-xs text-gray-400 mt-1'>
                            Separate tags with commas
                        </p>
                    </div>

                    <div className='flex gap-3 mt-2'>
                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className='cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 rounded-lg shadow transition-colors'
                        >
                            {isSubmitting ? 'Creating...' : 'Add Note'}
                        </button>
                        <button
                            type='button'
                            onClick={handleReset}
                            disabled={isSubmitting}
                            className='cursor-pointer px-4 py-2 border border-gray-600 hover:bg-gray-700 disabled:bg-gray-700 text-gray-200 rounded-lg transition-colors'
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNote;
