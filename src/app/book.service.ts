import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Book } from "./book"

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookurl="/api/books";
  constructor( private http : HttpClient) { }

  // get method is provided by http for listing
  getBooksFromStore():Observable<Book[]>{
    return this.http.get<Book[]>(this.bookurl);
  }

  // add book
  creatNewBookForStore(book:Book):Observable<Book>{
    let httpheaders = new HttpHeaders()
    .set('Content-Type','application/Json');
    let options = {
      headers : httpheaders
    };
    return this.http.post<Book>(this.bookurl,book,options);
  }

  //get book details by id for edit form
  getBookById(bookid:string){
    return this.http.get<Book>(this.bookurl+"/"+bookid);
  }

  //updating book 
  updateBook(book:Book):Observable<number>{
    let httpheaders = new HttpHeaders()
    .set('Content-Type','application/Json');
    let options = {
      headers : httpheaders
    };
    return this.http.put<number>(this.bookurl+"/"+book.id,book,options);
  }

  //delete book from store
  deleteBook(bookid:string):Observable<number>{
    let httpheaders = new HttpHeaders()
    .set('Content-Type','application/Json');
    let options = {
      headers : httpheaders
    };
    return this.http.delete<number>(this.bookurl+"/"+bookid);
  }



}
