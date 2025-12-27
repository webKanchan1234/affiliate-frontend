import { validators } from "./validators";



export const categorySchema = {
  title: [
    validators.required,
    validators.minLength(3),
    validators.maxLength(50),
    validators.noSpecialChars,
  ],
  urlName: [
    validators.required,
    validators.urlSlug,
    validators.minLength(3),
  ],
  description: [
    validators.required,
    validators.minLength(10),
  ],
  image: [
    validators.imageRequired,
    validators.imageType,
  ],
};



export const brandSchema = {
  title: [
    validators.required,
    validators.minLength(2),
  ],
  urlName: [
    validators.required,
    validators.urlSlug,
  ],
  description: [
    validators.required,
    validators.minLength(10),
  ],
  image: [
    validators.imageRequired,
  ],
  category: [
    validators.required,
  ],
};
