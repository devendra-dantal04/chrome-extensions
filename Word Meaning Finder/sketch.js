
window.addEventListener('load', async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow : true});

    chrome.scripting.executeScript({
        target : {tabId : tab.id},
        function: getSelectedText, 
    }, async (getText) => {
        const result = getText[0].result.trim()

        //For Wordnik API 

        // let url = `https://api.wordnik.com/v4/word.json/
        // ${result}
        // /definitions?limit=1
        // &includeRelated=false
        // &sourceDictionaries=all
        // &useCanonical=false
        // &includeTags=false
        // &api_key=YOURAPIKEY`


        let url =  `https://owlbot.info/api/v4/dictionary/${result}`
        let options = {
            headers: {
                "Authorization" : "Token dd916b7513409c5c9e7f901ea8c70856016e2a75",
            }
        }

        const data = await fetch(url, options)
        const response = await data.json()

        const para = document.querySelector(".definitionText");
        if(response.definitions) {
            para.innerText = response.definitions[0]?.definition
        }else {
            para.innerText = "No Meaning Found"
        }
        // console.log(response.definitions[0].definition)
        
    })
    
});


function getSelectedText () {
        let selectedText = window.getSelection().toString();
        if(selectedText.length > 0) {
            return selectedText
        }
}