// create new books
let myLibrary = [];

class Book {
    constructor(title, author, read) {
    this.title = title
    this.author = author
    this.read = read
    }

    getCover = function() {
        return `<div class=cover>${this.title} by ${this.author}</div><div class="delete">delete</div></div>`
        }
    
    addNewBook = function() {
        myLibrary.push(this);
        return this;
    }

    // determine read status to display on bookmark
    getStatus = function() {
        if (this.read == 'read') {
            return `<div class="book"><div class="bookmark">${this.read}</div>`;   
        } else if (this.read == 'unread') {
            return `<div class="book"><div class="bookmark ${this.read}">${this.read}</div>`;  
        }
    }
  
    // read information of each book in library and create new div
    // display library books array on shelf
    displayBook = function() {
        let template = '';
        for (const element of myLibrary) {
            template += `${element.getStatus()}${element.getCover()}`;
        }
    
        const render = function (template, node) {
            node.innerHTML = template;
        }
    
        render(template, document.querySelector('.books'));
    }

}

// Class: Handle UI Tasks
class UI {
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
}


// Storage: sample books
book1 = new Book('Eat Pray Love', 'Elizabeth Gilbert', 'read');
book2 = new Book('The Book of Joy', 'Dalai Lama & Desmund Tutu', 'read');
book3 = new Book('My Life In France', 'Julia Child', 'unread');
book4 = new Book('Little Women', 'Louisa May Alcott', 'unread')

book1.addNewBook();
book2.addNewBook();
book3.addNewBook();
book4.addNewBook().displayBook();
 
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

    new Book(title, author, status).addNewBook().displayBook();
})

// Event: change bookmark status
document.querySelector(".books").addEventListener('click', (e) => {
    UI.changeReadStatus(e.target);
})

// Event: delete book
document.querySelector(".books").addEventListener('click', (e) => {
    UI.deleteBook(e.target);
})

