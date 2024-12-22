from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler
from datetime import datetime, timedelta
import joblib

app = Flask(__name__)

# Load the trained model and scaler
model = load_model('bin_overflow_predictor.h5', compile=False)
scaler = joblib.load('scaler.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from the POST request
        data = request.json
        location_id = data.get("location_id")
        population_density = data.get("population_density")
        threshold_frequency_percent = data.get("threshold_frequency_percent")
        expected_event_waste_percent = data.get("expected_event_waste_percent")
        permanent_source_waste_percent = data.get("permanent_source_waste_percent")
        waste_already_present_percent = data.get("waste_already_present_percent")

        # Validate input
        if not all([location_id, population_density, threshold_frequency_percent, 
                    expected_event_waste_percent, permanent_source_waste_percent, 
                    waste_already_present_percent]):
            return jsonify({"error": "Invalid input data"}), 400

        # Prepare input for the model
        input_data = np.array([[location_id, population_density, threshold_frequency_percent, 
                                expected_event_waste_percent, permanent_source_waste_percent, 
                                waste_already_present_percent]])
        input_data_scaled = scaler.transform(input_data)

        # Predict overflow days
        prediction = model.predict(input_data_scaled)
        overflow_days = int(prediction[0][0])

        # Calculate the overflow date
        current_date = datetime.now()
        overflow_date = current_date + timedelta(days=overflow_days)
        overflow_date_str = overflow_date.strftime('%Y-%m-%d')

        # Return the response
        return jsonify({"nextOverflowDate": overflow_date_str})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__== '__main__':
    app.run(host='127.0.0.1', port=3000, debug=True)