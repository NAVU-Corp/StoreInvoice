type TypePreload = {
  notificationApi: any;
  usersApi: any;
  sendMessages: (event: string, messages?: any) => void;
  on: (event: string, callback: (event: any, messages: any) => void) => void;
};

declare var apiElectron: TypePreload;
