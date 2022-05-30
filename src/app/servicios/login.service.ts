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
    const user = { email: email, password: password };
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);
    return result;
  }

  async register(name: string, email: string, password: string) {

    const user = { name: name, email: email, password: password };
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.firestore.collection('usuarios').add(user);

    return result;
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
