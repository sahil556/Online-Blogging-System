import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { SingleCommentComponent } from './single-comment/single-comment.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CommentsComponent, SingleCommentComponent, CommentFormComponent],
  exports:[CommentsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CommentModule { }
