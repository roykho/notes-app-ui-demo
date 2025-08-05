import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils/test-utils';
import CreateNote from '../CreateNote';

// Mock the useClickOutside hook
vi.mock('../../hooks/useClickOutside', () => ({
    default: () => ({ current: null }),
}));

// Mock the useNotes hook
vi.mock('../../hooks/useNotes', () => ({
    useNotes: () => ({
        createNote: vi.fn(),
        setShowCreateNote: vi.fn(),
        notes: [],
        fetchError: null,
        isLoading: false,
    }),
}));

describe('CreateNote', () => {
    it('renders create note form', () => {
        render(<CreateNote />);

        expect(screen.getByText('Create a New Note')).toBeInTheDocument();
        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/note/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /add note/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /reset/i })
        ).toBeInTheDocument();
    });

    it('has required form fields', () => {
        render(<CreateNote />);

        const titleField = screen.getByLabelText(/title/i);
        const contentField = screen.getByLabelText(/note/i);

        expect(titleField).toBeRequired();
        expect(contentField).toBeRequired();
    });

    it('has proper form structure', () => {
        render(<CreateNote />);

        expect(
            screen.getByPlaceholderText(/enter note title/i)
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(/write your note here/i)
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(/e.g. work, personal, ideas/i)
        ).toBeInTheDocument();
    });
});
