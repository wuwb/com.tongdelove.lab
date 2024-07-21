import { IBaseService } from '@/shared/interfaces/IBaseService'

export interface IUserService extends IBaseService {
  all?()
  list?()
  get?()
  count?()
  exist?()
  create?()
  update?()
  delete?()
}
