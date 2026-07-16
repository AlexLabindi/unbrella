# 🚀 alexPro — Full-Stack Exam Template

Template architetturale Full-Stack prfomante e modulare basato su **Spring Boot 3**, **React 18 (Vite + Tailwind CSS v4)** e **PostgreSQL**.

Progettato come ambiente di partenza universale, pre-configurato e pronto all'uso per lo sviluppo rapido di API REST e interfacce web reattive.

---

## 🛠️ Stack Tecnologico e Requisiti

Assicurati di avere installato sul tuo sistema i seguenti software prima di iniziare:

*   **Java Development Kit (JDK):** Versione 17 o superiore
*   **Node.js:** Versione 18.x o superiore (con `npm`)
*   **Docker & Docker Compose:** Per la gestione isolata del Database
*   **IDE consigliato:** IntelliJ IDEA / Eclipse (Backend) e VS Code (Frontend)

---

## 📁 Struttura del Progetto

```text
alexPro/
├── docker-compose.yml             # Containerization PostgreSQL
├── README.md                      # Guida operativa
├── alexPro-backend/               # Modulo Spring Boot (Porta 8090)
│   ├── src/main/java/com/alex/alexPro/
│   │   ├── controller/            # REST Controllers (@CrossOrigin)
│   │   ├── model/                 # Entità JPA / ORM
│   │   ├── repository/            # Interfacce Spring Data JPA
│   │   └── service/               # Business Logic
│   └── src/main/resources/
│       └── application.yml        # Configurazione DB & Spring
└── alexPro-frontend/              # Single Page Application React (Porta 5173)
    ├── src/
    │   ├── App.jsx                # Componente Root con fetch e UI base
    │   └── index.css              # Direttive Tailwind CSS v4
    └── package.json               # Dipendenze Frontend