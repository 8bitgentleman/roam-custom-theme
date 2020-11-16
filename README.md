# roam-custom-themes
These are several new and adjusted css themes for [[Roam Research]]. 

*WARNING*
As of today, 11/11/2020 there are several Roam changes that have broken Core.css. [There is a tempoary, unofficial fix](https://twitter.com/ViktorTabori/status/1324811596326199303?s=19) but it isn't perfect.

## Custom Data Tags
My custom tag colors and adjustements. I keep these mostly the same across themes so I saved them here and can import them with one line.

```css
@import url("hhttps://rawcdn.githack.com/8bitgentleman/roam-custom-theme/8bf977b596b4c5516139f6ae8da8a8ddb4f1db92/Custom data tags.css");
```

## Zenithdecker Core
I have ported Maggie Appleton's excellent [Zenithdecker theme](https://github.com/theianjones/roam-research-themes/blob/master/zenithdecker.css) over to use Azlen's [core.css](https://azlen.github.io/roam-themes/core.css) horizontal and mobile adjustments. 

```css
@import url('https://rawcdn.githack.com/8bitgentleman/roam-custom-theme/8bf977b596b4c5516139f6ae8da8a8ddb4f1db92/zenithdecker_core.css');
```


## Leyendarker_core
Updated Leyendarker to use core.css
I have ported Maggie Appleton's excellent [Leyendarker theme](https://github.com/theianjones/roam-research-themes/blob/master/leyendarker.css) over to use Azlen's [core.css](https://azlen.github.io/roam-themes/core.css) horizontal and mobile adjustments. 
```css
@import url('https://rawcdn.githack.com/8bitgentleman/roam-custom-theme/8bf977b596b4c5516139f6ae8da8a8ddb4f1db92/layendarker_core.css');
```



## [~ PANIC ~](https://github.com/8bitgentleman/roam-custom-theme/blob/master/~PANIC~.css)
A roam version of the PANIC theme from the mac notes app, Bear

![](https://dcblog.dev/assets/images/blog/tools/bearapp/bearapp.png)

Can be used by importing this CSS exactly
```css
/*THEME::PANIC MODE
CREATOR:: AZLEN(Core CSS), Matthew Vogel(Panic Flavor), BearApp(Concept)
*/
/* IMPORT ~PANIC~ THEME */
@import url('https://rawcdn.githack.com/8bitgentleman/roam-custom-theme/8bf977b596b4c5516139f6ae8da8a8ddb4f1db92/~PANIC~.css');

.rm-alias, .rm-alias-external,
.rm-alias-external:hover {
  background-color: rgba(89, 193, 218, .1) !important;

  padding: 3px 4px;
  line-height: 1.4em;
  border-radius: 4px;
}
/* ----- revert direction of sidebar pages -----*/

#roam-right-sidebar-content {
    flex-direction: row !important;

}
/* block refs*/
.rm-embed-margin-action{
	background-color: rgb(247,180,69) !important;
} 
.rm-embed-container{
  	background-color: rgba(247,180,69, .1) !important;
}
```
