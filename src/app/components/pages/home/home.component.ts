import { Component, OnInit } from '@angular/core';

import { Moment } from '../../../Moments';

import { environment } from '../../../../environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MomentService } from '../../../services/moment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = [];
  moments: Moment[] = [];

  faSearch = faSearch;

  searchTerm: string = '';

  baseApiUrl = environment.baseApiUrl;

  constructor(private momentService: MomentService) {}
  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-br'
        );
      });

      this.allMoments = data;
      this.moments = data;
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) =>
      moment.title.toLowerCase().includes(value)
    );
  }
}
