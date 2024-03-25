import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ToastrService
 } from 'ngx-toastr';
@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent {
  postArray: Array<{id:string, data:any}> = [];
  constructor(private postservice: PostService, private toast: ToastrService){}
  ngOnInit()
  {
    
    this.toast.warning("Please Wait While Loading...")
    this.postservice.loadData().subscribe(val =>{
      this.postArray = val;
    })
    
  }
  

  onDelete(postImgPath:string, id:string) {
    this.postservice.deleteImage(postImgPath, id);
  }
}
