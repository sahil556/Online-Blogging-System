import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {

  @Input() postData : {data: any} | undefined;
  ngOnInit()
  {
    console.log(this.postData)
  }
}
