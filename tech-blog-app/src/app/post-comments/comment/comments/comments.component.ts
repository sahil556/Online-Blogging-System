import { Component, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActiveCommnetInterface } from '../../types/activeComment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() currentUserId!: string;
  @Input() postId!: string;

  commentArray : Array<{id:string, data: any}> = [];
  repliesArray: Array<{id:string, data: any}> = [];
  activeComment : ActiveCommnetInterface | null = null;
  constructor(private postservice: PostService,){}
  
  ngOnInit(): void
    {
      this.postservice.loadCommentsOfUser(this.currentUserId).subscribe(val =>{
        this.commentArray = val;
        console.log(this.commentArray);
        console.log("loading comments")
      })
    }

    getRootComments(): Array<{id:string, data:any}> {
      return this.commentArray.filter((comment) => comment.data.parentId === null);
    }

    addComment({text, parentId}:{text: string, parentId: string| null}):void{
        // console.log(text, parentId, this.postId);
        this.postservice.createComment(text, parentId,this.postId, this.currentUserId);
        this.activeComment = null;
    }
    updateComment({text, commentId}:{text: string, commentId: string}):void{
        this.postservice.updateComment(text, commentId);
        this.activeComment = null;
    }   

    getReplies(commentId: string){
        this.postservice.getRepliesOfComment(commentId).subscribe(val => {
            this.repliesArray = val;
        })
        return this.repliesArray;
    }

    setActiveComment(activeComment: ActiveCommnetInterface | null){
        this.activeComment = activeComment;
    }

    deleteComment({commentId}:{commentId: string})
    {
        this.postservice.deleteComment(commentId);
    }
    
}
