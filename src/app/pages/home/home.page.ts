import { ReusableAlertComponent } from 'src/app/components/resuable-alert/resuable-alert.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    ReusableAlertComponent
  ],
})
export class HomePage {
  selectedSegment: string = 'login';

  loginUser: string = '';
  loginPassword: string = '';

  registerUser: string = '';
  registerPassword: string = '';

  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;
  showLoginSuccessAlert: boolean = false;
  showLoginErrorAlert: boolean = false;

  alertHeader: string = '';
  alertMessage: string = '';
  alertCssClass: string = '';

  private readonly CORRECT_USER = 'juan';
  private readonly CORRECT_PASSWORD = '1234';

  constructor() { }

  handleLogin() {
    // Validar que los campos no estén vacíos
    if (!this.loginUser.trim() || !this.loginPassword.trim()) {
      this.alertHeader = 'Campos vacíos';
      this.alertMessage = 'Por favor completa todos los campos para iniciar sesión.';
      this.alertCssClass = 'alert-error';
      this.showLoginErrorAlert = true;
      return;
    }

    // Validar credenciales
    if (
      this.loginUser.toLowerCase() === this.CORRECT_USER &&
      this.loginPassword === this.CORRECT_PASSWORD
    ) {
      this.alertHeader = 'Acceso Concedido';
      this.alertMessage = '¡Bienvenido! Has iniciado sesión correctamente.';
      this.alertCssClass = 'alert-success';
      this.showLoginSuccessAlert = true;

      // Limpiar campos
      this.loginUser = '';
      this.loginPassword = '';
    } else {
      this.alertHeader = 'Acceso Denegado';
      this.alertMessage = 'Usuario o contraseña incorrectos. Intenta de nuevo.';
      this.alertCssClass = 'alert-error';
      this.showLoginErrorAlert = true;
    }
  }

  handleRegister() {
    if (!this.registerUser.trim() || !this.registerPassword.trim()) {
      this.alertHeader = 'Campos incompletos';
      this.alertMessage = 'Por favor completa todos los campos para registrarte.';
      this.showErrorAlert = true;
      return;
    }

    if (this.registerPassword.length < 4) {
      this.alertHeader = 'Contraseña muy corta';
      this.alertMessage = 'La contraseña debe tener al menos 4 caracteres.';
      this.alertCssClass = 'alert-error';
      this.showErrorAlert = true;
      return;
    }

    this.alertHeader = 'Registrado Correctamente';
    this.alertMessage = `Usuario "${this.registerUser}" registrado correctamente. ¡Ya puedes iniciar sesión!`;
    this.alertCssClass = 'alert-success';
    this.showSuccessAlert = true;

    this.registerUser = '';
    this.registerPassword = '';
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    this.clearAllFields();
  }

  clearAllFields() {
    this.loginUser = '';
    this.loginPassword = '';
    this.registerUser = '';
    this.registerPassword = '';
  }

  onSuccessAlertDismiss() {
    this.showSuccessAlert = false;
    // Cambiar a la vista de login después de registro exitoso
    this.selectedSegment = 'login';
  }
}