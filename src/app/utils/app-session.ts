export class AppSession {
  static UserProfile = 'userProfile';
  static BusinessProfile = 'businessProfile';
  static LoginAuth = 'loginAuth';
  static Country = 'country';

  public static setValue(sessionKey: string, value: any) {
    if (value && sessionKey) {
      localStorage.setItem(sessionKey, JSON.stringify(value));
    }
  }

  public static getValue(sessionKey: string): any {
    if (sessionKey) {
      //@ts-ignore
      return JSON.parse(localStorage.getItem(sessionKey));
    }
  }

  public static checkSession(sessionKey: string): boolean {
    if (sessionKey) {
      return localStorage.getItem(sessionKey) ? true : false;
    }
    return false;
  }

  public static clear(sessionKey: string) {
    return localStorage.removeItem(sessionKey);
  }
}
