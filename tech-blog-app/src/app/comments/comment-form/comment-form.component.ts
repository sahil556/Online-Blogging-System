import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
  @Input() postId : string;

  constructor(private postService: PostService, private toastr : ToastrService){
    this.postId = "";
  }
  onComment(commentForm: any)
  {
    this.postService.addComment(commentForm, this.postId);
   
      console.log("comment submitted ");
      
  }

}
