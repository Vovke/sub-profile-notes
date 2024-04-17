function initializeNotes() {
    function extractUserHash() {
        const regex = /user\/([^\/]+)/;
        const match = window.location.href.match(regex);
        return match ? match[1] : null;
    }

    const userHash = extractUserHash();

    if (userHash) {
        chrome.storage.local.get([userHash], function(result) {
            const existingNote = result[userHash] || '';
            const noteContainer = document.createElement('div');
            noteContainer.style.cssText = 'margin-top: 20px; padding: 10px; background-color: #f0f0f0;';
            noteContainer.innerHTML = `
                <textarea id='noteArea' style='width: 100%; height: 100px;'>${existingNote}</textarea>
                <button id='saveNote' style='margin-top: 10px;'>Save Note</button>
            `;

            // Check every 500ms if the target element is available
            const intervalId = setInterval(() => {
                const targetElement = document.querySelector('.sc-6c491854-0');
                if (targetElement) {
                    clearInterval(intervalId); // Clear interval once the target element is found
                    targetElement.appendChild(noteContainer);
                    document.getElementById('saveNote').addEventListener('click', function() {
                        const noteText = document.getElementById('noteArea').value;
                        chrome.storage.local.set({[userHash]: noteText}, function() {
                            alert('Note saved!');
                        });
                    });
                }
            }, 500);
        });
    } else {
        console.log("User hash not found in URL.");
    }
}

if (document.readyState !== "complete") {
    window.addEventListener('load', initializeNotes); // Use window 'load' to ensure all scripts and content are fully loaded
} else {
    initializeNotes(); // Initialize immediately if the page is already fully loaded
}
