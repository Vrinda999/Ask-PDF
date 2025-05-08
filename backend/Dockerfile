# Use an official Python image as the base image
FROM python:3.11-bullseye

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required Python packages
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir -p /app/uploads && chmod -R 755 /app/uploads

# Copy the application code into the container
COPY . .


# Expose the port that FastAPI will run on
EXPOSE 8000

# Set environment variables for production
ENV PYTHONUNBUFFERED=1

# Command to run the FastAPI application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
