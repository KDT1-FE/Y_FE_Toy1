import { useState } from 'react';
import { marked } from 'marked';

interface Note {
  id: number;
  content: string;
}

export function Wiki() {
  const [markdown, setMarkdown] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const addNote = () => {
    setNotes([...notes, { id: Date.now(), content: markdown }]);
    setMarkdown('');
  };

  const editNote = (id: number) => {
    const note = notes.find((note) => note.id === id);
    if (note) {
      setMarkdown(note.content);
      setEditingId(id);
    }
  };

  const updateNote = () => {
    setNotes(notes.map((note) => (note.id === editingId ? { ...note, content: markdown } : note)));
    setMarkdown('');
    setEditingId(null);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div>
      <div>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="내용을 입력하세요"
        />

        {editingId ? (
          <button onClick={updateNote}>수정 완료</button>
        ) : (
          <button onClick={addNote}>추가</button>
        )}
      </div>

      <div>
        {notes.map((note) => (
          <div key={note.id}>
            <div className="preview" dangerouslySetInnerHTML={{ __html: marked(note.content) }} />
            <button onClick={() => editNote(note.id)}>수정</button>
            <button onClick={() => deleteNote(note.id)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
}
