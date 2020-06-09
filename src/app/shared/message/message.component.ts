import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: 
  `<div *ngIf="itemErro()" class="ui-message ui-message-error">
   {{ text }}
  </div>`,
  styles: [`
  .ui-message-error {
    margin: 0;
    margin-top: 4px;
  }`]
})
export class MessageComponent {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  itemErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }

}
