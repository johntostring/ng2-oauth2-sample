import { Injectable } from '@angular/core';

/**
 * Created by John Zhang on 17/2/7.
 */
@Injectable()
export class SessionStorageService {

  private AUTH_KEY = 'OAUTH2_JWT';
  private ACTIVE_ORG_KEY = 'ACTIVE_ORG';
  private ACTIVE_PROJECT_KEY = 'ACTIVE_PROJECT_KEY';
  private ACTIVE_MENU_KEY = 'ACTIVE_MENU_KEY';
  private LAST_VISIT_URL_KEY = 'LAST_VISIT_URL';

  getAuth(field?): any {
    return this.getObject(this.AUTH_KEY, field);
  }

  setAuth(data: any) {
    const authJson = sessionStorage.getItem(this.AUTH_KEY) || '{}';
    const auth = JSON.parse(authJson);
    for (const field in data) {
      if (data.hasOwnProperty(field)) {
        auth[field] = data[field];
      }
    }
    sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(auth));
  }

  getActiveOrganization(field?) {
    return this.getObject(this.ACTIVE_ORG_KEY, field);
  }

  setActiveOrganization(org) {
    sessionStorage.setItem(this.ACTIVE_ORG_KEY, JSON.stringify(org));
  }

  getActiveProject(field?) {
    return this.getObject(this.ACTIVE_PROJECT_KEY, field);
  }

  setActiveProject(project) {
    sessionStorage.setItem(this.ACTIVE_PROJECT_KEY, JSON.stringify(project));
  }

  getActiveMenu() {
    return sessionStorage.getItem(this.ACTIVE_MENU_KEY);
  }

  setActiveMenu(menuId) {
    sessionStorage.setItem(this.ACTIVE_MENU_KEY, menuId);
  }

  getObject(key, field?) {
    const json = sessionStorage.getItem(key);
    if (json == null) {
      return null;
    }
    const obj = JSON.parse(json);
    if (field) {
      return obj[field];
    }
    return obj;
  }

  clearAuth() {
    sessionStorage.removeItem(this.AUTH_KEY);
  }

  clearAll() {
    sessionStorage.clear();
  }

  getLastVisitUrl() {
    return sessionStorage.getItem(this.LAST_VISIT_URL_KEY);
  }

  setLastVisitUrl(value: string) {
    sessionStorage.setItem(this.LAST_VISIT_URL_KEY, value);
  }

  removeLastVisitUrl() {
    sessionStorage.removeItem(this.LAST_VISIT_URL_KEY);
  }
}
