export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
//console.log(Object.values(Gender));
export function validateEmail(email: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return 'Email is required.';
  }
  if (!emailRegex.test(email)) {
    return 'Invalid email format.';
  }
  return '';
}

export function validatePassword(password: string): string {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!password) {
    return 'Password is required.';
  }
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }
  if (!hasUpperCase) {
    return 'Password must contain at least one uppercase letter.';
  }
  if (!hasLowerCase) {
    return 'Password must contain at least one lowercase letter.';
  }
  if (!hasNumber) {
    return 'Password must contain at least one number.';
  }
  if (!hasSpecialChar) {
    return 'Password must contain at least one special character.';
  }
  return '';
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
): string {
  if (!confirmPassword) {
    return 'Confirm password is required.';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return '';
}

export function validatePhoneNumber(phoneNumber: string): string {
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneNumber) {
    return 'Phone number is required.';
  }
  if (!phoneRegex.test(phoneNumber)) {
    return 'Invalid phone number format. Must be a 10-digit Indian phone number starting with 6-9.';
  }
  return '';
}

export function validateAge(age: any): string {
  const isNan = isNaN(age);
  if (isNan) {
    return 'Enter a valid age';
  }
  if (!age) {
    return 'Age is required.';
  }
  const minAge = 0;
  const maxAge = 120;
  if (age === undefined || age === null) {
    return 'Age is required.';
  }
  if (age < minAge || age > maxAge) {
    return `Age must be between ${minAge} and ${maxAge}.`;
  }
  return '';
}

export function validateGender(gender: Gender): string {
  if (!Object.values(Gender).includes(gender)) {
    return "Invalid gender. Must be one of 'male', 'female', or 'other'.";
  }
  return '';
}

export function validateName(name: string): string {
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!name) {
    return 'Name is required.';
  }
  if (!nameRegex.test(name)) {
    return 'Name must contain only alphabetical characters and spaces.';
  }
  return '';
}
export function validateHeight(height: number): string {
  const minHeight = 50; // Minimum height in centimeters
  const maxHeight = 250; // Maximum height in centimeters
  if (height === undefined || height === null) {
    return 'Height is required.';
  }
  if (isNaN(height)) {
    return 'Height must be a valid number.';
  }
  if (height < minHeight || height > maxHeight) {
    return `Height must be between ${minHeight} and ${maxHeight} cm.`;
  }
  return '';
}

export function validateWeight(weight: any): string {
  const minWeight = 2; // Minimum weight in kilograms
  const maxWeight = 500; // Maximum weight in kilograms
  if (weight === undefined || weight === null) {
    return 'Weight is required.';
  }
  if (isNaN(weight)) {
    return 'Weight must be a valid number.';
  }
  if (weight < minWeight || weight > maxWeight) {
    return `Weight must be between ${minWeight} and ${maxWeight} kg.`;
  }
  return '';
}

export function validateWaist(waist: number): string {
  const minWaist = 30; // Minimum waist in centimeters
  const maxWaist = 200; // Maximum waist in centimeters
  if (waist === undefined || waist === null) {
    return 'Waist measurement is required.';
  }
  if (isNaN(waist)) {
    return 'Waist measurement must be a valid number.';
  }
  if (waist < minWaist || waist > maxWaist) {
    return `Waist measurement must be between ${minWaist} and ${maxWaist} cm.`;
  }
  return '';
}

export function validateHip(hip: number): string {
  const minHip = 30; // Minimum hip in centimeters
  const maxHip = 200; // Maximum hip in centimeters
  if (hip === undefined || hip === null) {
    return 'Hip measurement is required.';
  }
  if (isNaN(hip)) {
    return 'Hip measurement must be a valid number.';
  }
  if (hip < minHip || hip > maxHip) {
    return `Hip measurement must be between ${minHip} and ${maxHip} cm.`;
  }
  return '';
}
