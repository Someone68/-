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
function loadScript(url, callback) {
	var script = document.createElement("script");
	script.src = url;
	script.classList.add("firebug-script");
	script.onload = () => {
		callback(script);
	};
	document.head.appendChild(script);
}

window.addEventListener("keyup", (event) => {
	if (event.ctrlKey && event.altKey && event.code === "Backslash") {
		if (document.querySelector(".firebug-script")) {
			window.Firebug.ConsolePanel();
		} else {
			loadScript("https://jsexe.pages.dev/firebug-lite-debug.js", openFirebug);
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
