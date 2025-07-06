# Use Python base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy only requirements first (so Docker can cache this layer)
COPY requirements.txt .

# Install dependencies early
RUN pip install --no-cache-dir -r requirements.txt

# Now copy the rest of your app
COPY . .

# Expose the port
EXPOSE 8000

# Run the app
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]

