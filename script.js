let myLibrary = ["book1", "book2"];

function Book() {

}

function addBookToLibrary(book) {
	myLibrary.push(book);
}

function displayBooks() {
	for (i = 0; i < myLibrary.length; i++) {
		console.table(myLibrary[i]);
	}
}

function dropDownForm() {
	let onOff = 1;
	const container = document.querySelector(".drop-form-container");
	const dropForm = document.querySelector(".drop-form-container > button");

	const form = document.createElement("form");
	form.style.backgroundColor = "white";
		
	const label = document.createElement("label");
	label.textContent = "Author:";
	label.setAttribute("type", "text");
	label.style.color = "black";

	const input = document.createElement("input");
	input.setAttribute("type", "text");
	
	form.appendChild(label);
	form.appendChild(input);
	dropForm.addEventListener("click", () => {
		if (onOff === 1) {
			container.appendChild(form);
			onOff = 0;
		}
		else {
			container.removeChild(form);
			onOff = 1;
		}
	});
}

dropDownForm();