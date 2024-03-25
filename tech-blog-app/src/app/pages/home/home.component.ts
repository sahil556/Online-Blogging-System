import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { LoaderService } from 'src/app/services/loader.service';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private postservice: PostService, private loader : LoaderService){}
  featuredPostArray: Array<{id:string, data:any}> = [];
  latestPostArray:Array<{id:string, data:any}> = [];
  ngOnInit()
  {
    this.loader.showLoader();
    this.postservice.loadFeaturedData().subscribe(val =>{
      this.featuredPostArray = val;
    })
    
    this.postservice.loadLatest().subscribe(val =>{
      this.latestPostArray = val;
      this.loader.hideLoader() ;
    })
    
  }
}
