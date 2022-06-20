import { Component, Input, OnInit } from '@angular/core';
import { EspecialistaComponent } from 'src/app/clases/especialista/especialista.component';
import { PacienteComponent } from 'src/app/clases/paciente/paciente.component';
import { TurnoComponent } from 'src/app/clases/turno/turno.component';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.scss']
})
export class MisPacientesComponent implements OnInit {
  @Input() especialista: EspecialistaComponent;
  listadoTurnos: TurnoComponent[];
  listadoTurnosMostrar: TurnoComponent[];
  listadoPacientesTop: PacienteComponent[];
  listadoPacientesCompleto: PacienteComponent[];
  listadoPacientesMostrar: PacienteComponent[];
  palabraBusqueda: string;
  emailPacientes: string[];
  turno: TurnoComponent;
  paciente: PacienteComponent;
  formHistoria: boolean;
  mostrarListado: boolean;


  constructor(private firestore: FirestoreService) {
    this.especialista = new EspecialistaComponent();
    this.listadoTurnos = [];
    this.emailPacientes = [];
    this.listadoTurnosMostrar = [];
    this.listadoPacientesTop = [];
    this.listadoPacientesCompleto = [];
    this.listadoPacientesMostrar = [];
    this.palabraBusqueda = '';
    this.turno = new TurnoComponent();
    this.paciente = new PacienteComponent();
    this.formHistoria = false;
    this.mostrarListado = true;
  }

  ngOnInit(): void {
    //este busca los turnos que hay
    const usuariosSub = this.firestore.getTurnos().subscribe(listDoc => {
      //recorre la lista de turnos
      listDoc.forEach((turno: TurnoComponent) => {
        //si el especialista es el mismo del turno, entra
        if (turno.especialista.email == this.especialista.email) {
          //agrego el email del paciente de ese turno
          if (this.emailPacientes.indexOf(turno.paciente.email) == -1) this.emailPacientes.push(turno.paciente.email);
        }
      });
      //version 1
      //this.listadoTurnosMostrar = this.listadoTurnos;      
    });

    setTimeout(() => {
      usuariosSub.unsubscribe();

      this.organizarPacientes();

    }, 1000);
  }

  organizarPacientes() {
    var contador = 0;
    this.listadoPacientesCompleto = [];
    this.listadoPacientesTop = [];
    //voy a buscar a todos los pacientes de la base
    const subs = this.firestore.getTipoUsuarios('paciente').subscribe(listPacientes => {
      if (contador == 0) {
        listPacientes.forEach((paciente: PacienteComponent) => {
          //recorro mi listado de emails de pacientes
          this.emailPacientes.forEach(email => {
            if (paciente.email == email) {
              if (this.listadoPacientesCompleto.indexOf(paciente) == -1) this.listadoPacientesCompleto.push(paciente);
            }
          })
        });
        contador++;
      }

      for (let i = 0; i < 3; i++) {
        if (this.listadoPacientesCompleto[i] != undefined) {
          this.listadoPacientesTop.push(this.listadoPacientesCompleto[i]);
          this.listadoPacientesCompleto.splice(i, 1);
        } else {
          this.mostrarListado = false;
        }
      }
    })

    setTimeout(() => {
      subs.unsubscribe();
    }, 1000);
  }

  //version turnos
  /* buscarPalabra() {
    if (this.palabraBusqueda == '') {
      this.listadoTurnosMostrar = this.listadoTurnos;
    } else {
      const palabra = this.palabraBusqueda.toLowerCase();
      this.listadoTurnosMostrar = this.listadoTurnos;

      this.listadoTurnosMostrar = this.listadoTurnosMostrar.filter((element, i, array) => {
        let arrayElementEspecialidad = element.especialidad.toLowerCase();
        let arrayElementPacienteNombre = element.paciente.nombre.toLowerCase();
        let arrayElementPacienteApellido = element.paciente.apellido.toLowerCase();
        return arrayElementEspecialidad.includes(palabra) || arrayElementPacienteNombre.includes(palabra) || arrayElementPacienteApellido.includes(palabra);
      })

    }
  } */

