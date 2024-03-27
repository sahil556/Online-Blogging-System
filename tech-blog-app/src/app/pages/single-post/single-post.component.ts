import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent {
  constructor(private route: ActivatedRoute, private postservice: PostService, private loader: LoaderService){}
    singlePost : any;
    postId : string = "";
    currentUserId: string | null = ""; 
    similarPostArray: Array<{id:string, data:any}>=[];
    commentArray: Array<{id:string, data:any}>=[];
    ngOnInit()
    {
      this.currentUserId = JSON.parse(localStorage.getItem('user') || '{}').email
      this.loader.showLoader();
      this.route.params.subscribe(val =>{

        this.postservice.countViews(val['id'])
        
        this.postservice.loadOnePost(val['id']).subscribe(post =>{
          this.singlePost = post;
          this.postId = val['id'];
          this.loadSimilarPost(this.singlePost.category.categoryId);
          this.loadComments(this.postId);
          this.loader.hideLoader();
        })
      })
    } 

    async loadSimilarPost(catId: string)
    {
      this.postservice.loadSimilar(catId).subscribe(val =>{
        this.similarPostArray = val;
      })
    }

    async loadComments(postId: string)
    {
      this.postservice.loadComments(postId).subscribe(val =>{
        this.commentArray = val;
      })
    }

}
