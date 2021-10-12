{
    function exportToMarkdownFile(markdownData, fileName) {
        let dataUri = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(markdownData);

        let exportFileDefaultName = fileName + '.md';

        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    function searchForRef(uid){
        let queryText = `[:find (pull ?e [
                        :block/string
                        :block/order
                        :block/heading
                        :block/text-align
                        ]) 
                    :in $ ?uid
                    :where [?e :block/uid ?uid]]`;
        blockInfo = window.roamAlphaAPI.q(queryText, uid)[0][0];
        return blockInfo
    }

    function renderText(text){
      "Convert Roam specific markdown to regular markdown"
      // searching for block aliases [Use Humor to soften](((RXUbeHekc)))
      regexp = /\[([^\[\]]+?)\]\(\(\((.+?)\)\)\)/gm
      blockAliases = [...text.matchAll(regexp)];
      if (blockAliases.length != 0) {
        blockAliases.forEach((a) => {
          // console.log(a[1])
          text = text.replace(a[0], a[1])
          // console.log(text)

        })
      }

      // searching for block refs ((RXUbeHekc))
      regexp = /\(\((.+?)\)\)/gm;
      matches = [...text.matchAll(regexp)];
      if (matches.length != 0) {
        matches.forEach((m) => {
          // console.log(m[1])
          rev = searchForRef(m[1]).string
          text = text.replace(m[0], rev)
          // console.log(text)

        })
      }

      //search for block quotes >
      regexp = /\[\[\>\]\]/gm
      blockQuotes = [...text.matchAll(regexp)];
      if (blockQuotes.length != 0) {
        blockQuotes.forEach((a) => {
          // console.log(a[1])
          text = text.replace(a[0], '>')
          // console.log(text)

        })
      }
      return text
    }

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
    
    function expandTableChildren(block, level = 0, viewType = 'bullet') {
      // need to handle the first column somehow
        const tableLines = []
        block.children?.forEach((child) => {
            var row = []
            let content = renderText(child.string)

            // newlines are handled differently inside tables
            if (content.includes('\n')){
                content = content.replaceAll('\n', `<br />`)
            }
            row.push(content)
            row.push(expandTableChildren(child, level + 1, viewType))
            tableLines.push(row.flat(Infinity));
        })
        // console.log(tableLines)
        return tableLines
    }
    
    function expandChildren(block, level = 0, viewType = 'bullet') {
        const lines = []
        let indentPrefix = ''
        let prefix = ''
        // if (level >= 1) indentPrefix = '\t'.repeat(level)
        let content = renderText(block.string)
        
        //Blocks can have newlines inside them
        if (content.includes('\n')){
            let new_content = content.trimEnd()
            new_content = new_content.replace('\n', `\n${indentPrefix} `)
            content = new_content + '\n'
        }
        // if there are children make sure they are in the correct order
        block.children?.sort((a, b) => a.order - b.order );

        if (!block.string.startsWith("{{[[table]]}}")){
          if (block.heading) prefix = '#'.repeat(block.heading)
          // else if (viewType == 'numbered') prefix += block.order + 1 + "."
          // else if (viewType == 'document') prefix += ''
          // else if (viewType == 'bullet') prefix += '*'
          else prefix += '*'
          lines.push(`${indentPrefix}${prefix} ${content}`)
        
          block.children?.forEach((child) => {
              if (!child['view-type'] ) viewType = 'bullet'
              // else if (child['view-type'] == 'numbered') viewType = 'numbered'
              // else if (child['view-type'] == 'document') viewType = 'numbered'
              // else if (child['view-type'] == 'bullet') viewType = 'bullet'
              if (child.string.startsWith("{{[[table]]}}")){
                // console.log(child);
                rowArrays = expandTableChildren(child, level + 1)
                lines.push("")
                lines.push(arrayToMarkdown(rowArrays))
              } else {
                lines.push(expandChildren(child, level + 1, viewType))
              }
          })
        } else {
          block.children?.forEach((child) => {
            rowArrays = expandTableChildren(child, level + 1)
            console.log(child)
            lines.push("")
            lines.push(arrayToMarkdown(rowArrays))
          })
        }
        

        
        return lines.join('\n')
    }

    function exportBlock(parentUID){
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
        blockInfo = window.roamAlphaAPI.q(queryText, parentUID)[0][0];
        // window.roamAlphaAPI.q(queryText, parentUID);
        markdown = expandChildren(blockInfo)
        // console.log(markdown)
        exportToMarkdownFile(markdown, "block export")
    }
    // exportBlock("fGZjyJFJS")
    exportBlock("gDoqwyWsI")
    // exportBlock("jW880zNwy")
    // roamAlphaAPI.ui.blockContextMenu.addCommand(
    //     {label: "Export to Markdown",  
    //     callback: (e)=>exportBlock(e['block-uid'])
    //     }
    // )
}