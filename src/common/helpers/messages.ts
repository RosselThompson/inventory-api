export const fieldMatchErrorMessage = (fieldName: string, format: string) =>
  `${fieldName} does not match with the format ${format}`;

export const existingFieldMessage = (fieldName: string, value: string) =>
  `The ${fieldName} ${value} already exists`;

export const removedRecordMessage = (entityName: string, id: string) =>
  `The ${entityName} id ${id} was removed successfully`;

export const notFoundIdMessage = (entityName: string, id: string) =>
  `The ${entityName} id ${id} does not exist`;

export const changedStatusMessage = (entityName: string, id: string) =>
  `${entityName} ${id} status was updated successfully`;

export const changedPropertyMessage = (
  entityName: string,
  id: string,
  propertyName: string,
) => `${entityName} ${id} ${propertyName} was updated successfully`;

export const existingIdsMessage = (entityName: string, ids: string[]) =>
  `${entityName} ids: ${ids} already exist and cannot be added as new`;
