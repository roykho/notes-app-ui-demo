import NotesList from './components/NotesList';
import { LuNotebookPen } from 'react-icons/lu';
import { useNotes } from './hooks/useNotes';

import CreateNote from './components/CreateNote';

function App() {
  const { setShowCreateNote, showCreateNote } = useNotes();

  return (
    <>
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <h2 className='text-3xl sm:text-4xl font-extrabold text-blue-700 mb-8 tracking-tight drop-shadow-sm flex items-center gap-2'>
          <span className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
            Notes
          </span>
          <LuNotebookPen size={24} />
        </h2>
        <div className='flex justify-end mb-6'>
          <button
            className='cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition-colors'
            onClick={() => setShowCreateNote(true)}
          >
            + Create Note
          </button>
        </div>
        <NotesList />
      </div>
      {
        showCreateNote && (
          <CreateNote />
        )
      }
    </>
  );
}

export default App
