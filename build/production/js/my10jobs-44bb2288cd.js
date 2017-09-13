"use strict";document.addEventListener("DOMContentLoaded",function(){$(".js-lightbox-video").lightbox({trigger:".js-lightbox-video-trigger",showContent:function(t){t.preventDefault();this.container.find("iframe").attr("src","https://www.youtube.com/embed/"+$(t.currentTarget).attr("href").replace("#","")+"?rel=0&autoplay=1&wmode=opaque&fs=1&enablejsapi=1")},onClose:function(){setTimeout(function(){this.container.find("iframe").attr("src","")}.bind(this),400)}})},!1);var Lightbox=function(t,i){this.settings=$.extend({},this.defaultSettings,i),this.container=t,this.content=this.container.find(this.settings.content),this.trigger=$(this.settings.trigger),this.closeBtn=this.container.find(this.settings.closeBtn),this.triggers=[],this.trigger.each(function(t,i){i=$(i),this.triggers.push(new LightboxTrigger(t,i,this))}.bind(this)),this.keyup=this.keyup.bind(this),this.closeBtn.on("click",this.close.bind(this))};Lightbox.prototype.defaultSettings={trigger:".js-lightbox-trigger",closeBtn:".js-lightbox-close",content:".lightbox-content",activeClass:"lightbox-active",showContent:function(){},onOpen:function(){},onClose:function(){}},Lightbox.prototype.open=function(){this.container.addClass(this.settings.activeClass),this.settings.onOpen.apply(this,arguments),$(document).on("keyup",this.keyup)},Lightbox.prototype.close=function(t){t&&t.preventDefault(),this.container.removeClass(this.settings.activeClass),this.settings.onClose.apply(this,arguments),$(document).off("keyup",this.keyup)},Lightbox.prototype.keyup=function(t){27==t.keyCode&&this.close()},Lightbox.prototype.loadContent=function(t){$.ajax({url:t,method:"POST",success:function(){this.settings.showContent.apply(this,arguments)}.bind(this),error:function(t){console.error(t)}})};var LightboxTrigger=function(t,i,e){this.index=t,this.trigger=i,this.url=i.attr("href")||i.attr("data-href"),this.lightbox=e,this.trigger.on("click",this.click.bind(this))};LightboxTrigger.prototype.click=function(t){t.preventDefault(),this.lightbox.open(),this.lightbox.settings.showContent.apply(this.lightbox,arguments)},$.fn.lightbox=function(t){return $(this).each(function(i,e){e=$(e),e.data("lightbox")||e.data("lightbox",new Lightbox(e,t))})};