import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, isSignInWithEmailLink } from 'firebase/auth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) { }

  getUsuario = (uid: any): Observable<any> => {
    return this.firestore.collection('usuarios').doc(uid).get();
  }

  /* async saveMessage(message: Message) {
    try {
      await this.firestore.collection('mensajes').add(message);
    } catch (error) {
      console.log(error);
    }
  }

  //Actualiza un usuario
  updateUser(user: User) {
    return this.firestore.collection('users').doc(user.id).update(user);
  }*/

  //Obtiene todos los usuarios
  getUsuarios = (): Observable<any[]> => {
    return this.firestore.collection('usuarios').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => {
          const data = d.payload.doc.data() as any[];
          const id = d.payload.doc.id;

          return { id, ...data };
        })
      }));
  }

  async validarUsuario(tipoUsuario:any) {
    const auth = getAuth();
    var uid: string = '';

    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Por favor indicanos tu mail para validar');
      }

      this.getUsuarios().subscribe(listDoc => {
        listDoc.forEach(user => {
          if (user.mail == email) {
            uid = user.id;
            this.getUsuario(user.id).subscribe(user => {
              console.log(user.data());
              //aca debe ir el cambio de estado y validar que tipo de usuario es
              //hacer en otra funcion
            })
          }
        });
      });
    }
  }
}
