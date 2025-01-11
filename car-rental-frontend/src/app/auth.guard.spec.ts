import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard';  // Corrected import
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create a spy for the Router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy }  // Provide Router as a mocked dependency
      ]
    });
  });

  const executeGuard: CanActivateFn = () => TestBed.runInInjectionContext(() => new AuthGuard(routerSpy).canActivate());

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
