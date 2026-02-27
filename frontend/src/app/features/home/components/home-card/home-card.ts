import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-card',
  imports: [NgStyle],
  templateUrl: './home-card.html',
  styleUrl: './home-card.css',
})
export class HomeCard {
  @Input() title: string = '';
  @Input() body: string|number = '';
  @Input() cardColor: string = '#7F00E0';
}
