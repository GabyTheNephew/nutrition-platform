import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DayCard {
  date: string;
  dayName: string;
  displayDate: string;
}

@Component({
  selector: 'app-week-day-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './week-day-picker.component.html',
  styleUrl: './week-day-picker.component.scss'
})
export class WeekDayPickerComponent {
  @Input() selectedDates: string[] = [];

  @Output() datesChange = new EventEmitter<string[]>();

  readonly todayIso = new Date().toISOString().split('T')[0];
  readonly currentWeekMonday = this.getMondayOfCurrentWeek();

  weekStartMonday = signal<Date>(this.getMondayOfCurrentWeek());

  canNavigateToPreviousWeek = computed<boolean>(() => {
    return this.weekStartMonday().getTime() > this.currentWeekMonday.getTime();
  });

  currentWeekDays = computed<DayCard[]>(() => {
    const monday = this.weekStartMonday();
    const days: DayCard[] = [];
    const dayNames = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];

    for (let i = 0; i < 7; i++) {
      const current = new Date(monday);
      current.setDate(monday.getDate() + i);

      const isoDate = current.toISOString().split('T')[0];
      const dayName = dayNames[current.getDay()];
      const displayDate = `${current.getDate()} ${current.toLocaleString('ro-RO', { month: 'short' })}`;

      days.push({ date: isoDate, dayName, displayDate });
    }
    return days;
  });

  private getMondayOfCurrentWeek(): Date {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  }

  isPastDate(date: string): boolean {
    return date < this.todayIso;
  }

  isDateSelected(date: string): boolean {
    return this.selectedDates.includes(date);
  }

  previousWeek(): void {
    if (!this.canNavigateToPreviousWeek()) {
      return;
    }
    const current = new Date(this.weekStartMonday());
    current.setDate(current.getDate() - 7);
    this.weekStartMonday.set(current);
  }

  nextWeek(): void {
    const current = new Date(this.weekStartMonday());
    current.setDate(current.getDate() + 7);
    this.weekStartMonday.set(current);
  }

  toggleDate(date: string): void {
    if (this.isPastDate(date)) {
      return;
    }

    const updated = this.selectedDates.includes(date)
      ? this.selectedDates.filter(d => d !== date)
      : [...this.selectedDates, date];

    this.datesChange.emit(updated);
  }

  selectWorkdays(): void {
    const validWorkdays = this.currentWeekDays()
      .slice(0, 5)
      .map(d => d.date)
      .filter(date => !this.isPastDate(date));

    this.datesChange.emit(validWorkdays);
  }

  selectAllWeek(): void {
    const validDays = this.currentWeekDays()
      .map(d => d.date)
      .filter(date => !this.isPastDate(date));

    this.datesChange.emit(validDays);
  }

  clearDates(): void {
    this.datesChange.emit([]);
  }
}