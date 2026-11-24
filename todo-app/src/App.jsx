import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text) return

    setTodos([...todos, { id: Date.now(), text: text }])
    setText('')
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const saveEdit = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, text: editText } : t))
    setEditingId(null)
    setEditText('')
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4 text-center">Todo App</h3>
      
      <form onSubmit={handleSubmit} className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tambah kegiatan baru..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Tambah</button>
      </form>

      <ul className="list-group">
        {todos.length === 0 ? (
          <li className="list-group-item text-center text-muted">Belum ada tugas.</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
              {editingId === todo.id ? (
                <div className="input-group me-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button className="btn btn-success btn-sm" onClick={() => saveEdit(todo.id)}>Simpan</button>
                </div>
              ) : (
                <span>{todo.text}</span>
              )}

              <div className="btn-group">
                {editingId !== todo.id && (
                  <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(todo)}>Edit</button>
                )}
                <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>Hapus</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default App