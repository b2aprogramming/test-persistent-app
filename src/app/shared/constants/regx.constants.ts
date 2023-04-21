export const RegExData = {
  Alphabetical: /^[a-zA-Z]+$/g,
  AlphabeticalWithSpace: /^[a-zA-Z\s]+$/g,
  NumbersOnly: /[0-9]+$/g,
  NotNumbersOnly: /[^0-9]+$/g,
  NumbersWithDecimalOnly: /[0-9.]+$/g,
  NotNumberWithDecimalsOnly: /[^0-9.]+$/g,
  Password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/g,
  PhoneNumber: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im,
  Email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PhoneFormat: /[0-9)(\s-]+$/,
  NoPhoneFormat: /[^0-9)(\s-]+$/,
  Approximate: /^[0-9$,]+$/g,
  NumberOneToNine: /^(0*[1-9][0-9]*([0-9]+)?|0+[0-9]*[1-9][0-9]*)$/g,
  PhoneNumberReplacement: /[\s-.)(]/g,
  PhoneNumberTenDigit: /^\d{10}$/g
};
