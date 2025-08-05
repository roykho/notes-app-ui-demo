import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils/test-utils';
import NotesList from '../NotesList';

// Mock the useNotes hook
vi.mock('../../hooks/useNotes', () => ({
    useNotes: () => ({
        notes: [
            {
                _id: '1',
                title: 'Test Note 1',
                content: 'This is test content 1',
                tags: ['test', 'example'],
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z',
            },
            {
                _id: '2',
                title: 'Test Note 2',
                content: 'This is test content 2',
                tags: ['work'],
                createdAt: '2024-01-02T00:00:00.000Z',
                updatedAt: '2024-01-02T00:00:00.000Z',
            },
        ],
        fetchError: null,
        isLoading: false,
    }),
}));

describe('NotesList', () => {
    it('renders notes when data is loaded', () => {
        render(<NotesList />);

        expect(screen.getByText('Test Note 1')).toBeInTheDocument();
        expect(screen.getByText('Test Note 2')).toBeInTheDocument();
        expect(screen.getByText('This is test content 1')).toBeInTheDocument();
        expect(screen.getByText('This is test content 2')).toBeInTheDocument();
    });

    it('renders tags correctly', () => {
        render(<NotesList />);

        expect(screen.getByText('test')).toBeInTheDocument();
        expect(screen.getByText('example')).toBeInTheDocument();
        expect(screen.getByText('work')).toBeInTheDocument();
    });

    it('renders note cards in a grid layout', () => {
        render(<NotesList />);

        const noteCards = screen.getAllByText(/Test Note/);
        expect(noteCards).toHaveLength(2);
    });
});
