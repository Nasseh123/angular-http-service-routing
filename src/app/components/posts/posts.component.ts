import { Component, OnInit } from '@angular/core';
import { AppError } from 'src/app/common/app-error';
import { BadInput } from 'src/app/common/bad-input';
import { NotFoundError } from 'src/app/common/not-foun-error';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts:any[];
  title = 'services';
  constructor(private postservice:PostService){}
  ngOnInit() {
  this.postservice.getAll()
   .subscribe((response:any)=>this.posts= response)};
  createPost(input:HTMLInputElement){
    let post={title:input.value}
    this.posts.splice(0,0,post)

    input.value=''
    this.postservice.create(post)
      .subscribe((response:any)=>{
        post['id']=response.id;
        console.log(response)
     
    },error=>{
      this.posts.splice(0,1)

      if(error instanceof BadInput){

        alert('The post cannot be found or it is already deleted.')
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
    let index=this.posts.indexOf(post);
    this.posts.splice(index,1)
    this.postservice.delete(post.id).subscribe(response=>{
      alert(`Record ${post.title} deleted succesfuly`)
    },
    (error:AppError ) =>{
      this.posts.splice(index,0,post)
      if(error instanceof NotFoundError)
        alert('The post cannot be found or it is already deleted.')
      else throw error;
    })
  }
 
}
