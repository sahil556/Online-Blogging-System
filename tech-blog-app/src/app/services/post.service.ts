import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularfirestore: AngularFirestore) { }

  loadFeaturedData()
  {
    return this.angularfirestore.collection('posts', ref =>ref.where('isFeatured','==', true).limit(4)).snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )
  }

  loadLatest()
  {
    return this.angularfirestore.collection('posts', ref=> ref.orderBy('createdAt')).snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )
  }

  loadCategoryPost(caetgoryId : string)
  {
    return this.angularfirestore.collection('posts', ref =>ref.where('category.categoryId','==', caetgoryId )).snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )
  }

}
