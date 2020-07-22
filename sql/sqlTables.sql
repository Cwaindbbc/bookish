CREATE TABLE member
(id SERIAL PRIMARY KEY,
 username VARCHAR (50) NOT NULL,
 password VARCHAR(100) NOT NULL
);

CREATE TABLE book
(book_id SERIAL NOT NULL,
 title VARCHAR(50) NOT NULL,
 author VARCHAR(50) NOT NULL,
 isbn INT NOT NULL,
 copies_owned INT NOT NULL,
 barcode INT NOT NULL,
 due_date DATE,
 borrower_id INT,
 PRIMARY KEY(book_id),
 CONSTRAINT fk_member
 	FOREIGN KEY(borrower_id) 
 		REFERENCES member(id)
 );
 
