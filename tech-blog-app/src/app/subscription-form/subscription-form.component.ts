import { Component } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent {
  isEmailTaken: boolean = false;
  isSubscribed: boolean = false;
  constructor(private subservice: SubscriptionService) { }
  onSubmit(formVal: any) {
    console.log("Request Come")
    const subData: Sub = {
      name: formVal.name,
      email: formVal.email
    }
    this.subservice.checkSubs(subData.email).subscribe(val => {
      if (val.empty) {
        console.log("Subscriber Do not Exists")
        this.subservice.addData(subData);
        this.isSubscribed = true;
        this.isEmailTaken = false;
      }
      else {
        this.isEmailTaken = true
      }
    })
  }
}
