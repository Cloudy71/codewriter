/**
 * User: Cloudy
 * Date: 19-Feb-19
 * Time: 17:13
 */

class LangJS extends Lang {
    constructor() {
        super();
        this.keywords = ["var", "let", "function", "for", "do", "while", "switch", "return", "this", "default", "case", "delete", "if", "else", "finally", "in", "instanceof",
            "new", "throw", "try", "typeof", "void", "with", "class", "const", "enum", "export", "extends", "import", "super", "implements", "interface", "package", "private", "protected",
            "public", "static", "yield", "null", "true", "false"];
        this.functions = [];
        this.specialCharacters = " _?:+-/*{};()=<>.,";
    }
}