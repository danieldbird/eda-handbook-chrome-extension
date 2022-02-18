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

const styleElement = document.createElement("style");
styleElement.setAttribute("id", "eda-test");
document.getElementsByTagName("head")[0].appendChild(styleElement);

// dark colour scheme
function changeDark() {
  let primary = `#555`;
  let secondary = `#111`;
  let tertiary = `#ddd`;
  let accent = `#fff`;
  let textPrimary = `#ccc`;
  let textSecondary = `#ccc`;
  const styleElement = document.createElement("style");
  styleElement.setAttribute("id", "eda-chrome-extension-styles");
  styleElement.innerHTML = `
  body, main {
    background: ${secondary} !important;
  }

  .navBarDefault, aside, .previousBtn, .nextBtn {
    background: ${primary} !important
  }

  p , li, ul, a, h1, h2, h3, h4, h5 {
    color: ${textSecondary} !important;
  }

  table, thead, tr, td, th {
    background: ${secondary};
    color: ${textPrimary};
  }

  ::-webkit-scrollbar {
    width: 1em;
    background: ${tertiary};
  }
   
  ::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 6px ${accent};
  }
   
  ::-webkit-scrollbar-thumb {
    background-color: ${primary};
    outline: 1px solid ${secondary};
  }

  `;
  document.getElementsByTagName("head")[0].appendChild(styleElement);
}

// light colour scheme
function changeLight() {
  document.getElementById("eda-chrome-extension-styles").remove();
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

  if (!document.getElementById("eda-chrome-extension-styles")) {
    const styleElement = document.createElement("style");
    styleElement.setAttribute("id", "eda-chrome-extension-styles");
    document.getElementsByTagName("head")[0].appendChild(styleElement);
  }

  document.getElementById("eda-chrome-extension-styles").innerHTML = `
  body, main {
    background: ${secondary} !important;
  }

  .navBarDefault, aside {
    background: ${primary} !important;
    background-color: ${primary} !important;
  }

  p , li, ul, a, h1, h2, h3, h4, h5 {
    color: ${textSecondary} !important;
  }

  table, thead, tr, td, th {
    background: ${secondary};
    color: ${textPrimary};
  }

  ::-webkit-scrollbar {
    width: 1em;
    background: ${tertiary};
  }
   
  ::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 6px ${accent};
  }
   
  ::-webkit-scrollbar-thumb {
    background-color: ${primary};
    outline: 1px solid ${secondary};
  }
  `;
  //add colours
  // document.body.style.backgroundColor = secondary;
  // document.body.style.color = textPrimary;
  // document.querySelector(".navBarDefault").style.backgroundColor = primary;
  // document.querySelector(".css-1p56bun").style.backgroundColor = secondary;
  // document.querySelector(".enpob61").style.backgroundColor = "red";
  // document.querySelector(".title").style.color = textPrimary;
  // document.querySelector(".titleWrapper").style.borderBottom = "1px solid #ccc";
  // document.querySelector(".mainWrapper").style.color = textPrimary;
  // document.querySelector(
  //   "#gatsby-focus-wrapper > div > div.navBarWrapper > nav > div.navbar-header.navBarHeader > select"
  // ).style.color = "#333";
  // document.querySelector(".previousBtn").style.backgroundColor = tertiary;
  // document.querySelector(".nextBtn").style.backgroundColor = tertiary;

  // document.querySelector(".nextPreviousTitle span").style.color = textPrimary;
  // document.querySelector(
  //   "#gatsby-focus-wrapper > div > div.css-1s71mnb.e1235q820 > main > div > div.addPaddTopBottom > div > a.nextBtn > div.nextRightWrapper > div.nextPreviousTitle > span"
  // ).style.color = textPrimary;
  // document.querySelector("div.hidden-xs.css-192n44p.e1235q823 > aside").style.backgroundColor =
  //   primary;
  // document.querySelector(
  //   "#gatsby-focus-wrapper > div > div.css-1s71mnb.e1235q820 > div.hidden-xs.css-192n44p.e1235q823 > aside"
  // ).style.color = "red !important";
}
