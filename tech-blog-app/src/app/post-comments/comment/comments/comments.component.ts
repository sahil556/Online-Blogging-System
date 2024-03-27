import { Component, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActiveCommnetInterface } from '../../types/activeComment';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private postservice: PostService, private toastservice : ToastrService){}
  
  ngOnInit(): void
    {
      console.log(this.currentUserId)
      this.postservice.loadComments(this.postId).subscribe(val =>{
        this.commentArray = val;
      })
    }

    getRootComments(): Array<{id:string, data:any}> {
      return this.commentArray.filter((comment) => comment.data.parentId === null);
    }

    addComment({text, parentId}:{text: string, parentId: string| null}):void{
        if(localStorage.getItem('user') == null || JSON.parse(localStorage.getItem('user') || '{}').email == undefined || localStorage.length == 0)
        {
          this.toastservice.info("You must login to comment", "please login into your account");
          this.postservice.navigateToLogin();
          return;
        }
        this.postservice.createComment(text, parentId,this.postId, this.currentUserId);
        this.activeComment = null;
    }
    updateComment({text, commentId}:{text: string, commentId: string}):void{
      if(localStorage.getItem('user') == 'null')
      {
        this.toastservice.info("You must login to comment", "please login into your account");
        this.postservice.navigateToLogin();
        return;
      }
        this.postservice.updateComment(text, commentId);
        this.activeComment = null;
    }   

    getReplies(commentId: string){
      return this.commentArray
      .filter((comment) => comment.data.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.data.createdAt).getTime() - new Date(b.data.createdAt).getTime()
      );
    }

    setActiveComment(activeComment: ActiveCommnetInterface | null){
        this.activeComment = activeComment;
    }

    deleteComment({commentId}:{commentId: string})
    {
        this.postservice.deleteComment(commentId);
    }
    
}
