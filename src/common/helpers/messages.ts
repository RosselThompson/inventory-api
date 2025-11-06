export const fieldMatchErrorMessage = (fieldName: string, format: string) =>
  `${fieldName} does not match with the format ${format}`;

export const existingFieldMessage = (fieldName: string, value: string) =>
  `The ${fieldName} ${value} already exists`;

export const removedRecordMessage = (entityName: string) =>
  `${entityName} was removed successfully`;

export const notFoundIdMessage = (entityName: string, id: string) =>
  `The ${entityName} id ${id} does not exist`;

export const changeStatusMessage = (entityName: string, id: string) =>
  `${entityName} ${id} status was updated successfully`;
