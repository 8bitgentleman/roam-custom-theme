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
  var element = document.body;
  element.classList.toggle("rm-dark-theme");
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