/**
 * User: Cloudy
 * Date: 19-Feb-19
 * Time: 18:05
 */

class Lang {
    constructor() {
        this.keywords = [];
        this.functions = [];

        this.font = "Consolas";
        this.styles = {
            background: {color: "#222222"},
            lineRect: {color: "#333333"},
            plain: {color: "#BBBBBB", bold: false, underlined: false},
            keyword: {color: "#bf9100", bold: true, underlined: false},
            function: {color: "#BBBBBB", bold: false, underlined: false},
            number: {color: "#BBBBBB", bold: false, underlined: false},
            string: {color: "#BBBBBB", bold: false, underlined: false},
            chars: {color: "#BBBBBB", bold: false, underlined: false}
        };
        this.specialCharacters = "";

        this.lineRectWidth = 48;
    }

    setColor(key, color) {
        this.styles[key] = color;
    }

    getColor(key) {
        return this.styles[key];
    }
}