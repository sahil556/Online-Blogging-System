import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comments-dashboard',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  constructor(private postservice: PostService){}
  commentArray : Array<{id:string, data: any}> = [];
  userEmail : string = '';
  ngOnInit()
  {
    this.getComments();
  }

  getComments()
  {
    this.userEmail = JSON.parse(localStorage.getItem('user') || '{}').email;
    this.postservice.loadCommentsOfUser(this.userEmail).subscribe(val =>{
      this.commentArray = val;
      this.commentArray.forEach(element => {
        element.data.postId = "https://tech-blog-application.web.app/post/" + element.data.postId;        
      });
     
    })
    console.log(this.commentArray);
    return this.commentArray;
  }
}
