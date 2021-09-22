
/* Original code by matt vogel https://github.com/8bitgentleman/roam-custom-theme */
/* Takes the selected text and aliases it and its block [SELECTED_TEXT](((PARENT_BLOCK_UID)))*/ 
{
    function getSelectionText() {
      /*from here https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text*/
      var text = "";
      if (window.getSelection) {
          text = window.getSelection().toString();
      } else if (document.selection && document.selection.type != "Control") {
          text = document.selection.createRange().text;
      }
      return text;
  }
    
    function aliasSelection(blockUID){
      selection = getSelectionText()
		navigator.clipboard.writeText("[" + selection + "](((" + blockUID + ")))");

    }
    roamAlphaAPI.ui.blockContextMenu.addCommand(
        {label: "Alias Selected Text",  
        callback: (e)=>aliasSelection(e['block-uid'])
        }
    )
}

