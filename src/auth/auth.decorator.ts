import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const IS_ADMIN_KEY = 'iSAdmin';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const AdminAcess = () => SetMetadata(IS_ADMIN_KEY, true);
