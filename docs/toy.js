// Prepend child to element
Element.prototype.prependChild = function(child){
	this.insertBefore(child, this.firstChild);
}

// Execute on page load finished
window.addEventListener("load", function(evt){
	// Process contents table and sections
	var contents = document.getElementsByClassName("contents")[0];
		sections = document.getElementsByClassName("section");
	for(var i = 0; i < sections.length; ++i){
		var section = sections[i];
		// Add link to section in contents table
		var link = document.createElement("a");
		link.href = "#" + section.id;
		link.appendChild(document.createTextNode(section.id));
		link.className = "contents";
		contents.appendChild(link);
		// Add anchor to section
		var anchor = document.createElement("a");
		anchor.name = section.id;
		section.prependChild(anchor);
		// Set section title (text on top of section box)
		var title = document.createElement("span");
		title.appendChild(document.createTextNode(section.id));
		title.id = "section";
		section.parentNode.insertBefore(title, section);
	}
	// Process code chunks
	var codes = document.getElementsByClassName("code");
	for(var i = 0; i < codes.length; ++i){
		var code = codes[i];
		if(code.tagName.toLowerCase() == "div" && code.lastChild){
			// Add linenumber cell to code
			var numberBar = document.createElement("td"),
				numberText = "1";
			for(var j=2; j<=code.lastChild.textContent.split("\n").length; ++j)
				numberText += "\n" + j;
			numberBar.appendChild(document.createTextNode(numberText));
			numberBar.className = "linenumbers";
			code.appendChild(numberBar);
			// Put code in own cell
			var codeText = document.createElement("td");
			codeText.appendChild(document.createTextNode(code.firstChild.textContent));
			code.replaceChild(codeText,code.firstChild);
			// Transfer padding from code box to cells
			var codeStyle = code.currentStyle || window.getComputedStyle(code);
			numberBar.style.paddingLeft = codeStyle.paddingLeft,
			numberBar.style.paddingRight = codeStyle.paddingRight,
			numberBar.style.paddingTop = codeStyle.paddingTop,
			numberBar.style.paddingBottom = codeStyle.paddingBottom,
			codeText.style.paddingLeft = codeStyle.paddingLeft,
			codeText.style.paddingRight = codeStyle.paddingRight,
			codeText.style.paddingTop = codeStyle.paddingTop,
			codeText.style.paddingBottom = codeStyle.paddingBottom,
			code.style.padding = 0;
			// Add right space for vertical scrollbar (on appearance)
			if(code.scrollHeight > code.clientHeight){
				code.style.paddingRight = "18px";
				code.style.overflowX = "hidden";
			}
			// Set code highlight
			code.addEventListener("mouseover", function(){
				numberBar.style.display = "table-cell";
			})
			code.addEventListener("mouseout", function(){
				numberBar.style.display = "none";
			})
		}
	}
})