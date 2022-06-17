import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, isSignInWithEmailLink } from 'firebase/auth';
import { map, Observable } from 'rxjs';
import { PacienteComponent } from '../clases/paciente/paciente.component';
import { TurnoComponent } from '../clases/turno/turno.component';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) { }

  getUsuario = (uid: any): Observable<any> => {
    return this.firestore.collection('usuarios').doc(uid).get();
  }

  getTipoUsuarios = (tipo: string): Observable<any> => {
    return this.firestore.collection('usuarios', ref => ref.where('tipo', '==', tipo)).valueChanges();
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
          const uid = d.payload.doc.id;


          return { uid, ...data };
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

  async guardarEspecialidad(especialidad: string) {
    return this.firestore.collection('especialidades').add({ especialidad: especialidad });
  }

  /* TURNOS */

  async guardarTurno(turno: TurnoComponent) {
    return this.firestore.collection('turnos').add({ ...turno });
  }

  getTurnos = (): Observable<any[]> => {
    return this.firestore.collection('turnos').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => {
          const data = d.payload.doc.data() as any[];
          const id = d.payload.doc.id;

          return { id, ...data };
        })
      }));
  }

  actualizarTurno(turno: any) {
    return this.firestore.collection('turnos').doc(turno.id).update(turno);
  }

  /* INGRESOS */

  async guardarIngreso(ingreso: any) {
    return this.firestore.collection('ingresos').add({ ...ingreso });
  }

  getIngresos = (): Observable<any[]> => {
    return this.firestore.collection('ingresos').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => {
          const data = d.payload.doc.data() as any[];
          const id = d.payload.doc.id;

          return { id, ...data };
        })
      }));
  }

}
