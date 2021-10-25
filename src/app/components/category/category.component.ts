import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent implements OnInit {

  @Input() category!: Category;
  @Output() selectCategory = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    
  }

}
