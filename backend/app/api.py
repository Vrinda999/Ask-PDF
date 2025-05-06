import os
import asyncio
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from app.utils import ask_question, executor
from fastapi import APIRouter, File, UploadFile, Form, BackgroundTasks


class AskRequest(BaseModel):
    filename: str
    question: str

router = APIRouter()
Upload_Dir = "uploads"

os.makedirs(Upload_Dir, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(Upload_Dir, file.filename)
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    return {"filename": file.filename, "message": "Upload Successful"}

@router.post("/ask")
async def ask(data: AskRequest):
    filename = data.filename
    question = data.question
    file_path = os.path.join(Upload_Dir, filename)

    if not os.path.exists(file_path):
        return JSONResponse(status_code=404, content={"error": "File Not Found"})

    # Run blocking question in background
    loop = asyncio.get_event_loop()
    answer = await loop.run_in_executor(executor, ask_question, file_path, question)
    return {"answer": answer}