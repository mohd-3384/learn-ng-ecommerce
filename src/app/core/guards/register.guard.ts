import { CanDeactivateFn } from '@angular/router';
import { RegisterComponent } from '../../pages/register/register.component';

export const registerGuard: CanDeactivateFn<RegisterComponent> = (component, currentRoute, currentState, nextState) => {
  if (component.registerationForm.valid) {
    const alert = window.confirm('Are you sure you want to leave this page?');
    return alert;
  };
  return true;
};
