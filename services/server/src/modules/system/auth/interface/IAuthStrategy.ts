import { UserInfo } from "../interface/UserInfo";

export interface IAuthStrategy {
    validate: (...any: any) => Promise<UserInfo>;
}
