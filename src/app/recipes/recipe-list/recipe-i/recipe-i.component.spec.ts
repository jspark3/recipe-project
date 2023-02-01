import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeIComponent } from './recipe-i.component';

describe('RecipeIComponent', () => {
  let component: RecipeIComponent;
  let fixture: ComponentFixture<RecipeIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
