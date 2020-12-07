import { HomeComponent } from './components/home/home.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostsComponent } from './components/posts/posts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'posts/post-settings/:id/:title',component:PostDetailComponent},
  {path:'posts',component:PostsComponent},
  {path:'posts',component:PostsComponent},
  // {path:'morenfo',component:PostsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
