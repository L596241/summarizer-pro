from flask import Flask, request, jsonify
import openai

# Initialize Flask application
app = Flask(__name__)

# Set secret key and OpenAI API key from the configuration
app.secret_key = 'Add_your_secret_key_here'
openai.api_key = 'Add_your_OpenAI_API_key_here'

# Define route for summarization
@app.route('/summarize', methods=['POST'])
def summarize():
    # Get the text and language from the request
    text = request.json.get('text')
    selected_language = request.json.get('language', 'en')  # Default to English if not provided

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Map languages to their respective prompts
    prompt_map = {
        'en': "Please summarize the following text:",
        'no': "Vennligst oppsummer følgende tekst:"
    }
    # Get the prompt based on the provided language
    prompt = prompt_map.get(selected_language, "Please summarize the following text:") # Default to English if not provided

    # Map languages to their respective truncation messages
    truncation_message_map = {
        'en': "\n\nThis summary is based on a truncated text. Please upgrade to a premium subscription for complete text summaries.",
        'no': "\n\nDenne oppsummeringen er basert på en forkortet tekst. Vennligst oppgrader til premium abonnement for komplette tekstsammendrag."
    }
    # Get the truncation message based on the detected language         # Default to English if not provided
    truncation_message = truncation_message_map.get(selected_language, "\n\nThis summary is based on a truncated text. Please upgrade to a premium subscription for complete text summaries.")

    # Initialize messages for the OpenAI API
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": f"{prompt}\n{text}"}
    ]
    
    try:
        # Try to get the summary as-is
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=800 # This can be fintuned depending on GPT model.
        )
        # Extract the summary from the response
        summary = response['choices'][0]['message']['content'].strip()
    except openai.error.InvalidRequestError as e:
        # If token limit is exceeded, truncate the text
        if "tokens" in str(e):
            # Truncate the text to fit within the token limit
            truncated_text = text[:1000]  # Truncate to 1000 characters. This can be fintuned depending on GPT model.
            # Update the user message with the truncated text
            messages[-1]["content"] = f"{prompt}\n{truncated_text}"

            try:
                # Try to get the summary with the truncated text
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=messages,
                    max_tokens=800 # This can be fintuned depending on GPT model.
                )
                # Extract the summary from the response
                summary = response['choices'][0]['message']['content'].strip()
                # Append the truncation message to the summary
                summary += truncation_message
            except Exception as e:
                # If an error occurs, print it and return it in the response
                print("Error:", e)
                return jsonify({'error': str(e)}), 500
        else:
            # If an error occurs, print it and return it in the response
            print("Error:", e)
            return jsonify({'error': str(e)}), 500

    # Return the summary and the detected language in the response
    return jsonify({'summary': summary, 'language': selected_language})

if __name__ == '__main__':
    app.run(debug=True)