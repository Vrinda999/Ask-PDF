# Ask-PDF

## Contents
1. [About](#about)
2. [Structure](#structure)
    1. [Full Application](#full-application)
    2. [Back-end](#backend)
    3. [Front-end](#frontend)
3. [Features](#features)
4. [Setup Instruction](#setup-instructions)
    1. [Backend](#backend-1)
    2. [Frontend](#frontend-1)
    3. [MongoDB](#mongodb-compass)
5. [APIs](#apis)
    1. [`/upload`](#post-upload)
    2. [`/ask`](#post-ask)
    3. [`/save-message`](#post-save-message)
    4. [`/chat-history`](#get-chat-historyfilename)
6. [Architecture Overview](#architecture-overview)
    1. [Backend](#backend-fastapi--llama)
    2. [Frontend](#frontend-reactjs--vite)
    3. [Model](#model)
    4. [Database](#database)
7. [Dependencies](#dependencies)
    1. [Backend](#backend-2)
    2. [Frontend](#frontend-2)

---

## About
Use natural language when interacting with PDF files.  
Ask questions, and receive answers using a locally hosted LLaMA model.

## Structure
### Full Application
```sh
|-- backend/
|    |-- app/                   # FastAPI Endpoints
|    |-- models/                # Contains the LLaMA GGUF File
|    |-- uploads/               # Folder where Uploaded Files are Stored
|    |-- Dockerfile
|
|-- frontend/
|    |-- src/
|    |    |-- assets/           # Logo SVG
|    |    |-- components/
|    |-- App.jsx
|    |-- main.jsx
|
|    |-- Dockerfile
|    |-- package.json
|
|-- docker-compose.yml
|-- README.md
|-- requirements.txt
```

### Backend
```sh
|-- app/
|    |-- main.py                # Intialises FastAPI
|    |-- api.py                 # Connection and Comunication with LLaMa and Database
|    |-- utils.py               # Utility Functions for User Interaction
|
|-- models/
|    |-- mistral-7b-instruct-v0.1.Q4_K_M.gguf
|
|-- uploads/
|    |-- Sample1.pdf
|    |-- Sample2.pdf
|
|-- .env
|
|-- Dockerfile
```

### Frontend
```sh
|-- src/
|    |-- assets/
|    |    |-- logo.svg
|
|    |-- components/
|    |    |-- Components.jsx
|
|    |    |-- ChatSection.jsx               # Displays Chat + Text Box
|    |    |-- DarkModeToggle.jsx            # Light/Dark Mode
|    |    |-- ModalUpload.jsx               # Used for Uploading PDFs
|    |    |-- Navbar.jsx                    # Navigation bar with Logo and Utility Buttons.
|    |    |-- Sidebar.jsx                   # Shows the List of Uploaded PDFs
|
|    |-- App.css
|    |-- App.jsx
|    |-- index.css                          # Colour Palette Definition for Light/Dark Mode
|    |-- main.jsx
|
|-- .env
|-- .gitignore
|-- Dockerfile
```

---

## Features
- [x] Upload your PDF documents.
- [x] Enquire about any Uploaded File in Plain Language.
- [x] Integration of LLaMA model (using mistral-7b-instruct).
- [x] The Per-File Chat History Enabled by MongoDB.
- [x] Dockerized Deployment.
- [x] Toggle between Light and Dark Mode.

---

## Setup Instructions
### Backend
```sh
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```sh
cd frontend
npm install
npm run dev
```

### MongoDB Compass
```
Click on Connect to localhost:27017
```

In browser, open the Ask-PDF Website at [localhost:5173](localhost:5173)

---

## [APIs](./backend/app/api.py)

### Post `/upload`
| i/o type | i/o Value |
|---------|----------|
| Request | Form Data (File) |
| Response | File Name |

### Post `/ask`
| i/o type | i/o Value |
|---------|----------|
| Request | File Name, Query |
| Response | Answer |

### Post `/save-message`
| i/o type | i/o Value |
|---------|----------|
| Request | Sender, Text, File Name |
| Response | Status (Saved) |

### Get `/chat-history/{filename}`
| i/o type | i/o Value |
|---------|----------|
| Request | Internal Hit |
| Response | [Sender, Text] |

---

## Architecture Overview
### Backend (FastAPI + LLaMA)
- Handles File Uploads and Text Extraction.
- Uses llama_index with local LLaMA model (GGUF format).
- Stores Chat History in MongoDB.

### Frontend (React.js + Vite)
| Feature | File |
|---------|------|
| Upload PDFs | ModalUpload.jsx |
| Interact via Chat | ChatSection.jsx |
| Sidebar displays List of PDFs | Sidebar.jsx |
| Light/Dark Mode | DarkModeToggle.jsx |

### Model
- LLaMA Model: mistral-7b-instruct-v0.1.Q4_K_M.gguf
- Loaded with llama-cpp-python.

### Database
- MongoDB container.
- Stores Chat Messages per Filename.

---

## Dependencies
### Backend
- fastapi
- uvicorn
- pymongo
- llama-cpp-python

#### Install With:

```sh
$pip install -r requirements.txt
```

### Frontend
- axios
- react
- vite
- tailwind

#### Install With:
```sh
$npm install
```

## Outlook