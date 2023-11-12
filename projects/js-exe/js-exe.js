/// script_execution.js
window.addEventListener("keyup", (event) => {
	if (event.ctrlKey && event.code === "Backquote") {
		let command = prompt("Evaluate Command:");
		try {
			let evaledCommand = eval(command);
			alert(evaledCommand);
		} catch (err) {
			alert(err);
		}
	}
});

/// firebug_lite_devtools.js

window.addEventListener("keyup", (event) => {
	function loadScript() {
		let firebugscript = document.createElement("script");
		firebugscript.src =
			"https://h4shtag.pages.dev/projects/js-exe/firebug-lite-debug.js";

		firebugscript.classList.add("firebug-script");
		if (document.head) {
			document.head.append(firebugscript);
		}
	}
	if (event.ctrlKey && event.altKey && event.code === "Backslash") {
		if (document.querySelector(".firebug-script")) {
			window.Firebug.ConsolePanel();
		} else {
			loadScript();
		}
	}

	function openFirebug(firebug) {
		try {
			console.log(arguments);
			if (window.Firebug.version) {
				firebug.consolePanel();
			} else {
				setTimeout(openFirebug);
			}
		} catch (err) {
			setTimeout(openFirebug);
		}
	}
});
