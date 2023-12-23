import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent {
  constructor(private route: ActivatedRoute, private postService: PostService){}
  categoryPostArray: Array<{data:any}> = [];
  category: string = '';
  ngOnInit()
  {

    this.route.params.subscribe(val =>{
      this.category = val['category']
      this.postService.loadCategoryPost(val['id']).subscribe(post =>{
        this.categoryPostArray = post;
      })
    })
  }
}
