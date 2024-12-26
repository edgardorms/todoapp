import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarea } from '../../models/tareas.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tareas = signal<Tarea[]>([
    { id: 1, name: 'Comprar pan', done: true },
    { id: 2, name: 'Llamar al médico', done: false },
    { id: 3, name: 'Hacer ejercicio', done: false },
    { id: 4, name: 'Leer un libro', done: true },
    { id: 5, name: 'Escribir un informe', done: false },
  ]);

  filter = signal<'all' | 'pending' | 'completed'>('all');

  tareasFiltered = computed(() => {
    const filter = this.filter();
    const tareas = this.tareas();
    if (filter === 'pending') {
      return tareas.filter((tarea) => !tarea.done);
    }
    if (filter === 'completed') {
      return tareas.filter((tarea) => tarea.done);
    }
    return tareas;
  });

  tareaPendingCount = computed(() => {
    return this.tareas().filter((tarea) => !tarea.done).length;
  });

  addTarea(name: string) {
    const newTarea: Tarea = {
      id: Date.now(),
      name: name,
      done: false,
    };
    this.tareas.update((tareas) => [...tareas, newTarea]);
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.trim() === '') return;
    this.addTarea(input.value);
    input.value = ''; // Limpiar el input después de añadir
  }

  deleteTarea(id: number) {
    this.tareas.update((tareas) => tareas.filter((tarea) => tarea.id !== id));
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }

  clearCompleted() {
    this.tareas.update((tareas) => tareas.filter((tarea) => !tarea.done));
  }
}
