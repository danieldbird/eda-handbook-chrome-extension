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
// colorSelector.addEventListener("input", (e) => changeTheme({ customTemplate = { templateFunction : colorThemeTemplate, templateArgs : e.target.value } }));


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
function applyTheme ({reset = false, theme=null, customTemplate = {templateFunction: null, templateArgs: null}}) {
  //if reset = true passed, remove style element and exit function
  if (reset) { 
    getStyleEl() && getStyleEl().remove();
    location.reload();
    return;
  };

  //if customTemplate has been added, call templateFunction(template Args) to create themeCSS, otherwise use theme
  let themeCSS;
  if (customTemplate.templateFunction && customTemplate.templateArgs) {
    themeCSS = customTemplate.templateFunction( customTemplate.templateArgs );
  } else {
    themeCSS = createCSS(theme);
  }
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

function colorThemeTemplate (hValue) {
  // create colours based on hValue from slider
  let theme = {
    primary : `hsl(${hValue}deg, 100%, 10%)`,
    secondary : `hsl(${hValue}deg, 20%, 10%)`,
    tertiary : `hsl(${hValue}deg, 5%, 50%)`,
    accent : `hsl(${hValue}deg, 80%, 50%)`,
    textPrimary : `hsl(${hValue}deg, 0%, 100%)`,
    textSecondary : `hsl(${hValue}deg, 0%, 80%)`,
  };
  // use default css template to create themeCSS
  return createCSS(theme)
}