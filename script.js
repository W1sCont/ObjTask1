function HtmlElement(tag, closeTag, text) {
    this._tagName = tag;
    this._tagIsClose = closeTag;
    this._textContent = text || "";
    this._attributes = [];
    this._style = [];
    this._child = [];

    this.getTagName = () => {
        return this._tagName;
    }
    this.setTagName = (tag) => {
        this._tagName = tag;
    }

    this.getIsClose = () => {
        return this._tagIsClose;
    }

    this.setIsClose = (closeTag) => {
        closeTag === true ? this._tagIsClose = true : this._tagIsClose = false;
    }

    this.getTextContent = () => {
        return this._textContent;
    }

    this.setTextContent = (text) => {
        this._textContent = text;
    }

    this.addAttributes = (key, value) => {
        this._attributes.push({ name: key, value: value });
    }

    this.addStyle = (key, value) => {
        this._style.push({ name: key, value: value });
    }

    this.appendChild = (obj) => {
        this._child.push(obj);
    }
    this.insertChild = (obj) => {
        this._child.unshift(obj);
    }

    this.getHtml = (indent = 0) => {
        let result = "";
        let attrib = "";
        let style1 = "";
        let temp = "";
        for (let i = 0; i < this._attributes.length; i++) {
            attrib += " " + this._attributes[i].name + '="' + this._attributes[i].value + '"';
        }
        if (this._style.length !== 0) {
            for (let i = 0; i < this._style.length; i++) {
                temp += this._style[i].name + ': ' + this._style[i].value + `${(this._style.length - 1) === i ? ";" : "; "}`;
            }
            style1 = ` style="${temp}"`;
        }
        temp = "";

        if (this._tagIsClose) {
            result += "\n" + "  ".repeat(indent) + `<${this._tagName}${attrib}${style1}>${this._textContent}`;

            for (let i = 0; i < this._child.length; i++) {
                temp = this._child[i].getHtml(indent + 1);
                result += temp;
            }
            result += "\n" + "  ".repeat(indent) + `${"</" + this._tagName + ">"}`;
            return result;
        }
        else {
            result += "\n" + "  ".repeat(indent) + `<${this._tagName}${attrib}${style1}/>`;
        }

        return result;
    }
}

let diwWrapper = new HtmlElement("div", true);
diwWrapper.addAttributes("id", "wrapper");
diwWrapper.addStyle("display", "flex");

let div = new HtmlElement("div", true);
div.addStyle("width", "300px");
div.addStyle("margin", "10px");

let h3 = new HtmlElement("h3", true);
h3.setTextContent("Whats is Lorem Ipsum?");

let img = new HtmlElement("img", false);
img.addStyle("width", "100%");
img.addAttributes("src", "lipsum.jpg");
img.addAttributes("alt", "Lorem Ipsum");

let p = new HtmlElement("p", true);
p.addStyle("text-align", "justify");
p.setTextContent(
    '"\n       Lorem Ipsum is simply dummy text of the printing and typesetting industry."\n' +
    "       Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at\n" +
    "       Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914\n" +
    '       Cicero translation and scrambled it to make dummy text for Letraset\'s Body Type sheets."'
);

let a = new HtmlElement("a", true);
a.addAttributes("href", "https://www.lipsum.com/");
a.addAttributes("target", "_blank");
a.setTextContent("More...");

p.appendChild(a);
div.appendChild(h3);
div.appendChild(img);
div.appendChild(p);

diwWrapper.appendChild(div);
diwWrapper.appendChild(div);

let codeContainer = document.createElement('pre');
codeContainer.textContent = diwWrapper.getHtml();
document.body.appendChild(codeContainer);