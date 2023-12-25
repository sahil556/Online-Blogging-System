import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent {

    constructor(private route: ActivatedRoute, private postservice: PostService){}
    singlePost : any;
    similarPostArray: Array<{id:string, data:any}>=[];
    ngOnInit()
    {
      this.route.params.subscribe(val =>{

        this.postservice.countViews(val['id'])
        
        this.postservice.loadOnePost(val['id']).subscribe(post =>{
          this.singlePost = post;
          this.loadSimilarPost(this.singlePost.category.categoryId)
        })
      })
    }

    async loadSimilarPost(catId: string)
    {
      this.postservice.loadSimilar(catId).subscribe(val =>{
        this.similarPostArray = val;
      })
    }

}
