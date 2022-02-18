// get the buttons
const changeDarkBtn = document.getElementById("changeDarkBtn");
const changeLightBtn = document.getElementById("changeLightBtn");
const colorSelector = document.querySelector("#colorRange");

// what to do when a button is clicked
changeLightBtn.addEventListener("click", () => changeTheme(changeLight));
changeDarkBtn.addEventListener("click", () => changeTheme(changeDark));
colorSelector.addEventListener("input", (e) => changeTheme(changeSelectedColor, e.target.value));

// handle theme changes
async function changeTheme(themeFunction, ...args) {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: themeFunction,
    args: [...args],
  });
}

// dark colour scheme
function changeDark() {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = `
  body, .navBarDefault, aside, main {
    background: #111 !important;
  }

  p , li, ul, a {
    color: #555 !important;
  }

  table, thead, tr, td, th {
    background: #222;
    color: #ccc;
  }

  ::-webkit-scrollbar {
    width: 1em;
    background: #ddd;
  }
   
  ::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 6px #fff;
  }
   
  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  `;
  document.getElementsByTagName("head")[0].appendChild(styleElement);
}

// light colour scheme
function changeLight() {
  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";
}

// theme based on color selector
function changeSelectedColor(hValue) {
  //define colours
  let primary = `hsl(${hValue}deg, 100%, 10%)`;
  let secondary = `hsl(${hValue}deg, 20%, 10%)`;
  let tertiary = `hsl(${hValue}deg, 5%, 50%)`;
  let accent = `hsl(${hValue}deg, 80%, 50%)`;
  let textPrimary = `hsl(${hValue}deg, 0%, 100%)`;
  let textSecondary = `hsl(${hValue}deg, 0%, 80%)`;

  //add colours
  document.body.style.backgroundColor = secondary;
  document.body.style.color = textPrimary;
  document.querySelector(".navBarDefault").style.backgroundColor = primary;
  document.querySelector(".css-1p56bun").style.backgroundColor = secondary;
  document.querySelector(".enpob61").style.backgroundColor = "red";
  document.querySelector(".title").style.color = textPrimary;
  document.querySelector(".titleWrapper").style.borderBottom = "1px solid #ccc";
  document.querySelector(".mainWrapper").style.color = textPrimary;
  document.querySelector(
    "#gatsby-focus-wrapper > div > div.navBarWrapper > nav > div.navbar-header.navBarHeader > select"
  ).style.color = "#333";
  document.querySelector(".previousBtn").style.backgroundColor = tertiary;
  document.querySelector(".nextBtn").style.backgroundColor = tertiary;

  document.querySelector(".nextPreviousTitle span").style.color = textPrimary;
  document.querySelector(
    "#gatsby-focus-wrapper > div > div.css-1s71mnb.e1235q820 > main > div > div.addPaddTopBottom > div > a.nextBtn > div.nextRightWrapper > div.nextPreviousTitle > span"
  ).style.color = textPrimary;
  document.querySelector("div.hidden-xs.css-192n44p.e1235q823 > aside").style.backgroundColor =
    primary;
  document.querySelector(
    "#gatsby-focus-wrapper > div > div.css-1s71mnb.e1235q820 > div.hidden-xs.css-192n44p.e1235q823 > aside"
  ).style.color = "red !important";
}
