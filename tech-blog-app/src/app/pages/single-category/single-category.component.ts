import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent {
  constructor(private route: ActivatedRoute, private postService: PostService, private loader : LoaderService){}
  categoryPostArray: Array<{id:string, data:any}> = [];
  category: string = '';
  ngOnInit()
  {
    this.loader.showLoader();
    this.route.params.subscribe(val =>{
      this.category = val['category']
      this.postService.loadCategoryPost(val['id']).subscribe(post =>{
        this.categoryPostArray = post;
      })
    })
    this.loader.hideLoader();
  }
 
}
