/// script_execution.js
let focusedclipboardwritetext = false;
window.addEventListener("keyup", (event) => {
	if (event.ctrlKey && event.code === "Backquote") {
		focusedclipboardwritetext = false;
		let command = prompt("Evaluate Command:");
		try {
			let copy = false;
			if (command != command.replace("+cpy", "")) {
				command = command.replace("+cpy", "");
				copy = true;
			}
			let evaledCommand = eval(command);
			alert(evaledCommand);
			if (copy) {
				document.addEventListener("focus", copyy);
			}
		} catch (err) {
			alert(err);
		}
	}
});

function copyy() {
	focusedclipboardwritetext = true;
	navigator.clipboard.writeText(evaledCommand);
	document.removeEventListener("focus", copyy);
}
