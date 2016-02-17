(function () {
    
    var onlyUnique = function (value, index, self) { 
        return self.indexOf(value) === index;
    }
    
    var getSelectionText = function () {
        var text = "";
        var elem = document.activeElement;
        console.log(elem.tagName, elem.type);
        if (window.getSelection && window.getSelection().toString() !== "") {
            text = window.getSelection().toString();
            console.log("balala", text);
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
            console.log('kikou', text, 'kaka');
        } else if (elem.tagName === "INPUT" && elem.type === "text") {
            text =  elem.value.substring(elem.selectionStart, elem.selectionEnd);
            console.log('myText : ', text);
        }
        return text;
    }
    
    var lastCmd = [];
    var copyText = {};
    
    document.addEventListener('keydown', function (e) {
        lastCmd.push(e.keyCode);
        
        lastCmd = lastCmd.filter(onlyUnique);
    });
    
    // 17 == ctrl | 67 == "c" | 97 == "1" (pavé numerique) | 109 == "9" (pavé num)
    
    document.addEventListener('keyup', function (e) {
        if (lastCmd.indexOf(17) !== -1 && lastCmd.indexOf(67) !== -1 && lastCmd[lastCmd.length - 1] >= 97 && lastCmd[lastCmd.length - 1] <= 109) {
            copyText[lastCmd[lastCmd.length - 1]] = getSelectionText();
            console.log(copyText);
        }
        else if (lastCmd.indexOf(17) !== -1 && lastCmd.indexOf(86) !== -1 && lastCmd[lastCmd.length - 1] >= 97 && lastCmd[lastCmd.length - 1] <= 109) {
            document.activeElement.value = document.activeElement.value + copyText[lastCmd[lastCmd.length - 1]];
        }
        lastCmd = [];
    });
    
}).call(this);