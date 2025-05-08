# app/main.py
import os
from app.api import router
from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
load_dotenv()

# Allow Frotnend Access to FastAPI Backend using CORS
React_Server = os.getenv("REACT_SERVER")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[React_Server],  # Your React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)