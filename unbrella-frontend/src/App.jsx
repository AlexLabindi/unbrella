import { useState, useEffect } from 'react'

function App() {
  const [bagni, setBagni] = useState([])
  const [selectedBagnoId, setSelectedBagnoId] = useState('')
  const [ombrelloni, setOmbrelloni] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_BASE_URL = 'http://localhost:8090/api/bagni'

  // 1. Recupera tutti i bagni all'avvio del componente
  useEffect(() => {
    fetch(API_BASE_URL)
        .then(res => {
          if (!res.ok) throw new Error('Errore nel recupero dei bagni')
          return res.json()
        })
        .then(data => setBagni(data))
        .catch(err => setError(err.message))
  }, [])

  // 2. Recupera gli ombrelloni quando cambia il bagno selezionato
  useEffect(() => {
    if (!selectedBagnoId) {
      setOmbrelloni([])
      return
    }

    setLoading(true)
    fetch(`${API_BASE_URL}/${selectedBagnoId}/ombrelloni`)
        .then(res => {
          if (!res.ok) throw new Error('Errore nel recupero degli ombrelloni')
          return res.json()
        })
        .then(data => {
          setOmbrelloni(data)
          setLoading(false)
        })
        .catch(err => {
          setError(err.message)
          setLoading(false)
        })
  }, [selectedBagnoId])

  // Trova l'oggetto Bagno selezionato per mostrarne i dettagli (es. indirizzo)
  const currentBagno = bagni.find(b => b.id === parseInt(selectedBagnoId))

  return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-ocean-700 tracking-tight sm:text-5xl drop-shadow-sm">
            🏖️ Unbrella Manager
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Gestione e visualizzazione in tempo reale degli stabilimenti balneari
          </p>
        </header>

        {/* Messaggio di errore */}
        {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded shadow-sm">
              <p className="text-red-700 font-medium">Attenzione: {error}. Controlla che il Backend sia acceso!</p>
            </div>
        )}

        {/* Sezione di Selezione Bagno */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-ocean-100">
          <label htmlFor="bagno-select" className="block text-sm font-semibold text-slate-700 mb-2">
            Seleziona uno Stabilimento Balneare:
          </label>
          <select
              id="bagno-select"
              value={selectedBagnoId}
              onChange={(e) => setSelectedBagnoId(e.target.value)}
              className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-500 transition duration-200 ease-in-out cursor-pointer"
          >
            <option value="">-- Scegli un bagno dalla lista --</option>
            {bagni.map((bagno) => (
                <option key={bagno.id} value={bagno.id}>
                  {bagno.rg}
                </option>
            ))}
          </select>

          {/* Informazioni extra sul bagno selezionato */}
          {currentBagno && (
              <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-500 flex items-center gap-2">
                <span className="font-semibold text-slate-700">📍 Posizione:</span> {currentBagno.indirizzo}
              </div>
          )}
        </div>

        {/* Sezione Visualizzazione Ombrelloni */}
        <main className="bg-white rounded-2xl shadow-md p-8 border border-ocean-100 min-h-[300px] flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              ⛱️ Mappa degli Ombrelloni
            </h2>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-500"></div>
                  <p className="mt-4 text-slate-500">Caricamento in corso...</p>
                </div>
            ) : !selectedBagnoId ? (
                <div className="text-center py-16 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 text-lg">Seleziona un bagno sopra per visualizzare la disposizione degli ombrelloni.</p>
                </div>
            ) : ombrelloni.length === 0 ? (
                <div className="text-center py-16 bg-amber-50 rounded-xl border-2 border-dashed border-amber-200">
                  <p className="text-amber-600 text-lg">Nessun ombrellone registrato per questo stabilimento.</p>
                </div>
            ) : (
                /* Grid degli ombrelloni stilizzata a "Card" */
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {ombrelloni.map((omb) => (
                      <div
                          key={omb.id}
                          className="bg-gradient-to-br from-amber-50 to-orange-100 border border-orange-200 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transform hover:-translate-y-1 transition duration-200"
                      >
                        <span className="text-3xl mb-1">⛱️</span>
                        <span className="text-xs uppercase font-bold text-orange-700 tracking-wider">Fila {omb.l}</span>
                        <span className="text-xl font-extrabold text-slate-800">Num. {omb.n}</span>
                      </div>
                  ))}
                </div>
            )}
          </div>

          {/* Footer interno coordinato */}
          <div className="mt-12 text-center text-xs text-slate-400 border-t pt-4">
            Unbrella System — Progetto d'Esame Full-Stack Architecture
          </div>
        </main>
      </div>
  )
}

export default App