import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingListsComponent } from './booking-lists.component';

describe('BookingListsComponent', () => {
  let component: BookingListsComponent;
  let fixture: ComponentFixture<BookingListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
