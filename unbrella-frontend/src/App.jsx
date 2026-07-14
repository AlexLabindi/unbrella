import { useState, useEffect } from 'react'

function App() {
    // ---------------------------------------------------------
    // 💡 GESTIONE DEGLI STATI (State Management)
    // Lo stato è una variabile speciale di React: quando cambia il suo valore,
    // React aggiorna (ri-renderizza) automaticamente la grafica sullo schermo.
    // ---------------------------------------------------------

    // Memorizza l'array di tutti i bagni scaricati dal database (es. [{id:1, rg:"Gino"}, {id:2, rg:"Franco"}])
    const [bagni, setBagni] = useState([])

    // Memorizza l'ID del bagno attualmente selezionato nel menu a tendina (es. "1" o "2")
    const [selectedBagnoId, setSelectedBagnoId] = useState('')

    // Memorizza l'array degli ombrelloni appartenenti solo al bagno selezionato
    const [ombrelloni, setOmbrelloni] = useState([])

    // Stato Booleano (true/false) per mostrare l'animazione di caricamento (loader) mentre aspettiamo il server
    const [loading, setLoading] = useState(false)

    // Memorizza eventuali stringhe di errore (es. "Errore di connessione") se il backend è spento
    const [error, setError] = useState(null)

    // URL base del tuo backend Spring Boot (Porto 8090 configurato in application.yaml)
    const API_BASE_URL = 'http://localhost:8090/api/bagni'

    // ---------------------------------------------------------
    // 🔄 CICLI DI VITA & EFFETTI (useEffect)
    // useEffect permette di eseguire codice in momenti specifici del componente.
    // ---------------------------------------------------------

    /**
     * EFFETTO 1: Caricamento iniziale dei bagni.
     * Il vettore delle dipendenze in fondo è vuoto `[]`. Significa: "Esegui questo codice SOLO UNA VOLTA
     * all'avvio dell'applicazione (quando la pagina viene caricata la prima volta)".
     */
    useEffect(() => {
        // Effettua una chiamata HTTP GET all'endpoint di base: http://localhost:8090/api/bagni
        fetch(API_BASE_URL)
            .then(res => {
                // Se la risposta del server NON è OK (es. errore 404 o 500), lancia un errore
                if (!res.ok) throw new Error('Errore nel recupero dei bagni dal server')
                return res.json() // Trasforma la risposta grezza del server in un oggetto JavaScript JSON
            })
            .then(data => {
                setBagni(data) // Salva l'array di bagni nello stato 'bagni'
            })
            .catch(err => {
                setError(err.message) // Se il server è spento o la fetch fallisce, salva l'errore nello stato
            })
    }, []) // <-- Array vuoto = Esegui solo al "Mount" (avvio)

    /**
     * EFFETTO 2: Caricamento degli ombrelloni condizionato.
     * Questo effetto ha `[selectedBagnoId]` nelle dipendenze. Significa: "Riesegui questo codice
     * OGNI VOLTA che l'utente cambia stabilimento nel menu a tendina".
     */
    useEffect(() => {
        // Se l'utente ha riselezionato la voce vuota "-- Scegli un bagno --"
        if (!selectedBagnoId) {
            setOmbrelloni([]) // Svuota la griglia degli ombrelloni
            return // Interrompi l'esecuzione della funzione qui
        }

        setLoading(true) // Attiva l'animazione di caricamento
        setError(null)   // Resetta eventuali errori precedenti

        // Effettua una GET mirata (es. http://localhost:8090/api/bagni/1/ombrelloni)
        fetch(`${API_BASE_URL}/${selectedBagnoId}/ombrelloni`)
            .then(res => {
                if (!res.ok) throw new Error('Impossibile recuperare gli ombrelloni per questo bagno')
                return res.json()
            })
            .then(data => {
                setOmbrelloni(data) // Salva gli ombrelloni ricevuti nello stato
                setLoading(false)   // Spegne il loader grafico
            })
            .catch(err => {
                setError(err.message) // Gestisce l'errore
                setLoading(false)     // Spegne comunque il loader
            })
    }, [selectedBagnoId]) // <-- Scatta ogni volta che cambia il valore di questa variabile

    // ---------------------------------------------------------
    // 🧮 LOGICA DI SUPPORTO (Derivazione dei dati)
    // ---------------------------------------------------------

    // Cerchiamo dentro l'array 'bagni' l'oggetto intero che corrisponde all'ID selezionato.
    // Serve per mostrare dettagli extra sullo schermo (come l'indirizzo del bagno).
    // Nota: usiamo parseInt() perché l'ID del select è una stringa, mentre nel DB è un numero.
    const currentBagno = bagni.find(b => b.id === parseInt(selectedBagnoId))

    // ---------------------------------------------------------
    // 🎨 INTERFACCIA UTENTE (JSX)
    // Il JSX unisce HTML e JavaScript. Le parentesi graffe `{}` servono a inserire codice JS.
    // ---------------------------------------------------------
    return (
        <div className="max-w-5xl mx-auto px-4 py-10">

            {/* HEADER DELLA PAGINA */}
            <header className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-ocean-700 tracking-tight sm:text-5xl drop-shadow-sm">
                    🏖️ Unbrella Manager
                </h1>
                <p className="mt-3 text-lg text-slate-600">
                    Gestione e visualizzazione in tempo reale degli stabilimenti balneari
                </p>
            </header>

            {/* RENDERING CONDIZIONALE DI ERRORE: Mostra questo banner solo se 'error' contiene qualcosa */}
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded shadow-sm">
                    <p className="text-red-700 font-medium">Attenzione: {error}. Controlla che il Backend sia acceso!</p>
                </div>
            )}

            {/* SEZIONE COMPONENTE: SELEZIONE BAGNO (CARD SELETTORE) */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-ocean-100">
                <label htmlFor="bagno-select" className="block text-sm font-semibold text-slate-700 mb-2">
                    Seleziona uno Stabilimento Balneare:
                </label>

                {/* Il valore del select è legato allo stato selectedBagnoId (Two-way binding) */}
                <select
                    id="bagno-select"
                    value={selectedBagnoId}
                    // Quando l'utente cambia opzione, aggiorna lo stato scatenando il secondo useEffect
                    onChange={(e) => setSelectedBagnoId(e.target.value)}
                    className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-500 transition duration-200 ease-in-out cursor-pointer"
                >
                    <option value="">-- Scegli un bagno dalla lista --</option>
                    {/* Ciclo Map: Trasforma l'array di oggetti 'bagni' in un elenco di tag <option> HTML */}
                    {bagni.map((bagno) => (
                        // La 'key' è obbligatoria in React nei cicli per aiutare il framework a tracciare gli elementi
                        <option key={bagno.id} value={bagno.id}>
                            {bagno.rg} {/* Ragione Sociale mostrata nel menu */}
                        </option>
                    ))}
                </select>

                {/* Se abbiamo trovato il bagno selezionato attuale, mostriamo il suo indirizzo */}
                {currentBagno && (
                    <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-500 flex items-center gap-2">
                        <span className="font-semibold text-slate-700">📍 Posizione:</span> {currentBagno.indirizzo}
                    </div>
                )}
            </div>

            {/* SEZIONE COMPONENTE: VISUALIZZAZIONE RISULTATI */}
            <main className="bg-white rounded-2xl shadow-md p-8 border border-ocean-100 min-h-[300px] flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        ⛱️ Mappa degli Ombrelloni
                    </h2>

                    {/* SOTTO-RENDERING CONDIZIONALE (Gestione dei vari stati grafici) */}
                    {loading ? (
                        /* CASO A: Il server sta caricando i dati */
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-500"></div>
                            <p className="mt-4 text-slate-500">Caricamento in corso...</p>
                        </div>
                    ) : !selectedBagnoId ? (
                        /* CASO B: L'utente non ha ancora selezionato nessun bagno */
                        <div className="text-center py-16 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 text-lg">Seleziona un bagno sopra per visualizzare la disposizione degli ombrelloni.</p>
                        </div>
                    ) : ombrelloni.length === 0 ? (
                        /* CASO C: Il bagno è stato selezionato ma l'array restituito è vuoto */
                        <div className="text-center py-16 bg-amber-50 rounded-xl border-2 border-dashed border-amber-200">
                            <p className="text-amber-600 text-lg">Nessun ombrellone registrato per questo stabilimento.</p>
                        </div>
                    ) : (
                        /* CASO D: Ci sono ombrelloni da mostrare. Li stampiamo in una griglia responsiva (grid-cols) */
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                            {/* Ciclo Map sull'array degli ombrelloni del singolo bagno */}
                            {ombrelloni.map((omb) => (
                                <div
                                    key={omb.id}
                                    /* Classi Tailwind per lo stile della schedina dell'ombrellone (gradiente ambrato, bordi arrotondati, effetto hover di sollevamento) */
                                    className="bg-gradient-to-br from-amber-50 to-orange-100 border border-orange-200 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transform hover:-translate-y-1 transition duration-200"
                                >
                                    <span className="text-3xl mb-1">⛱️</span>
                                    {/* Mostra la Fila (es. Lettera A, B, Z) */}
                                    <span className="text-xs uppercase font-bold text-orange-700 tracking-wider">Fila {omb.l}</span>
                                    {/* Mostra il Numero dell'ombrellone */}
                                    <span className="text-xl font-extrabold text-slate-800">Num. {omb.n}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* FOOTER INFORMATIVO */}
                <div className="mt-12 text-center text-xs text-slate-400 border-t pt-4">
                    Unbrella System — Progetto d'Esame Full-Stack Architecture
                </div>
            </main>
        </div>
    )
}

export default App