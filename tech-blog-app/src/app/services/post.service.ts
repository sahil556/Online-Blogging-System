import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularfirestore: AngularFirestore,private angularfirestorage: AngularFireStorage,  private toast : ToastrService, private router: Router) { }

  // uploading image to firestore and storing image url to post object
  uploadImage(selectedImage: any, postData: Post, formStatus: string, id:string) {
    const filePath = `postIMG/${Date.now()}`;
    
    postData.userEmail = this.checkemail();
    this.angularfirestorage.upload(filePath, selectedImage).then(() => {
      console.log('post Image Uploaded Successfully...');
      this.angularfirestorage.ref(filePath).getDownloadURL().subscribe(url => {
        postData.postImgPath = url;
        if(formStatus == 'Edit')
        {
          this.updateData(postData, id);
        }
        else
        {
        this.saveData(postData);
        }

      })
    })
  }

  // saving data to cloud firestore
  saveData(postData: Post) {
    console.log("saving data")
    console.log(postData)
    this.angularfirestore.collection('posts').add(postData).then(docRef => {
      console.log(docRef);
      this.toast.success('Data Inserted Successfully !')
      
      // get all subscribers here
      // this.subscriberService.loadData().subscribe(values =>{
      //   this.subscribersArray = values;
      // })      
      // this.subscribersArray.forEach(element => {
      //   emailjs.init("NvHqVqPwqGANopNMd");
      //   emailjs.send("service_je7kaff","template_j128vme",{
      //     Title_Post: postData.title,
      //     Post_Link: "https://tech-blog-application.web.app/post/" + docRef.id ,
      //     To_Email: element.data.email,
      //     }).then(() =>{
      //       console.log("subscribers are notified")
      //     }, (error) =>{
      //       console.log("notification failed")
      //     })
  
      // });
      // this.toast.success('All subscribers are notified!', "Notifications of new post is sent to all subscribers")
      this.router.navigate(['/myposts']);
    })
      .catch(err => {
        this.toast.error("Failed to Insert Data !")
      });
  }

  updateData(postData : Post, id:string)
  {
    postData.userEmail = "sahiln@gmail.com";
    this.angularfirestore.doc(`posts/${id}`).update(postData).then(docRef =>{
      this.toast.success("Post Updated Successfully !");
      this.router.navigate(['/posts']);
    })
    .catch(err =>{
      this.toast.success("Something Went Wrong !")
    })
  }

  //deleting post 
  deleteImage(postImgPath:string, id:string)
  {
    this.angularfirestorage.storage.refFromURL(postImgPath).delete().then(()=>{
      this.deleteData(id);
    })
  }
  deleteData(id: string)
  {
    this.angularfirestore.doc(`posts/${id}`).delete().then(docRef =>{
      this.toast.warning("Post Deleted Successfully !");
    })
  }


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

  checkemail()
  {
    const email : string = JSON.parse(localStorage.getItem('user') || '{}').email;
    if(email == "")
    {
      console.log("Blog Post Operation Failed", "please restart yout session by login again");
      this.router.navigate(['login']);
      return "";
    }
    return email;
  }
  loadData()
  {
    
    return this.angularfirestore.collection('posts', ref => ref.where('userEmail', '==', this.checkemail())).snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )
  }

  loadOnePost(id: string)
  {
    return this.angularfirestore.collection('posts').doc(id).valueChanges();
  }

  loadSimilar(categoryId: string)
  {
    return this.angularfirestore.collection('posts', ref =>ref.where('category.categoryId','==', categoryId )).snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )
  }

  loadComments(postId: string)
  {
    console.log("postId : ", postId);
    return this.angularfirestore.collection('comments', ref =>ref.where('postId','==', postId).where('status', '==', 'Approved')).snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )
  }

  loadCommentsOfUser(userEmail: string)
  {
    console.log("email", userEmail);
    return this.angularfirestore.collection('comments', ref =>ref.where('userEmail','==', userEmail)).snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )
  }

  countViews(postId: string){

    const viewsCount = {
      views: firebase.default.firestore.FieldValue.increment(1)
    }
    this.angularfirestore.doc(`posts/${postId}`).update(viewsCount).then(()=>{
      console.log("Views Updated Successfully...")
    })
  }

  addComment(commentForm: any, Id : string){
    const comment = {
        postId: Id,
        name : commentForm.name,
        comment: commentForm.comment,
        status: 'pending',
        createdAt: new Date()
    };

    this.angularfirestore.collection('comments').add(comment).then(docRef=>{
      this.toast.success('Commnets Added & will be Visible After Verification');
      this.router.navigate(['/']);
    })
    .catch(err =>{
      this.toast.warning('Something Went Wrong !', "please try after some time");
    })
    return true;
  }

  createComment(text: string, parentId:null|string, Id: string, email: string){
    console.log(text, parentId, email)
    const comment = {
      postId : Id,
      userEmail: email,
      comment: text,
      status: 'Approved',
      createdAt: new Date().toISOString(),
      parentId: parentId
    }
    this.angularfirestore.collection('comments').add(comment).then(docRef=>{
      this.toast.success('Commnets Added & will be Visible After Verification');
    })
    .catch(err =>{
      this.toast.warning('Something Went Wrong !', "please try after some time");
    })
    return true;
  }

  getRepliesOfComment(parentId: string){
    return this.angularfirestore.collection('comments', ref =>ref.where('parentId','==', parentId)).snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data};
        })
      })
    )
  }

  updateComment(comment: string, commentId: string){
    this.angularfirestore.doc(`comments/${commentId}`).update({comment: comment}).then(docRef =>{
      this.toast.success("Comment Updated Successfully !");
    })
    .catch(err =>{
      this.toast.success("Something Went Wrong !")
    })
  }

  deleteComment(id: string)
  {
    this.angularfirestore.doc(`comments/${id}`).delete().then(docRef =>{
      this.toast.warning("Comment Deleted Successfully !");
    })
  }

  navigateToLogin()
  {
    this.router.navigate(['/login']);
  }
}
