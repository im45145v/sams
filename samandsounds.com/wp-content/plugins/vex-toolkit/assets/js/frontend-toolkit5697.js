var themeToolkit=function(){"use strict";const e=document;return e.addEventListener("AXStartJS",function(e){themeToolkit.reload()}),e.addEventListener("DOMContentLoaded",function(){themeToolkit.init()}),{loaded:!1,init:function(){this.lightbox.init(),this.events.list(),this.player.init(),this.disqus()},reload:function(){this.lightbox.init(),this.events.list(),this.player.update(),this.disqus()},lightbox:{init:function(){themeToolkit.lightbox;if(document.querySelector(".fx-lightbox")){const e=document.querySelectorAll(".fx-lightbox");for(let t of e)t.addEventListener("click",e=>{let o=t.getAttribute("data-lb-id");if(!1===o||null===o)return;let r=document.querySelector("#"+o);if(r){let e=basicLightbox.create(r.innerHTML,{className:"fx-cursor fx-cursor-close"});e.show(()=>{document.querySelector(".basicLightbox .lightbox__inner").addEventListener("click",()=>e.close()),theme.cursor.update(".basicLightbox"),document.querySelector("#cursor")&&document.querySelector("#cursor").classList.add("close")})}})}}},events:{init:function(){themeToolkit.events},list:function(){if(document.querySelector(".events-list .event-list-item")){let e=document.querySelectorAll(".events-list .event-list-item"),t=document.querySelector(".events-list");for(let o of e)o.addEventListener("mouseover",e=>{t.classList.add("is-hover"),o.classList.add("is-active")}),o.addEventListener("mouseout",e=>{t.classList.remove("is-hover"),o.classList.remove("is-active")})}}},player:{sound:!1,bgPlayer:null,BgPlayerPlaying:!1,isBgPlayer:!1,bgSrcInit:null,volInterval:null,volume:.8,smoothTrans:!0,progressBar:null,mousedown:!1,firstLoad:!1,moveBar:!1,init:function(t){let o=themeToolkit.player,r=e.querySelector(".bg-player.rt-player");if(r){let t=e.querySelector(".rt-player-audio");if(o.bgPlayer=r,o.bgSrcInit=r.getAttribute("href"),t){let e=t.getAttribute("data-audio");o.bgPlayer.setAttribute("href",e)}}o.setPlayers()},setPlayers:function(){let t=themeToolkit.player,o=e.querySelectorAll(".rt-player");for(let e of o)e.hasPlayer&&!0===e.hasPlayer||(e.hasPlayer=!0,e.addEventListener("click",e=>{t.trigger(e.currentTarget),e.preventDefault()},!0))},progress:function(){let e=themeToolkit.player,t=(e.sound.target,e.sound.duration),o=e.sound.currentTime,r=e.calculateTotalValue(t),s=e.calculateCurrentValue(o);if(e.sound.tracklist){let l=e.sound.listItem.querySelector(".audio-ctrl__elapsed"),n=e.sound.listItem.querySelector(".audio-ctrl__total"),a=e.sound.listItem.querySelector(".audio-ctrl__position");l.innerHTML=s,n.innerHTML=r;let i=100*o/t;i=i.toFixed(2),a.style.width=i+"%",o>=t&&e.playNext()}!0===e.firstLoad&&o>0&&(e.firstLoad=!1,e.clearStatus(),e.addClasses("is-player-playing"),e.firstLoad)},seek:function(e){let t=themeToolkit.player;if(t.sound.currentTime){let o=t.sound.listItem.querySelector(".audio-ctrl__position"),r=e.offsetX/this.offsetWidth,s=r*t.sound.duration;t.sound.currentTime=s;let l=100*r;l=l.toFixed(2),o.style.width=l+"%"}},scrub:function(e){let t=themeToolkit.player;if(t.sound.currentTime&&t.mousedown){t.moveBar=!0,t.sound.pause();let o=t.sound.listItem.querySelector(".audio-ctrl__position"),r=e.offsetX/this.offsetWidth,s=r*t.sound.duration;t.sound.currentTime=s;let l=100*r;l=l.toFixed(2),o.style.width=l+"%"}!1===t.mousedown&&!0===t.moveBar&&(t.moveBar=!1,t.sound.play())},addNewListeners:function(){let e=themeToolkit.player;null!==e.progressBar&&(e.progressBar.removeEventListener("click",e.seek),e.progressBar.removeEventListener("mousedown",()=>mousedown=!0),e.progressBar.removeEventListener("mouseup",()=>mousedown=!1),e.progressBar.removeEventListener("mousemove",e.scrub)),e.progressBar=e.sound.listItem.querySelector(".audio-ctrl__progress"),e.progressBar.addEventListener("click",e.seek),e.progressBar.addEventListener("mousedown",()=>e.mousedown=!0),e.progressBar.addEventListener("mouseup",()=>e.mousedown=!1),e.progressBar.addEventListener("mousemove",e.scrub)},trigger:function(e){let t=themeToolkit.player,o=e.getAttribute("href");if(t.firstLoad=!1,!1!==o&&"#"!==o&&""!==o){if(!0===t.isBgPlayer&&t.sound&&(t.sound.paused?t.BgPlayerPlaying=!1:t.BgPlayerPlaying=!0),!1===t.sound&&(t.sound=new Audio(o),t.sound.ontimeupdate=t.progress,t.sound.addEventListener("error",t.error),t.sound.target=e,t.firstLoad=!0),t.sound.src===o&&!1!==t.sound.target.isEqualNode(e)||(t.sound.src=o,t.firstLoad=!0),!0===t.firstLoad){if(t.sound.reactWIth=null,e.getAttribute("data-react-with")){let o=e.getAttribute("data-react-with");document.querySelector(o)&&(t.sound.reactWIth=document.querySelector(o))}if(e.getAttribute("data-list")){let o=e.getAttribute("data-list");t.sound.tracklist=document.getElementById(o),t.sound.listItem=themeToolkit.getClosest(e,".rt-player-list__item"),t.sound.listLength=t.sound.tracklist.querySelectorAll(".rt-player-list__item").length,t.sound.index=t.listIndex(t.sound.listItem),t.sound.loop=!1,t.addNewListeners()}null===e.getAttribute("data-list")&&(t.sound.loop=!0,t.sound.tracklist=null,t.sound.listItem=null),e.classList.contains("bg-player")?t.isBgPlayer=!0:t.isBgPlayer=!1}t.sound.target=e,t.togglePlay(t.sound)}},clearStatus:function(){let t=e.querySelectorAll(".is-player-playing"),o=e.querySelectorAll(".is-player-paused"),r=e.querySelectorAll(".is-player-loading");for(let e of t)e.classList.remove("is-player-playing");for(let e of o)e.classList.remove("is-player-paused");for(let e of r)e.classList.remove("is-player-loading")},addClasses:function(e){let t=themeToolkit.player;t.sound.target.classList.add(e),t.sound.listItem&&t.sound.listItem.classList.add(e),t.sound.reactWIth&&t.sound.reactWIth.classList.add(e)},togglePlay:function(e){let t=themeToolkit.player;e.target;t.clearStatus(),!0===t.firstLoad?(t.addClasses("is-player-loading"),setTimeout(()=>{e.play()},150)):e.paused?(t.addClasses("is-player-playing"),setTimeout(()=>{e.play()},150)):(t.addClasses("is-player-paused"),e.pause())},playNext:function(){let e=themeToolkit.player;if(e.sound.tracklist){let t=e.sound.listLength,o=e.sound.index;++o===t&&(o=0);let r=e.sound.tracklist.querySelectorAll(".rt-player-list__item")[o].querySelector(".rt-player");r&&e.trigger(r)}},setVolDown:function(e){let t=themeToolkit.player,o=t.sound.volume;t.volInterval=setInterval(function(){o>0&&(o-=.1,t.sound.volume=o<0?0:o),0===t.sound.volume&&(clearInterval(t.volInterval),e())},200)},setVolUp:function(e){let t=themeToolkit.player,o=0;t.volInterval=setInterval(function(){o<t.volume&&((o+=.1)>t.volume?t.sound.volume=t.volume:t.sound.volume=o),t.sound.volume===t.volume&&clearInterval(t.volInterval)},200)},smooth:function(e){let t=themeToolkit.player;clearInterval(t.volInterval),t.smoothTrans?t.setVolDown(function(){t.sound.src=e,t.sound.volume=0,t.firstLoad=!0,t.togglePlay(t.sound,t.bgPlayer),t.setVolUp()}):(t.firstLoad=!0,t.sound.src=src,t.togglePlay(t.sound,t.bgPlayer))},setBgPlayer:function(){let t=themeToolkit.player;if(null===t.bgPlayer)return;let o=e.querySelector(".rt-player-audio"),r=t.bgSrcInit,s=t.bgPlayer.getAttribute("href");o?s=o.getAttribute("data-audio"):s!==r&&(s=r),t.bgPlayer.setAttribute("href",s),t.sound&&(t.sound.target=t.bgPlayer,!1===t.sound.paused&&t.sound.currentSrc!==s?t.smooth(s):t.sound.paused&&t.sound.currentSrc!==s&&(t.sound.src=s,t.sound.volume=t.volume))},calculateTotalValue:function(e){isNaN(e)&&(e=0);let t=Math.floor(e/60);return t+":"+(e-60*t).toString().substr(0,2)},calculateCurrentValue:function(e){isNaN(e)&&(e=0);parseInt(e/3600);let t=parseInt(e/60)%60,o=(e%60).toFixed();return(t<10?"0"+t:t)+":"+(o<10?"0"+o:o)},listIndex:function(e){for(var t=0;e.previousElementSibling;)e=e.previousElementSibling,t++;return t},error:function(e){let t=themeToolkit.player;switch(e.target.error.code){case e.target.error.MEDIA_ERR_ABORTED:console.log("You aborted the media playback.");break;case e.target.error.MEDIA_ERR_NETWORK:console.log("A network error caused the media download to fail.");break;case e.target.error.MEDIA_ERR_DECODE:console.log("The media playback was aborted due to a corruption problem or because the media used features your browser did not support.");break;case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:console.log("The media could not be loaded, either because the server or network failed or because the format is not supported.");break;default:console.log("An unknown media error occurred.")}t.playNext()},update:function(){let e=themeToolkit.player;e.sound&&e.sound.target&&(!1===e.sound.target.classList.contains("bg-player")&&!1===e.BgPlayerPlaying?e.setVolDown(function(){e.sound=!1,e.clearStatus()}):e.setBgPlayer()),e.setPlayers()}},disqus:function(){if(document.querySelector("#disqus_thread")){let e=document.querySelector("#disqus_thread").getAttribute("data-post_id"),t=document.querySelector("#disqus_thread").getAttribute("data-disqus_shortname"),o=document.querySelector("#disqus_title").textContent,r=window.location.href,s=location.protocol;if("undefined"!=typeof DISQUS)DISQUS.reset({reload:!0,config:function(){this.page.identifier=e,this.page.url=r,this.page.title=o}});else{let e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=s+"//"+t+".disqus.com/embed.js",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(e)}}},getClosest:function(e,t){for(Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),o=t.length;--o>=0&&t.item(o)!==this;);return o>-1});e&&e!==document;e=e.parentNode)if(e.matches(t))return e;return null}}}();