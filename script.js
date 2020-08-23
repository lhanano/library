// create new books
let myLibrary = [];

class Book {
    constructor(title, author, read) {
    this.title = title
    this.author = author
    this.read = read
    }
}

// Class: Handle UI Tasks
class UI {
    static displayBooks() {
        myLibrary.forEach(book => UI.addBookToDiv(book))}
    
    static addBookToDiv(book) {
            const mainDiv = document.querySelector('.wrapper');
            const newBook = document.createElement('div');
            const newBookCover = document.createElement('div');
            const newTitle = document.createElement('p');
            const newAuthor = document.createElement('p');
            const newBookmark = document.createElement('div');
            const newDeleteButton = document.createElement('div');

            newTitle.textContent = book.title;
            newAuthor.textContent = book.author;
            newBookmark.textContent = book.read;
            newDeleteButton.textContent = 'X';

            newBook.classList.add('book');
            newBookCover.classList.add('cover');
            newTitle.classList.add('bookTitle');
            newAuthor.classList.add('bookAuthor');
            newDeleteButton.classList.add('delete');
            newBookmark.classList.add('bookmark');
            if (book.read == 'unread') newBookmark.classList.add('unread');
            
            newBookCover.appendChild(newTitle);
            newBookCover.appendChild(newAuthor);
            newBook.appendChild(newBookCover);
            newBook.appendChild(newBookmark);
            newBook.appendChild(newDeleteButton);
            mainDiv.appendChild(newBook);

            // bookcover colors
            let bookCovers = document.querySelectorAll(".cover");
            bookCovers.forEach((book, i) => {
                i = i % 7;
                if (i>6) i-=7;
                book.classList.add(`color${i}`);
            })
        }

    static addNewBook(book) {
        myLibrary.push(book);
        return myLibrary;
    }

    static changeReadStatus(element) {
        if (element.classList.contains('bookmark')) {
            element.classList.toggle('unread');
        }
        if (element.innerText == 'read') element.innerText = 'unread';
        else if (element.innerText == 'unread') element.innerText = 'read';
    } 

    static deleteBook(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.remove();
        }
    }

    static clearForm() {
        document.forms[0][0].value = '';
        document.forms[0][1].value = '';
        document.forms[0][2].checked = true;
    }
}


// Storage: sample books
book1 = new Book('Eat Pray Love', 'Elizabeth Gilbert', 'read');
book2 = new Book('The Book of Joy', 'Dalai Lama & Desmund Tutu', 'read');
book3 = new Book('My Life In France', 'Julia Child', 'unread');
book4 = new Book('Little Women', 'Louisa May Alcott', 'unread')

let books = [book1, book2, book3, book4];
books.forEach(book => UI.addNewBook(book));
 
// Event: Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks());

// Event: Add new book to bookshelf via form
let addForm = document.forms[0];
addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = addForm.querySelector('input[id="title"]').value;
    let author = addForm.querySelector('input[id="author"]').value;
    let read = addForm.querySelector('input[id="read"]');
    let unread = addForm.querySelector('input[id="unread"]');
    let status;
    if (read.checked==true) status = 'read';
    else if (unread.checked==true) status = 'unread';

    book = new Book(title, author, status);
    UI.addNewBook(book);
    UI.addBookToDiv(book);
    UI.clearForm();
})

// Event: change bookmark status
document.querySelector(".wrapper").addEventListener('click', (e) => {
    UI.changeReadStatus(e.target);
})

// Event: delete book
document.querySelector(".wrapper").addEventListener('click', (e) => {
    UI.deleteBook(e.target);
})