/**
 * User: Cloudy
 * Date: 19-Feb-19
 * Time: 17:12
 */

let jsEditor = document.createElement("SCRIPT");
jsEditor.src = "editor.js";
document.head.appendChild(jsEditor);

window.onload = ev => {
    checkForEditors();
};

function checkForEditors() {
    let els = [...document.getElementsByTagName("CEDITOR")];
    els.forEach(el => {
        createEditorFromElement(el);
    });
}

function createEditorFromElement(element) {
    let div = document.createElement("DIV");
    for (let i = 0; i < element.attributes.length; i++) {
        div.setAttribute(element.attributes[i].name, element.attributes[i].value);
    }
    let editor = new Editor(div.getAttribute("lang"));
    div.dataset.editorHandlerId = editor.init(div);
    element.parentNode.appendChild(div);
    element.parentNode.removeChild(element);
}