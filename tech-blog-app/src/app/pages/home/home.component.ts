import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private postservice: PostService){}
  featuredPostArray: Array<{data:any}> = [];
  ngOnInit()
  {
    this.postservice.loadFeaturedData().subscribe(val =>{
      this.featuredPostArray = val;
    })
    
    
  }
}
