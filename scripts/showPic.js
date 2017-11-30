function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload !='function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}
function insertAfter(newELement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newELement);
    }else{
        parent.insertBefore(newELement,targetElement.nextSibling);
    }
}
function preparePlaceholder() {
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/DSC02253.JPG");
    placeholder.setAttribute("alt","my image gallery");
    var describe = document.createElement("p");
    describe.setAttribute("id","describe");
    var desctext = document.createTextNode("Choose an image");
    describe.appendChild(desctext);
    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder,gallery);
    insertAfter(describe,placeholder);
}
function prepareGallery(){
    if(!document.getElementsByTagName|| !document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    var gallery =document.getElementById("imagegallery");
    var links=gallery.getElementsByTagName("a");
    for ( var i=0;i < links.length;i++){
        links[i].onclick = function(){
            return showPic(this);
        }
        links[i].onkeypress = links[i].onclick;
    }
}
function showPic(whichpic){ 
    if (!document.getElementById("placeholder")) return true;
        var source = whichpic.getAttribute("href");  
        var placeholder = document.getElementById("placeholder");  
    if(placeholder.nodeName != "IMG") return false;
    placeholder.setAttribute("src",source);
    if(document.getElementById("describe")) {
        var text=whichpic.getAttribute("title")? whichpic.getAttribute("title") : "";
        var describe=document.getElementById('describe'); 
        if (describe.firstChild.nodeType == 3){
            describe.childNodes[0].nodeValue=text;
        }
    }
    return false;
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);