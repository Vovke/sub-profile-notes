document.getElementById('export').addEventListener('click', function() {
    chrome.storage.local.get(null, function(items) { // Retrieves all items in storage
        const result = JSON.stringify(items);
        const url = 'data:text/json;charset=utf-8,' + encodeURIComponent(result);
        chrome.downloads.download({
            url: url,
            filename: 'notes_backup.json'
        });
    });
});

document.getElementById('import').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const fileReader = new FileReader();
    fileReader.onload = function() {
        const data = JSON.parse(this.result);
        chrome.storage.local.set(data, function() {
            alert('Notes have been imported successfully!');
        });
    };
    fileReader.readAsText(event.target.files[0]);
});
