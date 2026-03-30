import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password && confirmPassword && password !== confirmPassword) {
    // Set error on the confirmPassword control specifically
    control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true }; // Error for the form group
  } else {
    // Clear the error if they match (important for reactive updates)
    control.get('confirmPassword')?.setErrors(null);
    return null; // No error
  }
};