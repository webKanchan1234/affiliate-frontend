

export const validators = {
  required: (value) =>
    value?.trim() ? "" : "This field is required",

  minLength: (length) => (value) =>
    value?.length >= length
      ? ""
      : `Minimum ${length} characters required`,

  maxLength: (length) => (value) =>
    value?.length <= length
      ? ""
      : `Maximum ${length} characters allowed`,

  urlSlug: (value) =>
    /^[a-z0-9-]+$/.test(value)
      ? ""
      : "Only lowercase letters, numbers & hyphens allowed",

  noSpecialChars: (value) =>
    /^[a-zA-Z0-9\s]+$/.test(value)
      ? ""
      : "Special characters not allowed",

  imageRequired: (file) =>
    file instanceof File ? "" : "Image is required",

  imageType: (file) =>
    file && ["image/jpeg", "image/png", "image/webp"].includes(file.type)
      ? ""
      : "Only JPG, PNG, WEBP allowed",
};
