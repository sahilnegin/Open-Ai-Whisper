from flask import Flask, request, jsonify
from flask_cors import CORS
from pyngrok import ngrok
import whisper

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

model = whisper.load_model("base")

@app.route("/transcribe", methods=["POST"])
def transcribe():
    try:
        audio_file = request.files["file"]
        audio_path = "/tmp/" + audio_file.filename
        audio_file.save(audio_path)
        result = model.transcribe(audio_path)
        return jsonify({"transcription": result["text"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

def start_ngrok():
    public_url = ngrok.connect(5000)
    print(f"Public URL: {public_url}")
    return public_url

public_url = start_ngrok()
app.run(host="0.0.0.0", port=5000)
