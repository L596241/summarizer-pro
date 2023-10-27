# AI-Powered Text Summarizer Chrome Extension

This repository contains a Chrome extension that uses a Flask backend powered by OpenAI's GPT-3.5-turbo model to summarize web page content.

## Installation & Setup

### 1. Setting up the Flask Application

#### Prerequisites:
- Python 3.10 +
- pip

#### Steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/L596241/summarizer-pro.git
   cd summarizer-pro
   ```

2. **Create a Virtual Environment (Optional but Recommended):**
   ```bash
   python -m venv myenv
   source myenv/bin/activate  # On Windows use: myenv\Scripts\activate
   ```

3. **Install Flask:**
   ```bash
   pip install flask
   ```

4. **Add your OpenAI API Key:**
   Open `app.py` and replace `Add your OpenAI API key here` with your actual API key.
   I also reccomend you to change the secret key.

5. **Run the Flask application:**
   ```bash
   python app.py
   ```
   or click the "Run" button in your editor.

### 2. Setting up the Chrome Extension

1. Open the Chrome browser and navigate to `chrome://extensions/`.
2. Enable **Developer mode**.
3. Click on **Load unpacked**.
4. Navigate to the directory where you cloned this repository and select the `SummarizerExtension` folder. This will load the extension into your browser.
5. You should now see the extension icon in your Chrome browser toolbar.

## Usage

1. Navigate to any web page you want to summarize.
2. Click on the extension icon in the toolbar.
3. Click on the **Summarize** button.
4. The summarized content will be displayed in the popup.

## Acknowledgements

- OpenAI for the GPT-3.5-turbo model.
- Flask for providing the web framework.
```
