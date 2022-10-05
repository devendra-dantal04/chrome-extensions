const btn = document.querySelector(".changeColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");

btn.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({active : true, currentWindow: true});
    
    const color = chrome.storage.sync.get('color', ({color}) => {
        console.log(color)
    })

    //Execute or inject the script in chrome
    chrome.scripting.executeScript({
        target : {tabId : tab.id},
        function: pickColor, //Passing function
        // args : [] --> Also pass arguments using args
    }, async (injectedResult) => {
        const [data] = injectedResult;

        if(data.result) {
            const color = data.result?.sRGBHex;
            colorGrid.style.backgroundColor = color;
            colorValue.innerText = color;
            try {
                await navigator.clipboard.writeText(color)
            }catch(err) {
                console.error(err);
            }
        }
    });
});



async function pickColor() {
    try {
        //Activate Picker
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
    }catch(err) {
        console.error(err)
    }
}