import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
  @Input() submitLabel! : string;
  @Input() hasCancelButton: Boolean = false;
  @Input() initialText: string = '';

  @Output() handleSubmit = new EventEmitter<string>();
  @Output() handleCancel = new EventEmitter<void>();

  commnetForm!: FormGroup;
  
  constructor(private fb: FormBuilder){}
  ngOnInit()
  {
    console.log("rendering form compontn")
    this.commnetForm = this.fb.group({
      title: [this.initialText, Validators.required],

    });
  }
  onSubmit():void {
    this.handleSubmit.emit(this.commnetForm.value.title);
    this.commnetForm.reset();
  }
}
