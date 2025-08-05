import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils/test-utils';
import NoteCard from '../NoteCard';

// Mock the EditNote component
vi.mock('../EditNote', () => ({
    default: ({ onClose }: { onClose: () => void }) => (
        <div data-testid='edit-note-modal'>
            <button onClick={onClose}>Close Edit</button>
        </div>
    ),
}));

// Mock the useNotes hook
vi.mock('../../hooks/useNotes', () => ({
    useNotes: () => ({
        deleteNote: vi.fn(),
        notes: [],
        fetchError: null,
        isLoading: false,
    }),
}));

describe('NoteCard', () => {
    const mockNote = {
        _id: '1',
        title: 'Test Note',
        content: 'This is a test note content.',
        tags: ['test', 'example'],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
    };

    it('renders note information correctly', () => {
        render(<NoteCard note={mockNote} />);

        expect(screen.getByText('Test Note')).toBeInTheDocument();
        expect(
            screen.getByText('This is a test note content.')
        ).toBeInTheDocument();
        expect(screen.getByText('test')).toBeInTheDocument();
        expect(screen.getByText('example')).toBeInTheDocument();
    });

    it('renders action buttons', () => {
        render(<NoteCard note={mockNote} />);

        expect(screen.getByText('Edit')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('displays note metadata', () => {
        render(<NoteCard note={mockNote} />);

        expect(screen.getByText(/Created:/)).toBeInTheDocument();
        expect(screen.getByText(/Updated:/)).toBeInTheDocument();
        expect(screen.getByText(/ID:/)).toBeInTheDocument();
    });

    it('handles notes without tags gracefully', () => {
        const noteWithoutTags = {
            ...mockNote,
            tags: [],
        };

        render(<NoteCard note={noteWithoutTags} />);

        expect(screen.getByText('Test Note')).toBeInTheDocument();
        expect(
            screen.getByText('This is a test note content.')
        ).toBeInTheDocument();
        // Should not show any tag elements
        expect(screen.queryByText('test')).not.toBeInTheDocument();
        expect(screen.queryByText('example')).not.toBeInTheDocument();
    });
});
