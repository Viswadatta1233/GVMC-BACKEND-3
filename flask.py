from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np

# Load your pre-trained model
model = tf.keras.models.load_model('your_model.h5')

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from the request
        data = request.get_json()

        # Extract input features from the data
        location_id = data['location_id']
        population_density = data['population_density']
        threshold_frequency_percent = data['threshold_frequency_percent']
        expected_event_waste_percent = data['expected_event_waste_percent']
        permanent_source_waste_percent = data['permanent_source_waste_percent']
        waste_already_present_percent = data['waste_already_present_percent']

        # Prepare the input data for prediction (you can adjust this according to the model's expected input)
        input_features = np.array([[
            population_density,
            threshold_frequency_percent,
            expected_event_waste_percent,
            permanent_source_waste_percent,
            waste_already_present_percent
        ]])

        # Make the prediction
        prediction = model.predict(input_features)

        # Get the predicted next overflow date (you can adjust the prediction output handling as per your model)
        next_overflow_date = prediction[0][0]  # Modify as per your model's output

        # Return the response
        return jsonify({"nextOverflowDate": next_overflow_date}), 200

    except Exception as e:
        return jsonify({"message": "Error processing request", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
