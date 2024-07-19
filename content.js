

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'GET_DIV_TEXT') {
        //alert("content start")
      const divElement = document.querySelector("#DetailsInfoCard > section > div.read-only > div > div.col-md-7 > div > div");
      //alert(divElement.innerHTML)
      if (divElement) {
        sendResponse({ text: divElement.innerHTML });
      } else {
        sendResponse({ text: '' });
      }
    }
  });
  