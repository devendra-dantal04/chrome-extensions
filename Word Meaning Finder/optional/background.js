console.log("background Script running");

let text = ""

chrome.runtime.onMessage.addListener((request, sender, sentRequest) => {
    text = request.text
    // chrome.runtime.onInstalled.addListener(() => {
    //     console.log(text)

    // });
})

function sendText() {
    return text;
}

