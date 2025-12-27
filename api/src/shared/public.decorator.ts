import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const PUBLIC_ENDPOINT_METADATA_KEY = 'isPublic';

export const Public = (): CustomDecorator<string> => {
  return SetMetadata(PUBLIC_ENDPOINT_METADATA_KEY, true);
};
