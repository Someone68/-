/// script_execution.js
window.addEventListener("keyup", (event) => {
	if (event.ctrlKey && event.code === "Backquote") {
		let command = prompt("Evaluate Command:");
		try {
			alert(eval(command));
		} catch (err) {
			alert(err);
		}
	}
});
