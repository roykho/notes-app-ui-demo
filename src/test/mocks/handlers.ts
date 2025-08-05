import { http, HttpResponse } from 'msw';
import type { CreateNoteData, UpdateNoteData } from '../../types';

const baseUrl = '/api';

export const handlers = [
    // GET /api/notes
    http.get(`${baseUrl}/notes`, () => {
        return HttpResponse.json([
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
        ]);
    }),

    // POST /api/notes
    http.post(`${baseUrl}/notes`, async ({ request }) => {
        const body = await request.json() as CreateNoteData;

        if (!body.title || !body.content) {
            return HttpResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        return HttpResponse.json(
            {
                _id: '3',
                title: body.title,
                content: body.content,
                tags: body.tags || [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            { status: 201 }
        );
    }),

    // PUT /api/notes/:id
    http.put(`${baseUrl}/notes/:id`, async ({ request, params }) => {
        const body = await request.json() as Partial<UpdateNoteData>;

        if (!body.title && !body.content && !body.tags) {
            return HttpResponse.json(
                { error: 'At least one field must be provided' },
                { status: 400 }
            );
        }

        return HttpResponse.json({
            _id: params.id,
            title: body.title || 'Updated Title',
            content: body.content || 'Updated content',
            tags: body.tags || [],
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: new Date().toISOString(),
        });
    }),

    // DELETE /api/notes/:id
    http.delete(`${baseUrl}/notes/:id`, () => {
        return HttpResponse.json({ message: 'Note deleted successfully' });
    }),

    // Rate limit error handler
    http.all(`${baseUrl}/*`, () => {
        return HttpResponse.json(
            { error: 'Too many requests, please try again later' },
            { status: 429 }
        );
    }),
];
