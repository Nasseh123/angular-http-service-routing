import { BadInput } from './common/bad-input';
import { NotFoundError } from './common/not-foun-error';
import { AppError } from './common/app-error';
import { PostService } from './services/post.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  posts:any[];
  title = 'services';
  constructor(private postservice:PostService){}
  ngOnInit() {
  this.postservice.getAll()
   .subscribe((response:any)=>{
    this.posts= response
  });
  }
  createPost(input:HTMLInputElement){
    let post={title:input.value}
    input.value=''
    this.postservice.create(post).subscribe((response:any)=>{
      console.log(response)
      this.posts.splice(0,0,response)
    },error=>{

      if(error instanceof BadInput){

        alert('This post is already deleted.')
        console.log(error)
    }
      else throw error;
    })
  }
  updatePost(post){
    this.postservice.update(post).subscribe(response=>{
      console.log(response)
    });
  }
  deletePost(post){
    this.postservice.delete(post.id).subscribe(response=>{
      console.log(response)
      // let index=this.posts.indexOf(post);
      // this.posts.splice(index,1);
    },
    (error:AppError ) =>{
      if(error instanceof NotFoundError)
        alert('This post is already deleted.')
      else throw error;
    })
  }
 
}
