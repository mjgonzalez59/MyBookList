//Book Class: Represents a Book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}

//UI Class: Handle UI Tasks
class UI{
    static displayBook(){
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector("#book-list");

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static clearFields(){
        document.querySelector("#titleElement").value = "";
        document.querySelector("#authorElement").value = "";
        document.querySelector("#isbnElement").value = "";
    }

    static deleteBook(bookElement){
        if(bookElement.classList.contains("delete")){
            bookElement.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement("div");
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message));
        const divContainer = document.querySelector(".container");
        const formElement = document.querySelector("#book-form");
        divContainer.insertBefore(div, formElement);

        //Vanish alert in 3 seconds
        setTimeout(() => div.remove(), 2000);
        // setTimeout(() => document.querySelector(".alert").remove(), 2000);
    }
}


//Store Class: Handle Storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem("books") === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static addBooks(book){
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }
}

//Event: DisplayBook
document.addEventListener("DOMContentLoaded", UI.displayBook);

//Event: AddABook
const form = document.querySelector("#book-form");
form.addEventListener("submit", (e) => {
    //Prevent actual submit
    e.preventDefault();

    //Get Values from the form
    const title = document.querySelector("#titleElement").value;
    const author = document.querySelector("#authorElement").value;
    const isbn = document.querySelector("#isbnElement").value;

    //Validation
    if(title === "" || author === "" || isbn === ""){
        UI.showAlert("Please fill in all the fields", "danger");
    }else{
        //Instaciate Book
        const book = new Book(title, author, isbn);
        UI.showAlert("New book added", "success");

        //Add book to UI
        UI.addBookToList(book);
        Store.addBooks(book);

        //Clear input fields after pressing submit button
        UI.clearFields();
    }
});

//Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert("Book removed", "success");
});














