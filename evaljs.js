/// script_execution.js
window.addEventListener("keyup", (event) => {
	if (event.ctrlKey && event.code === "Backquote") {
		let command = prompt("Evaluate Command:");
		try {
			let copy = false;
			if (command != command.replace("+cpy", "")) {
				command = command.replace("+cpy", "");
				copy = true;
			}
			let evaledCommand = eval(command);
			if (copy) {
				navigator.clipboard.writeText(evaledCommand);
			}
			alert(evaledCommand);
		} catch (err) {
			alert(err);
		}
	}
});
