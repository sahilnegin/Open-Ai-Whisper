Whisper Transcript Application
This full-stack application uses OpenAI's Whisper API to transcribe audio files. The backend is built using Flask, and the app is exposed to the public using ngrok for easy access.

The application works in two scenarios:

With GPU: Users who have access to a GPU can run the Whisper model locally for faster transcription.

Without GPU: Users without a GPU can run the model in Google Colab, where the processing is done remotely using GPU acceleration.
Prerequisites
For Both GPU and Non-GPU Users:
Python 3.7+ (for both frontend and backend)

For Users With a GPU:
If you have a GPU and want to run everything locally, follow these steps:

Step 1: Clone the Repository
First, clone this repository to your local machine:
git clone https://github.com/yourusername/Whisper-Transcript-App.git
cd Whisper-Transcript-App/backend


Step 2: Create a Virtual Environment and Install Dependencies
Create a virtual environment (optional but recommended) and activate it:
python3 -m venv venv
source venv/bin/activate   # On Windows, use `venv\Scripts\activate`


Then, install the required Python dependencies:
pip install -r requirements.txt


Step 3: Set Up ngrok
To expose your Flask app to the internet, you'll need to set up ngrok. First, sign up for a free ngrok account at https://ngrok.com and get your authtoken.

Add your ngrok authtoken to the configuration:
ngrok config add-authtoken <your-ngrok-authtoken>

Step 4: Run the Flask App
Start the Flask API by running the following:
python app.py

This will start the Flask app locally, and ngrok will expose it to a public URL. The public URL will be displayed in the console, like:
Public URL: http://xxxxx.ngrok.io

Step 5: Testing the API (Optional)
You can use Postman or curl to test the API:
curl -X POST -F "file=@your-audio-file.wav" http://xxxxx.ngrok.io/transcribe



For Users Without a GPU (Using Google Colab):
If you don't have a GPU, you can still run the backend remotely in Google Colab. Here's how:

Step 1: Clone the Repository
Clone the repository and navigate to the backend folder:
git clone https://github.com/yourusername/Whisper-Transcript-App.git
cd Whisper-Transcript-App/backend


Step 2: Set Up Google Colab
Go to Google Colab: https://colab.research.google.com.

Open the whisper_backend.ipynb notebook in Google Colab. You can find this notebook in the /notebooks directory of the repository.

Step 3: Change Runtime Type to GPU (for Faster Performance)
To enable GPU support in Colab:

In Colab, select Runtime > Change runtime type.

Choose GPU from the hardware accelerator dropdown.

Step 4: Install Dependencies in Colab
Run the following commands in the notebook to install the required dependencies:
!pip install git+https://github.com/openai/whisper.git
!pip install pyngrok
!pip install flask-cors

Step 5: Run the Flask App in Colab

Step 6: Access the Public URL
Once the Flask app is running in Google Colab, ngrok will provide a public URL. Use this URL to interact with the API and transcribe audio files.