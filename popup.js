  /*-   -   -   -   -   -   -   */
  /*    buttons and listeners   */
  /*-   -   -   -   -   -   -   */

//get buttons/inputs
const changeDarkBtn = document.getElementById("changeDarkBtn");
const changeLightBtn = document.getElementById("changeLightBtn");
const colorSelector = document.querySelector("#colorRange");

//add listeners
changeLightBtn.addEventListener("click", () => changeTheme(changeLight));
changeDarkBtn.addEventListener("click", () => changeTheme(changeDark));
colorSelector.addEventListener("input", (e) => changeTheme(changeSelectedColor, e.target.value));


  /*-   -   -   -   -   -   -   */
  /*      Main Functions        */
  /*-   -   -   -   -   -   -   */

// pass themFunction to eda website
async function changeTheme(themeFunction, ...args) {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab.url.match(/.*handbook\.eda\.nz.*/)) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: themeFunction,
      args: [...args],
    });
  } else { // if not on eda website
    let popup = document.querySelector('body');
    popup.innerHTML = '';
    popup.textContent = "Only works on handbook.eda.nz";
  }
}

// create style element
const styleElement = document.createElement("style");
styleElement.setAttribute("id", "eda-test");
document.getElementsByTagName("head")[0].appendChild(styleElement);


  /*-   -   -   -   -   -*/
  /*        Themes       */
  /*-   -   -   -   -   -*/

 // Dark Theme 
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

// Light / default theme
function changeLight() {
  document.getElementById("eda-chrome-extension-styles").remove();
}

// Selected Colour Theme
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
}

  /*-   -   -   -   -   -   -   - */
  /*     Helper/Util Functions    */
  /*-   -   -   -   -   -   -   - */


