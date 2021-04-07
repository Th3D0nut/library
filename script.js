let myLibrary = [
	book0 = {
	author: "Haruki Murakami",
	title: "Norwegian Wood",
	pageAmount: "266",
	isRead: true, 
} , book1 = {
	author: "Terry Pratchet",
	title: "Wizard shit",
	pageAmount: "223",
	isRead: false,
}, book2 = {
	author: "Forgot",
	title: "Snow Crash",
	pageAmount: "322",
	isRead: true,
}, book3 = {
	author: "Haruki Murakami",
	title: "The Wind up Bird Chronicle",
	pageAmount: "390",
	isRead: true,
}];

addBookToLibrary("book4", "Geralt", "Gwent: Another Approach", "510", true);
displayBooks();

function Book(author, title, pageAmount, isRead) {
		this.author = author,
		this.title = title,
		this.pageAmount = pageAmount,
		this.isRead = isRead,

		this.info = function() {
			if (isRead) {
				console.log(`${title} by ${author}, ${pageAmount} pages,
				 readed`);
			} else {
				console.log(`${title} by ${author}, ${pageAmount} pages,
				 not read yet`);
			}
		}
}

function addBookToLibrary(objName, author, title, pageAmount, isRead) {
	objName = new Book(author, title, pageAmount, isRead);
	myLibrary.push(objName);
}

function displayBooks() {
	const table = document.querySelector(".all-books-container > table");

	for (i = 0; i < myLibrary.length; i++) {
		currentItem = myLibrary[i];
		const row = document.createElement("tr");
		row.setAttribute("class", "book-row");
		row.dataset.indexNumber = i;

		Object.keys(currentItem).forEach(key => {
			value = currentItem[key];
			value = convertBooleanToText(value);
			
			if (typeof(value) === "string") { //weeds out object functions
				const dataCell = document.createElement("td");
				dataCell.textContent = value;
				
				const addReadStatusSwitch = function (key, value) {//START HERE
					if ("isRead" === key) {
						const readStatusSwitch = document.createElement(
						"button");
						if (value === "Not yet") {
							readStatusSwitch.textContent = "Not read";
						} else {
							readStatusSwitch.textContent = "Read";
						}
						readStatusSwitch.setAttribute("class",
						"read-switch-button");
						dataCell.appendChild(readStatusSwitch);
					}
				}
				addReadStatusSwitch(key, value);
				row.appendChild(dataCell);
			}
		});
		//Add a remove button at the end of each row.
		const removeButton = document.createElement("button");
		removeButton.textContent = "Delete";
		removeButton.setAttribute("class", "delete-buttons");
		removeButton.dataset.indexNumber = i;
		row.appendChild(removeButton);
		table.appendChild(row);
	}
	
	addNewBook(); //button
	removeBook(); //functionality delete button

}

function removeBook() {
	const table = document.querySelector(".all-books-container > table");
	const rows = document.querySelectorAll(".book-row");
	const buttons = document.querySelectorAll(".delete-buttons");

	buttons.forEach(button => {
		button.addEventListener("click", (e) => {
			let input = e.target.dataset.indexNumber;
			table.removeChild(rows[input]);

			delete myLibrary[input];
		});
	});
}

function convertBooleanToText(val) {
	if (val === true) {
		return "Yes";
	} else if (val === false) {
		return "Not yet";
	}
	else {
		return val;
	}
}

function addNewBook() {
	let onOff = 1;
	const container = document.querySelector(".drop-form-container");
	const dropForm = document.querySelector(".drop-form-container > button");

	const form = document.createElement("form");
	form.style.backgroundColor = "white";
	form.setAttribute("action", "")
	
	const createLabelInput = function (name, type="text", label=true) {
		typeCapital = name[0].toUpperCase() + name.slice(1, name.length);
		
		if (label) {
			const label = document.createElement("label");
			label.textContent = typeCapital + ":";
			label.style.color = "black";
			form.appendChild(label);
		}
		
		const input = document.createElement("input");

		if (name === "Submit") {
			input.setAttribute("value", "Submit");
		}

		input.setAttribute("type", type);
		form.appendChild(input);
	}
	const createForm = function () {
		createLabelInput("author");
		createLabelInput("title");
		createLabelInput("number of pages");
		createLabelInput("Is read", "checkbox");
		createLabelInput("Submit", "submit", false);
	}
	createForm();
	
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