  //version pacientes
  buscarPalabra() {
    if (this.palabraBusqueda == '') {
      this.organizarPacientes();
    } else {
      const palabra = this.palabraBusqueda.toLowerCase();
      var contador = 0;
      this.listadoPacientesCompleto = [];
      this.listadoPacientesTop = [];
      //voy a buscar a todos los pacientes de la base
      const subs = this.firestore.getTipoUsuarios('paciente').subscribe(listPacientes => {
        if (contador == 0) {
          listPacientes.forEach((paciente: PacienteComponent) => {
            //recorro mi listado de emails de pacientes
            this.emailPacientes.forEach(email => {
              if (paciente.email == email) {
                if (this.listadoPacientesCompleto.indexOf(paciente) == -1) this.listadoPacientesCompleto.push(paciente);
              }
            })
          });
          contador++;
        }

        for (let i = 0; i < 3; i++) {
          if (this.listadoPacientesCompleto[i] != undefined) {
            this.listadoPacientesTop.push(this.listadoPacientesCompleto[i]);
            this.listadoPacientesCompleto.splice(i, 1);
          } else {
            this.mostrarListado = false;
          }
        }
      })

      setTimeout(() => {
        subs.unsubscribe();
        this.listadoPacientesTop = this.listadoPacientesTop.filter((element, i, array) => {
          let arrayElementPacienteNombre: string = element.nombre.toLowerCase();
          let arrayElementPacienteApellido: string = element.apellido.toLowerCase();
          let arrayElementPacienteDni: string = element.dni.toString();
          let arrayElementPacienteEdad: string = element.edad.toString();
          let arrayElementPacienteEmail: string = element.email.toLowerCase();
          let arrayElementPacienteObraSocial: string = element.obraSocial.toLowerCase();
          let arrayElementCampoDinamicoUnoClave = '}}}';
          let arrayElementCampoDinamicoUnoValor = '}}}';
          let arrayElementCampoDinamicoDosClave = '}}}';
          let arrayElementCampoDinamicoDosValor = '}}}';
          let arrayElementCampoDinamicoTresClave = '}}}';
          let arrayElementCampoDinamicoTresValor = '}}}';
          let arrayElementAltura = '}}}';
          let arrayElementPeso = '}}}';
          let arrayElementPresion = '}}}';
          let arrayElementTemperatura = '}}}';

          if (element.campoDinamicoUno) {
            arrayElementCampoDinamicoUnoClave = element.campoDinamicoUno.clave.toLowerCase();
            arrayElementCampoDinamicoUnoValor = element.campoDinamicoUno.valor.toLowerCase();
          }
          if (element.campoDinamicoDos) {
            arrayElementCampoDinamicoDosClave = element.campoDinamicoDos.clave.toLowerCase();
            arrayElementCampoDinamicoDosValor = element.campoDinamicoDos.valor.toLowerCase();
          }
          if (element.campoDinamicoTres) {
            arrayElementCampoDinamicoTresClave = element.campoDinamicoTres.clave.toLowerCase();
            arrayElementCampoDinamicoTresValor = element.campoDinamicoTres.valor.toLowerCase();
          }
          if (element.altura) {
            arrayElementAltura = element.altura.toString();
          }
          if (element.peso) {
            arrayElementPeso = element.peso.toString();
          }
          if (element.presion) {
            arrayElementPresion = element.presion.toString();
          }
          if (element.temperatura) {
            arrayElementTemperatura = element.temperatura.toString();
          }

          return arrayElementPacienteDni.includes(palabra) || arrayElementPacienteNombre.includes(palabra) || arrayElementPacienteApellido.includes(palabra) || arrayElementPacienteEdad.includes(palabra) || arrayElementPacienteEmail.includes(palabra) || arrayElementPacienteObraSocial.includes(palabra) || arrayElementCampoDinamicoUnoClave.includes(palabra) || arrayElementCampoDinamicoUnoValor.includes(palabra) || arrayElementCampoDinamicoDosClave.includes(palabra) || arrayElementCampoDinamicoDosValor.includes(palabra) || arrayElementCampoDinamicoTresClave.includes(palabra) || arrayElementCampoDinamicoTresValor.includes(palabra) || arrayElementAltura.includes(palabra) || arrayElementPeso.includes(palabra) || arrayElementPresion.includes(palabra) || arrayElementTemperatura.includes(palabra);
        });

        this.listadoPacientesCompleto = this.listadoPacientesCompleto.filter((element, i, array) => {
          let arrayElementPacienteNombre = element.nombre.toLowerCase();
          let arrayElementPacienteApellido: string = element.apellido.toLowerCase();
          let arrayElementPacienteDni = element.dni.toString();
          let arrayElementPacienteEdad = element.edad.toString();
          let arrayElementPacienteEmail = element.email.toLowerCase();
          let arrayElementPacienteObraSocial = element.obraSocial.toLowerCase();
          let arrayElementCampoDinamicoUnoClave = '}}}';
          let arrayElementCampoDinamicoUnoValor = '}}}';
          let arrayElementCampoDinamicoDosClave = '}}}';
          let arrayElementCampoDinamicoDosValor = '}}}';
          let arrayElementCampoDinamicoTresClave = '}}}';
          let arrayElementCampoDinamicoTresValor = '}}}';
          let arrayElementAltura = '}}}';
          let arrayElementPeso = '}}}';
          let arrayElementPresion = '}}}';
          let arrayElementTemperatura = '}}}';

          if (element.campoDinamicoUno) {
            arrayElementCampoDinamicoUnoClave = element.campoDinamicoUno.clave.toLowerCase();
            arrayElementCampoDinamicoUnoValor = element.campoDinamicoUno.valor.toLowerCase();
          }
          if (element.campoDinamicoDos) {
            arrayElementCampoDinamicoDosClave = element.campoDinamicoDos.clave.toLowerCase();
            arrayElementCampoDinamicoDosValor = element.campoDinamicoDos.valor.toLowerCase();
          }
          if (element.campoDinamicoTres) {
            arrayElementCampoDinamicoTresClave = element.campoDinamicoTres.clave.toLowerCase();
            arrayElementCampoDinamicoTresValor = element.campoDinamicoTres.valor.toLowerCase();
          }
          if (element.altura) {
            arrayElementAltura = element.altura.toString();
          }
          if (element.peso) {
            arrayElementPeso = element.peso.toString();
          }
          if (element.presion) {
            arrayElementPresion = element.presion.toString();
          }
          if (element.temperatura) {
            arrayElementTemperatura = element.temperatura.toString();
          }
          return arrayElementPacienteDni.includes(palabra) || arrayElementPacienteNombre.includes(palabra) || arrayElementPacienteApellido.includes(palabra) || arrayElementPacienteEdad.includes(palabra) || arrayElementPacienteEmail.includes(palabra) || arrayElementPacienteObraSocial.includes(palabra) || arrayElementCampoDinamicoUnoClave.includes(palabra) || arrayElementCampoDinamicoUnoValor.includes(palabra) || arrayElementCampoDinamicoDosClave.includes(palabra) || arrayElementCampoDinamicoDosValor.includes(palabra) || arrayElementCampoDinamicoTresClave.includes(palabra) || arrayElementCampoDinamicoTresValor.includes(palabra) || arrayElementAltura.includes(palabra) || arrayElementPeso.includes(palabra) || arrayElementPresion.includes(palabra) || arrayElementTemperatura.includes(palabra);
        });
      }, 1000);



    }
  }

  //version 1
  /* verMas(turno:TurnoComponent){
    this.turno = turno;
    this.formHistoria = true;
  } */

  verMas(paciente: PacienteComponent) {
    this.paciente = paciente;
    this.formHistoria = true;
  }

  cerrarForm($event: boolean) {
    if (!$event) {
      this.formHistoria = !this.formHistoria;
    }
  }

}
