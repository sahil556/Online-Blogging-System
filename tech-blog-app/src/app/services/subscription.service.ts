import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Sub } from '../models/sub';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private afs: AngularFirestore) { }
  addData(subForm: Sub){
    this.afs.collection('subscribers').add(subForm).then(docRef =>{
      console.log("Subscription Done")
    })
    .catch(err =>{
      console.log(err);
    })
  }

  checkSubs(email: string){
    return this.afs.collection('subscribers', ref=> ref.where('email', '==', email)).get();
  }

  loadData(){
    return this.afs.collection('subscribers').snapshotChanges().pipe(
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
