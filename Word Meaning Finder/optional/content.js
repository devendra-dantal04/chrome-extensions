console.log("Chrome extension go ?")

window.addEventListener("mouseup", () => {
    let selectedText = window.getSelection().toString();
    if(selectedText.length > 0) {
        let message = {
            text : selectedText
        }
        chrome.runtime.sendMessage(message);
    }
})