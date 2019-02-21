/**
 * User: Cloudy
 * Date: 19-Feb-19
 * Time: 17:10
 */

let jsLang = document.createElement("SCRIPT");
jsLang.src = "lang.js";
document.head.appendChild(jsLang);

let editors = [];

class Editor {
    constructor(lang) {
        this.handlerId = -1;
        this.element = null;
        this.lang = lang;
        this.tabSpaces = 4;
        this.langObject = null;

        this.code = {
            code: "this.ok = function () => {\n\tif (x typeof \"string\") {\n\t\tyield x;\n\t\treturn true;\n\t}\n\telse {\n\t\treturn false;\n\t}\n}",
            divList: []
        };
        this.caret = {
            position: 0,
            length: 0
        }

        this._insertChar = "\u1259__\u1259__\u1259";
    }

    init(element) {
        this.element = element;
        let hId = editors.length;
        let lng = document.createElement("SCRIPT");
        lng.src = "lang/" + this.lang.toLowerCase() + ".js";
        lng.onload = ev => {
            this.langObject = eval("new Lang" + this.lang.toUpperCase() + "();");
            this.handlerId = editors.length;
            editors.push(this);
            this.rebuild();
        };
        document.head.appendChild(lng);
        return hId;
    }

    rebuild() {
        let el = this.element;

        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }

        el.style.backgroundColor = this.langObject.styles.background.color;

        let lineRect = document.createElement("DIV");
        lineRect.className = "line_rect";
        lineRect.style.backgroundColor = this.langObject.styles.lineRect.color;
        lineRect.style.position = "absolute";
        lineRect.style.left = "0px";
        lineRect.style.top = "0px";
        lineRect.style.width = this.langObject.lineRectWidth.toString() + "px";
        lineRect.style.height = "100%";
        lineRect.style.fontFamily = this.langObject.font;
        el.appendChild(lineRect);

        let codeRect = document.createElement("DIV");
        codeRect.className = "code_rect";
        codeRect.style.color = this.langObject.styles.plain.color;
        if (this.langObject.styles.plain.bold) codeRect.style.fontWeight = "bold";
        codeRect.style.position = "absolute";
        codeRect.style.left = this.langObject.lineRectWidth.toString() + "px";
        codeRect.style.top = "0px";
        codeRect.style.width = "calc(100% - " + this.langObject.lineRectWidth.toString() + "px)";
        codeRect.style.height = "100%";
        codeRect.style.fontFamily = this.langObject.font;
        codeRect.style.userSelect = "none";
        codeRect.style.overflowX = "auto";
        codeRect.style.overflowY = "auto";
        el.appendChild(codeRect);

        this.codeBuildAll();
    }

    codeGetLineString(line) {
        let lineStartIdx = 0;
        let lineEndIdx = 0;
        for (let i = 0; i < line; i++) {
            lineStartIdx = this.code.code.indexOf("\n", lineStartIdx + 1);
        }
        lineEndIdx = this.code.code.indexOf("\n", lineStartIdx + 1);
        return lineStartIdx !== -1 ? (lineEndIdx !== -1 ? this.code.code.substring(lineStartIdx, lineEndIdx) : this.code.code.substring(lineStartIdx, this.code.code.length)) : "";
    }

    transformString(string) {
        string = string.replace(/\n/g, "");
        string = string.replace(/\t/g, "    ");

        let insertions = [];

        let containment = this.langObject.specialCharacters.split('');
        for (let i = 0; i < this.langObject.keywords.length; i++) {
            let pos = -1;
            let kw = this.langObject.keywords[i];
            while ((pos = string.indexOf(kw, pos + 1)) !== -1) {
                if ((pos !== 0 && containment.indexOf(string.substr(pos - 1, 1)) === -1) || (pos+kw.length !== string.length && containment.indexOf(string.substr(pos + kw.length, 1)) === -1)) {
                    continue;
                }
                insertions.push("<span style='color:" + this.langObject.styles.keyword.color + ";" + (this.langObject.styles.keyword.bold ? "font-weight:bold;" : "") + "'>" + string.substring(pos, pos + kw.length) + "</span>");

                string = string.substring(0, pos) + (this._insertChar + (insertions.length - 1) + this._insertChar) + string.substring(pos + kw.length, string.length);
            }
        }

        string = string.replace(/ /g, "&nbsp;");
        let idx = -1;
        while ((idx = string.indexOf(this._insertChar, idx + 1)) !== -1) {
            let lidx = string.indexOf(this._insertChar, idx + 1);
            let index = parseInt(string.substring(idx + this._insertChar.length, lidx));
            string = string.substring(0, idx) + insertions[index] + string.substring(lidx + this._insertChar.length, string.length);
        }
        //string = string.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");

        return string;
    }

    codeBuildLine(line) {
        let string = this.transformString(this.codeGetLineString(line));
        this.code.divList[line].innerHTML = string;
    }

    _clearDivs() {
        for (let i = 0; i < this.code.divList.length; i++) {
            this.code.divList[i].parentNode.removeChild(this.code.divList[i]);
        }
        this.code.divList.splice(0, this.code.divList.length);
    }

    codeBuildAll() {
        this._clearDivs();
        let lines = this.code.code.split("\n");
        for (let i = 0; i < lines.length; i++) {
            let div = document.createElement("DIV");
            div.className = "line ln" + i.toString();
            this.code.divList.push(div);
            this.codeBuildLine(i);
        }
        this.renderAll();
    }

    get codeRect() {
        return this.element.getElementsByClassName("code_rect")[0];
    }

    render(line) {
        let div = this.code.divList[line];
        if (div.parentNode === null) {
            if (this.code.divList.length === line - 1) {
                this.codeRect.appendChild(div);
            } else {
                this.codeRect.insertBefore(div, this.code.divList[line + 1]);
            }
        }
    }

    renderAll() {
        for (let i = 0; i < this.code.divList.length; i++) {
            this.codeRect.appendChild(this.code.divList[i]);
        }
    }
}