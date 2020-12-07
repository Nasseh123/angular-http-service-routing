import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-foun-error';
import { AppError } from './../common/app-error';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable, throwError } from 'rxjs';
// import 'rxjs/add/observable/throw';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
// private url='http://localhost:3000/posts'
  constructor(private url:string,private http:HttpClient) {
    
    
   }
   getAll(){
    return this.http.get(this.url)

  }
  create(resource){
    return this.http.post(this.url,resource)
    .pipe(catchError((this.handleError)))
  }
  update(resource){
    return this.http.patch(this.url+'/'+resource.id,JSON.stringify({isRead:true}))
    .pipe(catchError(this.handleError))
  }
  delete(id){
    console.log(id)
    return this.http.delete(this.url+ '/' + id)
    .pipe(catchError(this.handleError))
  }
  private handleError(error:Response){
    if (error.status ===404)
    return throwError(new NotFoundError())
    
    if (error.status ===400)
    return throwError(new BadInput(error.json()))
    
  return throwError(new AppError(error));
  }
}
