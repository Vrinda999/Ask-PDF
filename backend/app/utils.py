import os
import concurrent.futures
from llama_index.llms.llama_cpp import LlamaCPP
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.settings import Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

base_dir = os.path.dirname(os.path.dirname(__file__))  # one level up from 'app/'
model_path = os.path.join(base_dir, "models", "mistral-7b-instruct-v0.1.Q4_K_M.gguf")

llm = LlamaCPP(
    model_path=model_path,
    temperature=0.5,
    max_new_tokens=512,
    context_window=3900,
    verbose=True
)

Settings.llm = llm
Settings.embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")
index_cache = {}

def process_pdf(file_path):
    reader = SimpleDirectoryReader(input_files=[file_path])
    docs = reader.load_data()                                           # Loading
    index = VectorStoreIndex.from_documents(docs)                       # Indecing
    return index

executor = concurrent.futures.ThreadPoolExecutor(max_workers=2) # Ru this in a Background Thread so as to not hang the system.

def ask_question(file_path, question):
    if file_path not in index_cache:
        index_cache[file_path] = process_pdf(file_path)
    
    query_engine = index_cache[file_path].as_query_engine()             # Convert Index --> Query Engine.
    response = query_engine.query(question)                             # Asks the Actual Question.
    return str(response)