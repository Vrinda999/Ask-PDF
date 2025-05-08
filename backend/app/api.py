import os
import asyncio
from pydantic import BaseModel
from dotenv import load_dotenv
from pymongo import MongoClient
from fastapi.responses import JSONResponse
from app.utils import ask_question, executor
from fastapi import APIRouter, File, UploadFile, Form, BackgroundTasks


# Custom Model for Ask Request Input Type
class AskRequest(BaseModel):
    filename: str
    question: str

router = APIRouter()
Upload_Dir = "uploads"

# Making the uploads folder to save files
os.makedirs(Upload_Dir, exist_ok=True)


'''
Sends a Post request on the /upload URL. 
Reads the entire File and saves a Copy of it in the Output Directory i.e. ./uploads/
'''
@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(Upload_Dir, file.filename)
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    return {"filename": file.filename, "message": "Upload Successful"}


'''
Sends a Post request on the /ask URL. 
Takes the User's Chat Message and sends it over the model along with the Name of the Selected File.
Doesn't Ask the question itself, Instead Prepares for the Process.

This function Basically Obtains the required data: Filename, and Question.
Then Creates a Thread in the Background, inside which it calls the _Actual_ function to answer.
That function Runs in the Background thread and Returns the Asnwer to this Route.
'''
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



'''
-------------- INTERNAL USE --------------

This part of the Code does not affect the main Interactions asked for in the Assignment, but are as necessary.
These are related to `ChatSection.jsx', and are responsible for saving and fetching the chat history for files.
'''

# Connecting to MongoDB server by loading details from .env
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")

# Debug Statements to Check Myself :)
print("Connecting to:", MONGO_URI)

client = MongoClient(MONGO_URI)
db = client[MONGO_DB]
messages_collection = db["messages"]

'''
Sends a Post request on the /save-message URL. 
Saves the message to the Database along with the File Name.
'''
@router.post("/save-message")
def save_message(message: dict):
    print("Saving message:", message)
    messages_collection.insert_one(message)
    return {"status": "saved"}


'''
Sends a Get request on the /chat-history URL. 
Loads the Previous Chat, if Any, of specific files so that answers are not Lost.
'''
@router.get("/chat-history/{filename}")
def get_history(filename: str):
    msgs = messages_collection.find({"filename": filename})
    return [{"sender": msg["sender"], "text": msg["text"]} for msg in msgs]