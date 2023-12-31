import { Prisma } from '@prisma/client';

export class Categories implements Prisma.CategoryUncheckedCreateInput {
  id_category: string;
  name_category: string;
  banner_category: string;
  picture_category: string;
  icon_category?: string;
  date_created?: string | Date;
  date_updated?: string | Date;
  status_category: string;
  counter_views_category?: number;
  description?: string;
  products?: any;
  subcategories?: any;
  slug: string;
}

