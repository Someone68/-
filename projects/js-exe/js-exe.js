/// script_execution.js
/// alias jseval.js
/// world ISOLATED
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
/// alias fblite.js
/// world ISOLATED
window.addEventListener("keyup", (event) => {
	if (event.ctrlKey && event.altKey && event.key === "]") {
		let firebug = document.createElement("script");
		firebug.setAttribute(
			"src",
			"https://h4shtag.pages.dev/projects/js-exe/firebug-lite-debug.js"
		);
		document.body.appendChild(firebug);
		function startfirebug() {
			if (window.Firebug) {
				window.Firebug.ConsolePanel();
			} else {
				setTimeout(startfirebug);
			}
		}
		startfirebug();
		void firebug;
	}
});

/// history_flood.js
/// alias hflood.js
/// world ISOLATED
window.addEventListener("keyup", (event) => {
	if (event.ctrlKey && event.altKey && event.key === "f") {
		let num = prompt("History flood amount:");
		done = false;
		x = window.location.href;
		for (var i = 1; i <= num; i++) {
			history.pushState(0, 0, i == num ? x : i.toString());
			if (i == num) {
				done = true;
			}
		}
		if (done === true) {
			alert(
				"History flood successful! " +
					window.location.href +
					" now appears in your history " +
					num +
					(num == 1 ? " time." : " times.")
			);
		}
	}
});
