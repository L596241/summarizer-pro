
# AI-Powered Text Summarizer Chrome Extension

This repository contains a Chrome extension that uses a Flask backend powered by OpenAI's GPT-3.5-turbo model to summarize web page content.

## Installation & Setup

### 1. Setting up the Flask Application

#### Prerequisites:
- Python 3.x
- pip

#### Steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your_github_username/your_repository_name.git
   cd your_repository_name
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - Windows: `venv\Scripts\activate`
   - MacOS/Linux: `source venv/bin/activate`

4. **Install the necessary libraries:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Add your OpenAI API Key:**
   Open `config.cfg` and replace `YOUR_OPENAI_API_KEY` with your actual API key.

6. **Run the Flask application:**
   ```bash
   python app.py
   ```

### 2. Setting up the Chrome Extension

1. Open the Chrome browser and navigate to `chrome://extensions/`.
2. Enable **Developer mode**.
3. Click on **Load unpacked**.
4. Navigate to the directory where you cloned this repository and select the `extension` folder. This will load the extension into your browser.
5. You should now see the extension icon in your Chrome browser toolbar.

## Usage

1. Navigate to any web page you want to summarize.
2. Click on the extension icon in the toolbar.
3. Choose your preferred language.
4. Click on the **Summarize** button.
5. The summarized content will be displayed in the popup. You can copy it to the clipboard or download it as a text file.

## Video Demonstration

[Watch the video demonstration here](link_to_your_youtube_video)

## Contributing

If you'd like to contribute, feel free to open a pull request or issue!

## License

This project is licensed under the MIT License.

## Acknowledgements

- OpenAI for the GPT-3.5-turbo model.
- Flask for providing the web framework.
