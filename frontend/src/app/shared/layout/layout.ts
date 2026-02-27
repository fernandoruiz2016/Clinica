import { Component } from '@angular/core';
import { NavBar } from '../components/nav-bar/nav-bar';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';

@Component({
  selector: 'app-layout',
  imports: [NavBar, RouterOutlet, Footer, Header],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
