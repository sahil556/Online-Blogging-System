import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent {

  constructor(private categoryService: CategoriesService){}
  categoryArray : Array<{id:string, data:any}> = [];
  ngOnInit()
  {
    this.categoryService.loadData().subscribe(data =>{
      this.categoryArray = data;
    });

  }
}
