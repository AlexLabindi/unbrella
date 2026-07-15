import { useState, useEffect } from 'react'

function App() {
    // ---------------------------------------------------------
    // 💡 GESTIONE DEGLI STATI (State Management)
    // ---------------------------------------------------------
    const [bagni, setBagni] = useState([])
    const [selectedBagnoId, setSelectedBagnoId] = useState('')
    const [ombrelloni, setOmbrelloni] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // URL base del backend
    const API_BASE_URL = 'http://localhost:8090/api/bagni'
    const API_OMBRELLONI_URL = 'http://localhost:8090/api/ombrelloni'

    // ---------------------------------------------------------
    // 🔄 CICLI DI VITA & EFFETTI (useEffect)
    // ---------------------------------------------------------

    // EFFETTO 1: Caricamento iniziale dei bagni (eseguito solo all'avvio)
    useEffect(() => {
        fetch(API_BASE_URL)
            .then(res => {
                if (!res.ok) throw new Error('Errore nel recupero dei bagni dal server')
                return res.json()
            })
            .then(data => setBagni(data))
            .catch(err => setError(err.message))
    }, [])

    // EFFETTO 2: Caricamento degli ombrelloni ogni volta che cambia il bagno selezionato
    useEffect(() => {
        if (!selectedBagnoId) {
            setOmbrelloni([])
            return
        }

        setLoading(true)
        setError(null)

        fetch(`${API_BASE_URL}/${selectedBagnoId}/ombrelloni`)
            .then(res => {
                if (!res.ok) throw new Error('Impossibile recuperare gli ombrelloni')
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

    // ---------------------------------------------------------
    // ⚡ NUOVA FUNZIONE: GESTIONE PRENOTAZIONE (La richiesta POST)
    // ---------------------------------------------------------
    /**
     * Questa funzione viene invocata quando l'utente clicca su un ombrellone libero.
     * Invia una richiesta POST al backend per impostare 'p' a true.
     */
    const handlePrenota = (idOmbrellone) => {
        setError(null) // Resetta eventuali messaggi di errore precedenti

        // Chiamata POST all'endpoint del nostro nuovo OmbrelloneController
        fetch(`${API_OMBRELLONI_URL}/${idOmbrellone}/prenota`, {
            method: 'POST', // Specifichiamo il metodo POST
        })
            .then(res => {
                // Se il server risponde con un errore (es. 404 o ombrellone già prenotato)
                if (!res.ok) {
                    throw new Error('Impossibile completare la prenotazione. Forse l\'ombrellone è già occupato?')
                }
                return res.json() // Il server ci restituisce l'ombrellone aggiornato con p = true
            })
            .then(updatedOmb => {
                /*
                 * 💡 OTTIMIZZAZIONE REACT (Stato Immutabile):
                 * Invece di ricaricare l'intera pagina o rifare la fetch di tutti gli ombrelloni dal server,
                 * aggiorniamo direttamente lo stato locale usando map().
                 * Cicliamo l'array 'ombrelloni': se l'id corrisponde, lo sostituiamo con quello aggiornato (updatedOmb),
                 * altrimenti lasciamo l'ombrellone invariato. Questo aggiorna la UI all'istante!
                 */
                setOmbrelloni(prevOmbrelloni =>
                    prevOmbrelloni.map(omb => omb.id === idOmbrellone ? updatedOmb : omb)
                );
            })
            .catch(err => {
                setError(err.message)
            })
    }

    // Trova il bagno selezionato per mostrare informazioni extra
    const currentBagno = bagni.find(b => b.id === parseInt(selectedBagnoId))

    // ---------------------------------------------------------
    // 🎨 INTERFACCIA UTENTE (JSX)
    // ---------------------------------------------------------
    return (
        <div className="max-w-5xl mx-auto px-4 py-10">

            {/* HEADER */}
            <header className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-ocean-700 tracking-tight sm:text-5xl drop-shadow-sm">
                    🏖️ Unbrella Manager
                </h1>
                <p className="mt-3 text-lg text-slate-600">
                    Visualizza lo stato della spiaggia e prenota il tuo ombrellone in tempo reale
                </p>
            </header>

            {/* ERROR BANNER */}
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded shadow-sm">
                    <p className="text-red-700 font-medium">Attenzione: {error}</p>
                </div>
            )}

            {/* SELETTORE STABILIMENTO */}
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

                {currentBagno && (
                    <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-500 flex items-center gap-2">
                        <span className="font-semibold text-slate-700">📍 Posizione:</span> {currentBagno.indirizzo}
                    </div>
                )}
            </div>

            {/* MAPPA DEGLI OMBRELLONI */}
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
                        /* LA GRIGLIA DEGLI OMBRELLONI */
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                            {ombrelloni.map((omb) => {
                                // 🔍 Verifichiamo lo stato di prenotazione per decidere lo stile
                                const isPrenotato = omb.p === true;

                                return (
                                    <button
                                        key={omb.id}
                                        // Disabilitiamo il pulsante se l'ombrellone è già prenotato
                                        disabled={isPrenotato}
                                        // Se l'ombrellone è libero, al click avviamo la funzione handlePrenota
                                        onClick={() => handlePrenota(omb.id)}
                                        /*
                                         * 🎨 CLASSI DINAMICHE:
                                         * Usiamo i template literal `${}` per cambiare colore e cursore in base allo stato:
                                         * - Se PRENOTATO: Sfondo rosso, bordo rosso, cursore non consentito (disabled).
                                         * - Se LIBERO: Sfondo arancione, effetto hover interattivo, puntatore a mano.
                                         */
                                        className={`
                      border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm transition duration-200 w-full
                      ${isPrenotato
                                            ? 'from-red-50 to-red-100 border-red-200 text-red-700 cursor-not-allowed opacity-80'
                                            : 'from-amber-50 to-orange-100 border-orange-200 text-slate-800 hover:shadow-md hover:-translate-y-1 cursor-pointer'
                                        }
                      bg-gradient-to-br
                    `}
                                    >
                                        {/* Icona dinamica: Mostra un lucchetto se prenotato, l'ombrellone classico se libero */}
                                        <span className="text-3xl mb-1">
                      {isPrenotato ? '🔒' : '⛱️'}
                    </span>

                                        <span className={`text-xs uppercase font-bold tracking-wider ${isPrenotato ? 'text-red-500' : 'text-orange-700'}`}>
                      Fila {omb.l}
                    </span>

                                        <span className="text-xl font-extrabold">
                      Num. {omb.n}
                    </span>

                                        {/* Testo di aiuto sotto il numero dell'ombrellone */}
                                        <span className="text-[10px] mt-1 font-semibold uppercase tracking-wider">
                      {isPrenotato ? 'Occupato' : 'Clicca per Prenotare'}
                    </span>
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                <div className="mt-12 text-center text-xs text-slate-400 border-t pt-4">
                    Unbrella System — Progetto d'Esame Full-Stack Architecture
                </div>
            </main>
        </div>
    )
}

export default App