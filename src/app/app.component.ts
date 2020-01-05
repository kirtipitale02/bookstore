import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BookService } from "./book.service";
import { Book } from './book';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularCrud';
  softBooks: Book[];
  datasaved = false;
  bookform: FormGroup;
  allbooks: Observable<Book[]>;
  bookidtoupdate = null;
  constructor(private formbuilder: FormBuilder, private bookservice: BookService) {
  }
  ngOnInit() {
    this.bookform = this.formbuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      writer: ['', [Validators.required]],
    })
    this.getSoftBooks();
  }

  onFormSubmit() {
    this.datasaved = false;
    let book = this.bookform.value;
    this.createNewBook(book);
    this.bookform.reset();
  }

  createNewBook(book: Book) {
    if (this.bookidtoupdate == null) {
      this.bookservice.creatNewBookForStore(book).subscribe(book => {
        this.datasaved = true;
        this.getSoftBooks();
        this.bookidtoupdate = null;
      });
    }
    else {
      book.id = this.bookidtoupdate;
      this.bookservice.updateBook(book).subscribe(book => {
        this.datasaved = true;
        this.getSoftBooks();
        this.bookidtoupdate = null;
      })
    }

  }

  editBookStore(bookid: string) {
    this.bookservice.getBookById(bookid).subscribe(book => {
      this.bookidtoupdate = book.id;
      this.bookform.controls['name'].setValue(book.name);
      this.bookform.controls['category'].setValue(book.category);
      this.bookform.controls['description'].setValue(book.description);
      this.bookform.controls['writer'].setValue(book.writer);


    })
  }


  getSoftBooks() {
    // console.log("reacged here");
    // this.bookservice.getBooksFromStore().subscribe(books => this.softBooks = books);
    this.allbooks = this.bookservice.getBooksFromStore();
  }

  deleteBookfromStore(bookid: string) {
    var result = confirm("Are you sure want to delete this record?");
    if (result) {
      this.bookservice.deleteBook(bookid).subscribe(book => {
        this.getSoftBooks();
      });
    }
    else {
      return false;
    }
 }

  resetForm(){
    this.bookform.reset();
  }
}

