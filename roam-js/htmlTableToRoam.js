{
    /* Original code by matt vogel */
    /* Source: https://github.com/8bitgentleman/roam-custom-theme  */
    /* v1  */
    // creates a right click menu plugin which will convert a copied HTML table to a roam table
    // this table was used as reference https://www.w3schools.com/html/html_tables.asp

    async function pasteTable(e) {
        // log the context (block uid)
        console.log(e);
        // get the clipboard text
        const clipText = await navigator.clipboard.readText();
        // log the clipboard
        console.log(clipText);

        // split into rows by the ENTER key
        // clipRows = clipText.split(String.fromCharCode(13));
        clipRows = clipText.split(/\r?\n/);
        console.log(clipRows);

        // split rows into columns
        for (i = 0; i < clipRows.length; i++) {
            clipRows[i] = clipRows[i].split(String.fromCharCode(9));
        }
        console.log(clipRows);

        // 
        // create the roam table here
        // 
        tableUID = window.roamAlphaAPI.util.generateUID();
        window.roamAlphaAPI.updateBlock({
            "block": {
                "uid": e,
                "string": "{{[[table]]}}"
            }
        })


        function createRow(e, row) {

            var parentUID = e
            for (i = 0; i < row.length; i++) {
                var uid = window.roamAlphaAPI.util.generateUID();

                window.roamAlphaAPI.createBlock({
                    "location": {
                        "parent-uid": parentUID,
                        "order": "last"
                    },
                    "block": {
                        "uid": uid,
                        "string": row[i]
                    }
                })
                parentUID = uid;
            }
        }
        for (r = 0; r < clipRows.length; r++) {
            createRow(e, clipRows[r])
        }
    }

    roamAlphaAPI.ui.blockContextMenu.addCommand({
        label: "Paste HTML Table",
        callback: (e) => pasteTable(e['block-uid'])
    })
}
