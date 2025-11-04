import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rating',
  imports: [MatIconModule, NgClass],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent implements OnInit{
  ngOnInit(): void {
    this.prevRating = this.rating;
  }
  @Input({
    required: true,
    transform: (valor: number) => Array(valor).fill(0),
  })
  maximoRating!: number[];

  @Input()
  rating!: number;

  private prevRating: number = 0;

  @Output()
  votado = new EventEmitter<number>();

  public handleMouseEnter(index: number): void {
    this.rating = index + 1;
  }

  public handleMouseLeave(): void {
    if (this.prevRating !== 0) {
      this.rating = this.prevRating;
    } else {
      this.rating = 0;
    }
  }

  public handleClick(index: number): void {
    this.rating = index + 1;
    this.prevRating = index + 1;
    this.votado.emit(this.rating);
  }
}
