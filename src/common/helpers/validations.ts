import { validate as isValidUUID } from 'uuid';
import { httpBadRequest } from './http-response';
import { notFoundIdMessage } from './messages';

export const validateUUID = (entityName: string, id: string) => {
  if (!isValidUUID(id)) {
    throw httpBadRequest(notFoundIdMessage(entityName, id));
  }
};
