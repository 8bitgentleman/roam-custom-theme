/* This is a mashup of 2 extensions with some of my own improvements sprinkled in*/
/* abhey's imfeelinglucky https://github.com/abhayprasanna/abhayprasanna.github.io/blob/master/imfeelinglucky.js */
/* and the random page plugin https://github.com/oschmid/roam-plugins/blob/master/random-page-plugin.js */

function randomPagePlugin() {
  function isMac() {
    return window.navigator.platform.startsWith('Mac');
  }
  
  // settings
  const title = "I'm Feeling Lucky";
  const shortcut = isMac() ? {ctrlKey: true, key: "r"} : {altKey: true, key: "r"};
  const buttonLocation = "sidebar" //sidebar or topbar
  const icon = 'bp3-button bp3-minimal bp3-icon-random pointer bp3-small';

  function addSideButton() {
    if (!document.getElementById('randomDiv')) {
      var divRandom = document.createElement('div');
      divRandom.classList.add('log-button');
      divRandom.innerHTML = title;
      divRandom.id = 'randomDiv';
      var spanRandom = document.createElement('span');
      spanRandom.classList.add('bp3-icon', 'bp3-icon-random', 'icon');
      divRandom.prepend(spanRandom);
      var sidebarcontent = document.querySelector("#app > div.roam-body > div.roam-app > div.roam-sidebar-container.noselect > div"),
          sidebartoprow = sidebarcontent.childNodes[1];
      if (sidebarcontent && sidebartoprow) {
        sidebartoprow.parentNode.insertBefore(divRandom, sidebartoprow.nextSibling);    
      }
      divRandom.onclick = goToRandomPage; //run the function onclick
    }
  }

  function addTopButton() {
    // cleanup old versions of the button
    var randomButton = document.querySelector('#random-button');
    if (randomButton != null) {
      randomButton.parentNode.removeChild(randomButton);
    }
    // create button
    var template = document.createElement('template');
    template.innerHTML = '<span id="random-button" title="' + title + '" class="' + icon + '"></span>';
    template.content.firstChild.onclick = goToRandomPage;
    randomButton = template.content.firstChild;
    
    // create spacer
    var spacer = document.querySelector('#random-spacer');
    if (spacer != null) {
      spacer.parentNode.removeChild(spacer);
    }
    template.innerHTML = '<div id="random-spacer" class="rm-topbar__spacer-sm"></div>';
    spacer = template.content.firstChild;

    // insert button into topbar
    const search = document.querySelector('.rm-topbar .rm-find-or-create-wrapper');
    search.insertAdjacentElement('afterend', randomButton);
    search.insertAdjacentElement('afterend', spacer);
  }

  function addKeyboardShortcut() {
    document.onkeyup = function(e) {
      if (shortcut.ctrlKey && !e.ctrlKey) return;
      if (shortcut.shiftKey && !e.shiftKey) return;
      if (shortcut.altKey && !e.altKey) return;
      if (shortcut.key === e.key) goToRandomPage(e);
    }
  }

  function goToRandomPage(e) {
      const randomPageUID = roamAlphaAPI.q('[:find [(rand 1 ?page-uid)] :where [?e :node/title] [?e :block/uid ?page-uid] ]')[0][0];
      const db = location.hash.split('/')[2];
      if (e.shiftKey) {
        roamAlphaAPI.ui.rightSidebar.addWindow(
          {window:
            {type:'outline',
            'block-uid':randomPageUID}})
      } else {
        location.assign('/#/app/' + db + '/page/' + randomPageUID);
    }
  }

  if (buttonLocation == "topbar") {
    addTopButton();
  } else if (buttonLocation == "sidebar") {
    addSideButton();
  }
  addKeyboardShortcut();
}
setTimeout(randomPagePlugin, 0);