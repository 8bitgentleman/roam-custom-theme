
<h3 align="center">Roam JS Plugins</h3>

---

<p align="center"> A collection of custom components for <a href="https://roamresearch.com">Roam Research</a>, writing in roam/render with clojurescript.
    <br>
</p>

## 📝 Table of Contents
- [Installing](#getting_started)
- [Plugins](#plugins)
  - [export-block.js](#export)
  - [random.js](#random)
  - [bulletpath.js](#bulletpath)
  - [alias-selection.js](#alias)
  - [htmlTableToRoam.js](#table)

- [Authors](#authors)

## 🏁 Installing <a name = "getting_started"></a>

### Importing
To install a plugin copy the code (contents of the JS file) into a roam javascript code block nested under `{{[[roam/js]]}}`.


## 🤖 Plugins <a name = "plugins"></a>


- ### export-block.js <a name = "export"></a>
  Adds an option to the right click menu to export a block and all its children as flat markdown. 
  Also included is a .json file for easy import into Roam 

- ### random.js <a name = "random"></a>
  Adds a button to the left sidebar to take you to a random page. 

- ### bulletpath.js <a name = "bulletpath"></a>
    CSS and usibility modifications to the infamous bulletpath JS hack by Azlen Elza

- ### alias-selection.js <a name = "alias"></a>
    Right-Click menu plugin: Converts the selected text in a block into an alias. To use select text in a block then select the plugin from the right clicke block menu. The new alias can then be pasted anywhere.

- ### htmlTableToRoam.js <a name = "table"></a>
    Right-Click menu plugin: Converts an HTML table copied to the clipboard into a Roam Table format. To use select the table text from a webpage ([this table](https://www.w3schools.com/html/html_tables.asp) used for testing) then in roam select the plugin from the right click block menu.

- ### copyBlockURL.js <a name = "table"></a>
    Right-Click menu plugin: Copies the external URL for a specific block to your clipboard

## ⛏️ Built Using <a name = "built_using"></a>
- javascript

## ✍️ Authors <a name = "authors"></a>
- [Matt Vogel](https://github.com/8bitgentleman) - Idea & Initial work
