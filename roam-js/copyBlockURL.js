
{
  /* Original code by matt vogel */
  /* Source: https://github.com/8bitgentleman/roam-custom-theme  */
  /* v1  */
  // creates a right click menu plugin which will copy the external URL for a specific block to your clipboard

  async function copyBlockURL(e) {
      // log the context (block uid)
      const db = location.hash.split('/')[2];
      // construct url
      let url = 'https://roamresearch.com/#/app/' + db + '/page/' + e;

      navigator.clipboard.writeText(url).then(function() {
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });

      
  }

  roamAlphaAPI.ui.blockContextMenu.addCommand({
      label: "Copy Block URL",
      callback: (e) => copyBlockURL(e['block-uid'])
  })
}

