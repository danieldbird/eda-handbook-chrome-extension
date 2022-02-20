  /*-   -   -   -   -   -   -   */
  /*    buttons and listeners   */
  /*-   -   -   -   -   -   -   */

//get buttons/inputs
const changeDarkBtn = document.getElementById("changeDarkBtn");
const changeLightBtn = document.getElementById("changeLightBtn");
const colorSelector = document.querySelector("#colorRange");

//add listeners
changeLightBtn.addEventListener("click", () => changeTheme( { reset : true } ));
changeDarkBtn.addEventListener("click", () => changeTheme( { theme : darkTheme } ));
colorSelector.addEventListener("input", (e) => changeTheme({ customTheme :  colorTheme( e.target.value ) }));


  /*-   -   -   -   -   -   -   */
  /*      Main Functions        */
  /*-   -   -   -   -   -   -   */

// pass addTheme and theme to EDA website and run with given args
async function changeTheme(...args) {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab.url.match(/.*handbook\.eda\.nz.*/)) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: applyTheme,
      args: [...args],
    });
  } else {
    let popup = document.querySelector('body');
    popup.innerHTML = '';
    popup.textContent = "Only works on handbook.eda.nz";
  }
}

// add create the theme css add add/update <style> tags  - or remove style tags
function applyTheme ( {reset = false, theme = null, customTheme = null} ) {

  //if reset = true passed, remove style element and exit function
  if (reset) { 
    getStyleEl() && getStyleEl().remove();
    location.reload();
    return;
  };

  //if a custom theme  has been added use that, otherwise create the css using default template and theme object
  let themeCSS = customTheme || createCSS(theme);

  // use theme to create css and add to the DOM
  addStyleElement(themeCSS);

  //-- Functions to add to 

  //add <style> element with theme css to the DOM
  function addStyleElement (css) {
    let styleEl = getStyleEl();
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.classList.add(".eda-chrome-extension-styles");
      document.querySelector('head').appendChild(styleEl);
    };
    styleEl.innerHTML = css;
  }

  // use standard template with theme object to create CSS
  function createCSS (theme) {
    let { primary, secondary, tertiary, accent, textPrimary, textSecondary } = theme;
    return (`
      body, main { background: ${secondary} !important; }
      .navBarDefault, aside, .previousBtn, .nextBtn { background: ${primary} !important; }
      p , li, ul, a, h1, h2, h3, h4, h5 { color: ${textSecondary} !important; }
      table, thead, tr, td, th { background: ${secondary}; color: ${textPrimary}; }
      ::-webkit-scrollbar { width: 1em; background: ${tertiary}; }
      //::-webkit-scrollbar-track { box-shadow: inset 0 0 6px ${accent}; }
      ::-webkit-scrollbar-thumb { background-color: ${primary}; outline: 1px solid ${secondary}; }
    `)
  }
  
    //get Style element
  function getStyleEl () {
    return document.querySelector(".eda-chrome-extension-styles")
  }
};


  /*-   -   -   -   -   -*/
  /*        Themes       */
  /*-   -   -   -   -   -*/
 
const darkTheme = {
  primary : `#555`,
  secondary : `#111`,
  tertiary : `#ddd`,
  accent : `#fff`,
  textPrimary : `#ccc`,
  textSecondary : `#ccc`,
}

const midnightTheme = {
  primary : `#555`,
  secondary : `#111`,
  tertiary : `#ddd`,
  accent : `#fff`,
  textPrimary : `#ccc`,
  textSecondary : `#ccc`,
}

function colorTheme (hValue) {
  // create colours based on hValue from slider
  let primary = `hsl(${hValue}deg, 50%, 10%)`;
  let secondary = `hsl(${hValue}deg, 60%, 12%)`;
  let tertiary = `hsl(${hValue}deg, 5%, 50%)`;
  let accent = `hsl(${hValue}deg, 80%, 50%)`;
  let textPrimary = `hsl(${hValue}deg, 0%, 100%)`;
  let textSecondary = `hsl(${hValue}deg, 0%, 80%)`;
  // use default css template to create themeCSS
  return (`
  body, main, .css-1p56bun { background: ${secondary} !important; }
  .navBarDefault, aside, .previousBtn, .nextBtn { background: ${primary} !important; }
  p , li, ul, a, h1, h2, h3, h4, h5 { color: ${textSecondary} !important; }
  table, thead, tr, td, th { background: ${secondary}; color: ${textPrimary}; }
  ::-webkit-scrollbar { width: 1em; background: ${tertiary}; }
  //::-webkit-scrollbar-track { box-shadow: inset 0 0 6px ${accent}; }
  ::-webkit-scrollbar-thumb { background-color: ${primary}; outline: 1px solid ${secondary}; }
`)
}