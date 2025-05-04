import os
from fastapi import APIRouter, File, UploadFile, Form
from fastapi.responses import JSONResponse

from app.utils import process_pdf, ask_question

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
async def ask(filename: str = Form(...), question: str = Form(...)):
    file_path = os.path.join(Upload_Dir, filename)
    if not os.path.exists(file_path):
        return JSONResponse(status_code=404, content={"error": "File Not Found"})
    
    answer = ask_question(file_path, question)
    return {"Answer": answer}