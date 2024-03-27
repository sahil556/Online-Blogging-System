import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { ActiveCommentType } from '../../types/activeCommentTypes';
import { ActiveCommnetInterface } from '../../types/activeComment';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent {
  canReply: boolean = false;
  canDelete:boolean = false;
  canEdit:boolean = false;
  createdAt: string = '';
  activeCommentType = ActiveCommentType
  replyId: string | null = null;

  @Output() setActiveComment = new EventEmitter<ActiveCommnetInterface | null>();
  @Output() addComment = new EventEmitter<{text: string, parentId: string | null}>();
  @Output() updateComment = new EventEmitter<{text:string, commentId: string}>();
  @Output() deleteComment = new EventEmitter<{commentId: string}>();

  @Input() currentUserId! : string;
  @Input() commentData! : {id:string, data: any};
  replies! : Array<{id:string, data:any}> ;
  @Input() activeComment!: ActiveCommnetInterface | null;
  @Input() parentId! : string | null;

  constructor(private postservice: PostService){
    if(this.parentId != null)
      this.getReplies(this.parentId);
    else
      this.replies = [];
  }
 

  ngOnInit():void{
    console.log("rendering single comment comp")
    this.canReply = Boolean(this.currentUserId);
    const fiveMinutes = 100000;
    const timePassed = false;
    // new Date().getMilliseconds() - new Date(this.commentData.data.createdAt).getMilliseconds() > fiveMinutes;
    this.canEdit = this.currentUserId === this.commentData.data.userEmail && !timePassed;
    this.canDelete = this.currentUserId === this.commentData.data.userEmail && !timePassed && this.replies.length === 0;
    this.replyId = this.parentId ? this.parentId : this.commentData.id;
  }
  isReplying()
  {
    if(!this.activeComment) return false;
    return this.activeComment.id === this.commentData.id && this.activeComment.type === this.activeCommentType.replying;
  }

  isEditing()
  {
    console.log("is editing called")
    if(!this.activeComment) return false;
    return this.activeComment.id === this.commentData.id && 
    this.activeComment.type === this.activeCommentType.editing;
  }

  getReplies(commentId: string){
    console.log("calling get Replies")
    this.postservice.getRepliesOfComment(commentId).subscribe(val => {
        this.replies = val;
    })
    return this.replies;
}

}
