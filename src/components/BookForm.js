import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const BookForm = (props) => {
  const [book, setBook] = useState(() => {
    return {
      bookname: props.book ? props.book.bookname : '',
      url:props.book ? props.book.url : '',
      author: props.book ? props.book.author : '',
      category:props.book? props.book.category:'' ,
      edition: props.book ? props.book.edition : '',
      price: props.book ? props.book.price : '',
      date: props.book ? props.book.date : ''
    };
  });

  const [errorMsg, setErrorMsg] = useState('');
  const { bookname, url,author, price, edition ,category} = book;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [bookname, url,author, price, edition,category];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' ;
    });

    if (allFieldsFilled) {
      const book = {
        id: uuidv4(),
        bookname,
        url,
        author,
        category,
        price,
        edition,
        date: new Date()
      };
      if(price <= 0  ){
        errorMsg = 'Price should be greater than 0.';
      }else{
        props.handleOnSubmit(book);
      }
    } else {
      errorMsg = 'Please fill out all the fields.';
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'price':
        if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setBook((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      default:
        setBook((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="bookname"
            value={bookname}
            placeholder="Enter name of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="url">
          <Form.Label>Book Thumbnail Image Address Url</Form.Label>
          <Form.Control
            className="input-control"
            type="url"
            name="url"
            value={url}
            placeholder="Enter Book  Image Address Url"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Book Author</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="author"
            value={author}
            placeholder="Enter name of author"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Book Category</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="category"
            value={category}
            placeholder="Enter Book Category"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="edition">
          <Form.Label>Edition</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="edition"
            value={edition}
            placeholder="Enter Book Edition"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Book Price</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="price"
            value={price}
            placeholder="Enter price of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
        <Button variant="secondary" type="submit"  onClick={props.cancel} className="submit-btn">
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default BookForm;
