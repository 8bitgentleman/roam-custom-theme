(() => {
  const createIconButton = (icon) => {
const popoverButton = document.createElement("span");
popoverButton.className = "bp3-button bp3-minimal bp3-small";
popoverButton.tabIndex = 0;

const popoverIcon = document.createElement("span");
popoverIcon.className = `bp3-icon bp3-icon-${icon}`;

popoverButton.appendChild(popoverIcon);

return popoverButton;
  };

  function toggleDarkMode() {    
      if (document.body.classList.contains("rm-dark-theme")){
          // switch to light mode
          let lbtn = document.getElementsByClassName('bp3-icon-flash')[0];
          lbtn.classList.remove('bp3-icon-flash');
          lbtn.classList.add('bp3-icon-moon');
              document.body.classList.toggle("rm-dark-theme")
      } else {
          // switch to dark mode
          let btn = document.getElementsByClassName('bp3-icon-moon')[0];
          btn.classList.remove('bp3-icon-moon');
          btn.classList.add('bp3-icon-flash');
          document.body.classList.toggle("rm-dark-theme")
          
      }
  };

  var iconName = 'moon'
  var nameToUse = 'toggleDarkMode';

  var checkForButton = document.getElementById(`${nameToUse}-flex-space`);
  if (!checkForButton) {
  var mainButton = createIconButton(iconName);
  var roamTopbar = document.getElementsByClassName("rm-topbar");

  var nextIconButton = roamTopbar[0].lastElementChild;
  var flexDiv = document.createElement("div");
  flexDiv.className = "rm-topbar__spacer-sm";
  flexDiv.id = nameToUse + "-flex-space";

  var flexDivAfter = document.createElement("div");
  flexDivAfter.className = "rm-topbar__spacer-sm";
  flexDivAfter.id = nameToUse + "-flex-space-after";
  
  nextIconButton.insertAdjacentElement("afterend", mainButton);
  mainButton.insertAdjacentElement("beforebegin", flexDiv);
  mainButton.insertAdjacentElement("afterend", flexDivAfter);
  mainButton.addEventListener("click", toggleDarkMode);
  }
})();