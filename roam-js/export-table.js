/*
 * Copyright (c) 2021 Matt Vogel
 *
 * See the LICENSE file (MIT).
 */

// we use an "immediately invoked function expression"
// so our declarations don't become global properties
// because that might conflict with other extensions
(function () {
    function arrayToMarkdown(tableArray){
        var masterTable = [];
        // find the length of the longest row
        var longest = tableArray.reduce((maxI,el,i,arr) => (el.length>arr[maxI].length) ? i : maxI, 0);
        
        //fill the column name array with dummy info if it's too short
        if(tableArray[0].length < tableArray[longest].length){
            lengthDif = tableArray[longest].length - tableArray[0].length;
            fillArray = Array(lengthDif).fill("-");
            tableArray[0] = tableArray[0].concat(fillArray);
        }
        //header seperator row needs to be added last after calcs are done
        var header = Array.from(tableArray[longest]);
        tableArray.splice(1, 0, header.fill('-'));

        // convert the array to text 
        tableArray.forEach(function (item, index) {
            if(item.length>1){
                masterTable.push(item.join('|'))
            }else{
                masterTable.push(item.toString() + '|')
            }
        // console.log(masterTable.join('\n'));
        
        });
        return masterTable.join('\n')
    }
    function expandChildren(block, level = 0, viewType = 'bullet', table=false) {
        const lines = []
        block.children?.forEach((block) => {
            var row = []
            row.push(block.string)
            row.push(expandChildren(block, level + 1, viewType))
            lines.push(row.flat(Infinity));
        })
        return lines
    }

    // grab raw data from graph
    // turn each child into an orderly array
    let queryText = `[:find (pull ?e [
                                :node/title 
                                :block/string
                                :block/order
                                :block/heading
                                :block/text-align
                                :block/refs
                                :children/view-type
                                :block/children 
                                {:block/children ...}
                                ]) 
                            :in $ ?parentUID
                            :where [?e :block/uid ?parentUID]]`;
        blockInfo = window.roamAlphaAPI.q(queryText, "tD4EBI1WW")[0][0];
        // window.roamAlphaAPI.q(queryText, parentUID);
        rowArrays = expandChildren(blockInfo)
        // console.log(rowArrays)
        markdown = arrayToMarkdown(rowArrays)
        console.log(markdown)
        // return markdown
})()