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
  datos: any;

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

  async guardarTurnosGrafico() {
    return this.firestore.collection('turnosGraficos').add({ ...this.datos });
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

  getTurnosPorQuery = (desde: Date, hasta: Date): Observable<any[]> => {
    var mesDesde = '';
    var mesHasta = '';
    var diaDesde = '';
    var diaHasta = '';

    if (desde.getMonth() + 1 < 10) {
      mesDesde = '0' + (desde.getMonth() + 1);
    } else {
      mesDesde = (desde.getMonth() + 1).toString();
    }

    if (hasta.getMonth() + 1 < 10) {
      mesHasta = '0' + (hasta.getMonth() + 1);
    } else {
      mesHasta = (hasta.getMonth() + 1).toString();
    }

    if (desde.getDate() < 10) {
      diaDesde = '0' + desde.getDate();
    } else {
      diaDesde = desde.getDate().toString();
    }

    if (hasta.getDate() + 1 < 10) {
      diaHasta = '0' + hasta.getDate();
    } else {
      diaHasta = hasta.getDate().toString();
    }

    const inicio = desde.getFullYear() + '-' + mesDesde + '-' + diaDesde;
    const fin = hasta.getFullYear() + '-' + mesHasta + '-' + diaHasta;

    return this.firestore.collection('turnos', ref => ref.where('dia', '>', inicio).where('dia', '<', fin)).snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => {
          const data = d.payload.doc.data() as any[];
          const id = d.payload.doc.id;

          return { id, ...data };
        })
      }));
  }

  getTurnosPorfecha = (fecha: string): Observable<any[]> => {
    return this.firestore.collection('turnos', ref => ref.where('dia', '==', fecha)).snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => {
          const data = d.payload.doc.data() as any[];
          const id = d.payload.doc.id;

          return { id, ...data };
        })
      }));
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

  getIngresosPorQuery = (desde: Date, hasta: Date): Observable<any[]> => {
    var mesDesde = '';
    var mesHasta = '';
    var diaDesde = '';
    var diaHasta = '';

    if (desde.getMonth() + 1 < 10) {
      mesDesde = '0' + (desde.getMonth() + 1);
    } else {
      mesDesde = (desde.getMonth() + 1).toString();
    }

    if (hasta.getMonth() + 1 < 10) {
      mesHasta = '0' + (hasta.getMonth() + 1);
    } else {
      mesHasta = (hasta.getMonth() + 1).toString();
    }

    if (desde.getDate() < 10) {
      diaDesde = '0' + desde.getDate();
    } else {
      diaDesde = desde.getDate().toString();
    }

    if (hasta.getDate() + 1 < 10) {
      diaHasta = '0' + hasta.getDate();
    } else {
      diaHasta = hasta.getDate().toString();
    }

    const inicio = desde;
    const fin = hasta;

    return this.firestore.collection('ingresos', ref => ref.where('dia', '>', inicio).where('dia', '<', fin)).snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => {
          const data = d.payload.doc.data() as any[];
          const id = d.payload.doc.id;

          return { id, ...data };
        })
      }));
  }

}
