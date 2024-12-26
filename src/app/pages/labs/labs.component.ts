import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
  standalone: true,
})
export class LabsComponent {
  tareas = ['Tarea 1', 'Tarea 2', 'Tarea 3', 'Tarea 4', 'Tarea 5'];
  nombre = signal('Edgardo');
  persons = [
    {
      namePerson: 'Edgardo',
      age: 27,
      imgUrl: 'https://w3schools.com/w3images/avatar2.png',
    },
    {
      namePerson: 'María',
      age: 24,
      imgUrl: 'https://w3schools.com/w3images/avatar4.png',
    },
    {
      namePerson: 'Juan',
      age: 30,
      imgUrl: 'https://w3schools.com/w3images/avatar3.png',
    },
  ];

  clickHandler() {
    alert('Click en el botón');
  }
  changeHandler(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.nombre.set(value);
  }
}
