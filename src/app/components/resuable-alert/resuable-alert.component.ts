import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonAlert } from '@ionic/angular/standalone';

export interface AlertButton {
  text: string;
  role?: 'cancel' | 'destructive' | 'confirm';
  cssClass?: string;
  handler?: () => void | boolean;
}

@Component({
  selector: 'app-reusable-alert',
  templateUrl: './resuable-alert.component.html',
  standalone: true,
  imports: [IonAlert],
})
export class ReusableAlertComponent {
  @Input() isOpen: boolean = false;
  @Input() header: string = '';
  @Input() subHeader?: string;
  @Input() message: string = '';
  @Input() buttons: (string | AlertButton)[] = ['OK'];
  @Input() cssClass?: string;
  
  @Output() didDismiss = new EventEmitter<void>();

  onDidDismiss() {
    this.isOpen = false;
    this.didDismiss.emit();
  }
}