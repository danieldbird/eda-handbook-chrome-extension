// get the buttons
const changeDarkBtn = document.getElementById("changeDarkBtn");
const changeLightBtn = document.getElementById("changeLightBtn");

// what to do when the changeDarkBtn is clicked
changeDarkBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: changeDark,
  });
});

// what to do when the changeLightBtn is clicked
changeLightBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: changeLight,
  });
});

// dark colour scheme
function changeDark() {
  document.body.style.backgroundColor = "black";
  document.body.style.color = "white";
  document.querySelector(".navBarDefault").style.backgroundColor = "black";
  document.querySelector(".css-1p56bun").style.backgroundColor = "black";
  document.querySelector(".enpob61").style.backgroundColor = "black";
  document.querySelector(".title").style.color = "#ccc";
  document.querySelector(".titleWrapper").style.borderBottom = "1px solid #ccc";
  document.querySelector(".mainWrapper").style.color = "#ccc";
  document.querySelector(".previousBtn").style.backgroundColor = "#000";
  document.querySelector(".nextBtn").style.backgroundColor = "#000";
  document.querySelector(".nextPreviousTitle span").style.color = "#639";
  document.querySelector(
    "#gatsby-focus-wrapper > div > div.css-1s71mnb.e1235q820 > main > div > div.addPaddTopBottom > div > a.nextBtn > div.nextRightWrapper > div.nextPreviousTitle > span"
  ).style.color = "#639";
  document.querySelector("div.hidden-xs.css-192n44p.e1235q823 > aside").style.backgroundColor =
    "#000";
  document.querySelector(
    "#gatsby-focus-wrapper > div > div.css-1s71mnb.e1235q820 > div.hidden-xs.css-192n44p.e1235q823 > aside"
  ).style.color = "red !important";
}

// light colour scheme
function changeLight() {
  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";
}
