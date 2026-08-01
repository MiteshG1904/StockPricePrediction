from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    company = data["company"]

    model = joblib.load(os.path.join("models", f"{company}_model.pkl"))

    features = np.array([[

        float(data["open"]),
        float(data["high"]),
        float(data["low"]),
        float(data["volume"])

    ]])

    prediction = model.predict(features)

    return jsonify({

        "prediction": float(prediction[0])

    })

if __name__ == "__main__":
    app.run(debug=True)