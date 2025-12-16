import { useState, useEffect } from 'react'

function App() {
  // State tanımlamaları
  // todos: Tüm görevlerin listesini tutar. LocalStorage'dan başlangıç değeri yüklenir
  const [todos, setTodos] = useState(() => {
    // LocalStorage'dan kaydedilmiş görevleri yükle, yoksa boş array döndür
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  // inputValue: Yeni görev eklemek için kullanılan input alanının değerini tutar
  const [inputValue, setInputValue] = useState('')
  // editingId: Şu anda düzenlenmekte olan görevin ID'sini tutar (null ise düzenleme modu kapalı)
  const [editingId, setEditingId] = useState(null)
  // editValue: Düzenleme modunda görevin yeni metnini tutar
  const [editValue, setEditValue] = useState('')

  // LocalStorage'a kaydet: todos state'i her değiştiğinde otomatik olarak LocalStorage'a kaydeder
  // Bu sayede sayfa yenilendiğinde görevler kaybolmaz
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Yeni görev ekle: Input alanındaki değeri kontrol eder, boş değilse yeni görev oluşturur
  // Her görev benzersiz bir ID (timestamp) alır ve tamamlanmamış (completed: false) olarak başlar
  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(), // Benzersiz ID için mevcut zamanı kullan
        text: inputValue.trim(), // Başta ve sonda boşlukları temizle
        completed: false, // Yeni görevler varsayılan olarak tamamlanmamış
      }
      setTodos([...todos, newTodo]) // Mevcut görevlere yeni görevi ekle
      setInputValue('') // Input alanını temizle
    }
  }

  // Görevi sil: Verilen ID'ye sahip görevi listeden çıkarır
  // filter fonksiyonu ile ID eşleşmeyen tüm görevleri yeni array'de tutar
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Görevi tamamlandı olarak işaretle/kaldır: Checkbox tıklandığında görevin durumunu tersine çevirir
  // Eğer tamamlanmışsa tamamlanmamış, tamamlanmamışsa tamamlanmış yapar
  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Düzenleme modunu başlat: Görevi düzenleme moduna alır
  // Düzenlenen görevin ID'sini ve mevcut metnini state'e kaydeder
  const startEdit = (id, text) => {
    setEditingId(id) // Hangi görevin düzenlendiğini işaretle
    setEditValue(text) // Düzenleme input'una mevcut metni yükle
  }

  // Düzenlemeyi kaydet: Düzenlenen görevin yeni metnini kaydeder ve düzenleme modunu kapatır
  // Boş metin kaydedilmez, sadece içerik varsa güncelleme yapılır
  const saveEdit = (id) => {
    if (editValue.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: editValue.trim() } : todo
      ))
    }
    setEditingId(null) // Düzenleme modunu kapat
    setEditValue('') // Düzenleme input'unu temizle
  }

  // Düzenlemeyi iptal et: Düzenleme modunu kapatır ve yapılan değişiklikleri kaydetmeden iptal eder
  const cancelEdit = () => {
    setEditingId(null) // Düzenleme modunu kapat
    setEditValue('') // Düzenleme input'unu temizle
  }

  // Enter tuşu ile görev ekle: Klavye kısayolu - Enter'a basıldığında yeni görev ekler
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  // Düzenleme modunda klavye kısayolları: Enter ile kaydet, Escape ile iptal et
  const handleEditKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      saveEdit(id) // Enter tuşu ile düzenlemeyi kaydet
    } else if (e.key === 'Escape') {
      cancelEdit() // Escape tuşu ile düzenlemeyi iptal et
    }
  }

  // İstatistikler: Tamamlanan ve toplam görev sayısını hesapla
  // Bu değerler header'da gösterilir
  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header: Başlık ve görev istatistiklerini gösterir */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Todo List
          </h1>
          <p className="text-gray-600">
            {totalCount > 0 
              ? `${completedCount} / ${totalCount} görev tamamlandı`
              : 'Henüz görev yok'}
          </p>
        </div>

        {/* Input Container: Yeni görev eklemek için input alanı ve buton */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Yeni görev ekle..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
            />
            <button
              onClick={addTodo}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Ekle
            </button>
          </div>
        </div>

        {/* Todo List: Görevlerin listelendiği ana bölüm */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            // Görev yoksa kullanıcıya bilgi mesajı göster
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-500 text-lg">
                📝 Henüz görev eklenmedi. Yukarıdan yeni görev ekleyebilirsiniz.
              </p>
            </div>
          ) : (
            // Her görev için bir kart oluştur
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`bg-white rounded-lg shadow-md p-4 flex items-center gap-3 transition-all ${
                  todo.completed ? 'opacity-75' : ''
                }`}
              >
                {/* Checkbox: Görevin tamamlanma durumunu gösterir ve değiştirir */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                />

                {/* Todo Text or Edit Input: Düzenleme modunda input, normal modda metin gösterir */}
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyPress={(e) => handleEditKeyPress(e, todo.id)}
                    onBlur={() => saveEdit(todo.id)}
                    autoFocus
                    className="flex-1 px-3 py-2 border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                  />
                ) : (
                  <span
                    className={`flex-1 text-gray-800 ${
                      todo.completed
                        ? 'line-through text-gray-500'
                        : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                )}

                {/* Action Buttons: Normal modda düzenle ve sil butonları gösterilir */}
                {editingId !== todo.id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(todo.id, todo.text)}
                      className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                )}

                {/* Düzenleme modunda kaydet ve iptal butonları gösterilir */}
                {editingId === todo.id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(todo.id)}
                      className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                    >
                      Kaydet
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1.5 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    >
                      İptal
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer Actions: Tüm görevleri silmek için buton (sadece görev varsa gösterilir) */}
        {todos.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setTodos([])}
              className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Tümünü Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App





