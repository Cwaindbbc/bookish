class Book {
  constructor(
    bookId,
    title,
    author,
    isbn,
    copiesOwned,
    barcode,
    dueDate,
    borrowerId
  ) {
    this.bookId = bookId;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.copiesOwned = copiesOwned;
    this.barcode = barcode;
    this.dueDate = dueDate;
    this.borrowerId = borrowerId;
  }
}

module.exports = Book;
