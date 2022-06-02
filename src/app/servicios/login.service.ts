import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore) {

  }

  async login(email: string, password: string) {
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);
    return result;
  }

  async registrarConMail(user: any) {
    //probar esto
    //const user = { name: name, email: email, password: password };
    console.log(user);
    
    const result = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
    this.firestore.collection('usuarios').add({...user}).then(() => this.verificarMail(user.email));

    return result;
  }

  async registrar(user: any) {
    //probar esto
    //const user = { name: name, email: email, password: password };
    console.log(user);
    
    const result = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
    this.firestore.collection('usuarios').add({...user});

    return result;
  }

  async verificarMail(email:string) {
    const verificationSettings = {
      url: 'http://localhost:4200/bienvenida',
      handleCodeInApp: true
    };

    await this.afAuth.sendSignInLinkToEmail(email, verificationSettings).then(() => {
      window.localStorage.setItem('emailForSignIn', email);
    })
  }

  /* async guardarUser() {
    try {
      const data = {
        uid: user.uid,
        lastSignIn: user.lastSignIn,
        topScoreAhorcado: user.topScoreAhorcado,
        topScoreMyM: user.topScoreMyM,
        topScorePreguntados: user.topScorePreguntados,
        topScorePropio: user.topScorePropio
      }
      await this.firestore.collection('users').add(data);
    } catch (error) {
      console.log(error);
    }
  } */

  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }
}
