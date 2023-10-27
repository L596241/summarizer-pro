document.addEventListener('DOMContentLoaded', function() {
    const lastSummary = localStorage.getItem('lastSummary');
    if (lastSummary) {
        document.getElementById('summaryText').innerText = lastSummary;
    } // Show the refresh button and text if there is a summary in local storage
    if (document.getElementById('summaryText').innerText !== "") {
        document.getElementById('refreshContainer').style.display = "inline";
    } else {
        document.getElementById('refreshContainer').style.display = "none";
    }
    
    // Function to update the UI based on the selected language
    function updateUIForLanguage(language) {
        const uiTextMap = {
            'EN': {
                'summarize': 'Summarize',
                'copyToClipboard': 'Copy to Clipboard',
                'downloadWord': 'Download as Text-file',
                'summarizing': 'Summarizing...',
                'refresh': 'Refresh'
            },
            'NO': {
                'summarize': 'Oppsummer',
                'copyToClipboard': 'Kopier til utklippstavle',
                'downloadWord': 'Last ned som tekstfil',
                'summarizing': 'Oppsummerer...',
                'refresh': 'Slett oppsummering'
            }
        };
            
        const uiText = uiTextMap[language];
        document.getElementById('summarize').innerText = uiText.summarize;
        document.getElementById('copyToClipboard').innerText = uiText.copyToClipboard;
        document.getElementById('downloadWord').innerText = uiText.downloadWord;
        document.getElementById('refreshText').innerText = uiText.refresh;
    }

    // Update UI when language is changed
    document.getElementById('languageSelect').addEventListener('change', function() {
        updateUIForLanguage(this.value);
    });

    document.getElementById('summarize').addEventListener('click', function() {
        const selectedLanguage = document.getElementById('languageSelect').value;
        const summarizingText = selectedLanguage === 'EN' ? 'Summarizing...' : 'Oppsummerer...';

        document.getElementById('summaryText').innerText = summarizingText;
        document.getElementById('summaryText').classList.add('blinking');

        chrome.tabs.executeScript({
            code: 'document.body.innerText'
        }, function(selection) {
            const textToSummarize = selection[0];
            fetch("http://127.0.0.1:5000/summarize", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({text: textToSummarize, language: selectedLanguage.toLowerCase()})
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('summaryText').classList.remove('blinking');
                document.getElementById('summaryText').innerText = data.summary;
                localStorage.setItem('lastSummary', data.summary);
                // Show the refresh button and text
                document.getElementById('refreshContainer').style.display = "inline";
            })
            .catch(error => {
                document.getElementById('summaryText').classList.remove('blinking');
                document.getElementById('summaryText').innerText = 'An error occurred.';
                console.error('Error:', error);
            });
        });
    });
  
    // Function to copy summary to clipboard
    document.getElementById('copyToClipboard').addEventListener('click', function() {
        const summaryText = document.getElementById('summaryText').innerText;
        navigator.clipboard.writeText(summaryText).then(function() {
            alert('Summary copied to clipboard');
        }).catch(function(err) {
            alert('Could not copy text: ', err);
        });
    });
    
  
    // Function to download summary as a Text document
    document.getElementById('downloadWord').addEventListener('click', function() {
        const summaryText = document.getElementById('summaryText').innerText;
        const blob = new Blob([summaryText], {type: 'text/plain;charset=utf-8'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'summary.txt';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
    });
    // Initialize the UI based on the selected language
    const initialLanguage = document.getElementById('languageSelect').value;
    updateUIForLanguage(initialLanguage);
});
       
    // Function to refresh the summary
    document.getElementById('refreshContainer').addEventListener('click', function() {
        // Clear the summary in the display and in local storage
        document.getElementById('summaryText').innerText = "";
        localStorage.removeItem('lastSummary');
        // Hide the refresh button and text
        document.getElementById('refreshContainer').style.display = "none";
    });

    
    
    