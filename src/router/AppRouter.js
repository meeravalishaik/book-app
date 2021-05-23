import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import AddBook from '../components/AddBook';
import BooksList from '../components/BooksList';
import useLocalStorage from '../hooks/useLocalStorage';
import EditBook from '../components/EditBook';
import BooksContext from '../context/BooksContext';

const AppRouter = () => {
  const [books, setBooks] = useLocalStorage('books',[
    {
      "id":"66cfe834-13ee-4c01-98d6-9f665e9a99bc",
      "bookname":"Harry Potter",
      "url":"https://wallpapercave.com/wp/Mx1oePA.jpg",
      "author":"J.K.Rowling",
      "category":"Fantasy",
      "price":"4000",
      "edition":"Prisioner of Azkaban",
      "date":"2021-05-23T09:35:50.606Z"
    }]);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          <BooksContext.Provider value={{ books, setBooks }}>
            <Switch>
              <Route component={BooksList} path="/" exact={true} />
              <Route component={AddBook} path="/add" />
              <Route component={EditBook} path="/edit/:id" />
              <Route component={() => <Redirect to="/" />} />
            </Switch>
          </BooksContext.Provider>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
