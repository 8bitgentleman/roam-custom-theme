
{
    /* Original code by matt vogel */
    /* Source: https://github.com/8bitgentleman/roam-custom-theme  */
    /* v1  */
    // creates a right click menu plugin which will convert copied text bullet list to roam without the funky formatting

    async function pasteBullets(e) {
        // log the context (block uid)
        console.log(e);
        // get the clipboard text
        const clipText = await navigator.clipboard.readText();
        // log the clipboard
        // console.log(clipText);

        // split into rows by the ENTER key
        // clipRows = clipText.split(String.fromCharCode(13));
        rawRows = clipText.split(/\r?\n/);
        // console.log(rawRows);

        
        var clipRows = rawRows.filter(function(el) { return el; });

        console.log(clipRows);
        
        for (i = 0; i < clipRows.length; i++) {
          var uid = window.roamAlphaAPI.util.generateUID();
          //console.log(clipRows[i].replace(/[•\t.+]/g, ''))
          let noBullet = clipRows[i].replace(/[•\t.+]/g, '')
          window.roamAlphaAPI.createBlock({
                    "location": {
                        "parent-uid": e,
                        "order": "last"
                    },
                    "block": {
                        "uid": uid,
                        "string": noBullet
                    }
                })
        }

        
    }

    roamAlphaAPI.ui.blockContextMenu.addCommand({
        label: "Paste Text Lists",
        callback: (e) => pasteBullets(e['block-uid'])
    })
}

