declare namespace API {

  export interface Response<T = {}> {
    success: boolean; // if request is success
    data: T; // response data
    code?: number; // code for errorType
    message?: string; // message display to user
    showType?: number; // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
    traceId?: string; // Convenient for back-end Troubleshooting: unique request ID
    host?: string; // onvenient for backend Troubleshooting: host of current access server
  }

  export interface PagingData<T = {}> {
    current: number;
    pageSize: number;
    total: number;
    list: T[];
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }

  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    code: number;
    message: string;
    success?: boolean;
    data: any;
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    code: string;
    /** 业务上的错误信息 */
    message?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type Category = {
    id?: number;
    name?: string;
  };

  type deleteOrderParams = {
    /** ID of the order that needs to be deleted */
    orderId: number;
  };

  type deletePetParams = {
    api_key?: string;
    /** Pet id to delete */
    petId: number;
  };

  type deleteUserParams = {
    /** The name that needs to be deleted */
    username: string;
  };

  type findPetsByStatusParams = {
    /** Status values that need to be considered for filter */
    status: ('available' | 'pending' | 'sold')[];
  };

  type findPetsByTagsParams = {
    /** Tags to filter by */
    tags: string[];
  };

  type getOrderByIdParams = {
    /** ID of pet that needs to be fetched */
    orderId: number;
  };

  type getPetByIdParams = {
    /** ID of pet to return */
    petId: number;
  };

  type getUserByNameParams = {
    /** The name that needs to be fetched. Use user1 for testing.  */
    username: string;
  };

  type Order = {
    id?: number;
    petId?: number;
    quantity?: number;
    shipDate?: string;
    /** Order Status */
    status?: 'placed' | 'approved' | 'delivered';
    complete?: boolean;
  };

  type Pet = {
    id?: number;
    category?: Category;
    name: string;
    photoUrls: string[];
    tags?: Tag[];
    /** pet status in the store */
    status?: 'available' | 'pending' | 'sold';
  };

  type Tag = {
    id?: number;
    name?: string;
  };

  type updatePetWithFormParams = {
    /** ID of pet that needs to be updated */
    petId: number;
  };

  type updateUserParams = {
    /** name that need to be updated */
    username: string;
  };

  type uploadFileParams = {
    /** ID of pet to update */
    petId: number;
  };

  type User = {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    /** User Status */
    userStatus?: number;
  };
}
