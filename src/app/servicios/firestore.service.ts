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

  //Actualiza un usuario
  actualizarUsuario(user: any) {
    return this.firestore.collection('usuarios').doc(user.id).update(user);
  }

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

  BuscarTipoUsuario = async (user: any) => {
    switch (user.tipo) {
      case 'paciente':
        user.estado = 'valido';
        break;

      default:
        break;
    }

    await this.actualizarUsuario(user);
  }

  /* ESPECIALIDADES */

  //Obtiene todos las especialidades
  getEspecialidades = (): Observable<any[]> => {
    return this.firestore.collection('especialidades').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => {
          const data = d.payload.doc.data() as any[];
          const id = d.payload.doc.id;

          return { id, ...data };
        })
      }));
  }

  //esta despues se borra
  /* async guardarEspecialidades() {
    const guardar = [
      {
        especialidad: 'oftalmologia'
      },
      {
        especialidad: 'pediatria'
      },
      {
        especialidad: 'dentista'
      }
    ];

    try {
      guardar.forEach(dato => {
        this.firestore.collection('especialidades').add({especialidad: dato.especialidad});
      })
    } catch (error) {
      console.log(error);
    }
  } */

  async guardarEspecialidad(especialidad: string) {
    return this.firestore.collection('especialidades').add({especialidad: especialidad});
  }


}
