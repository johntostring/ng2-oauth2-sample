import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {

  private acceptedRoutes: string[] = ['project/:project/overview'];

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // check to see if the route's path is in our acceptedRoutes array
    if (this.acceptedRoutes.indexOf(route.routeConfig.path) > -1) {
      console.log('detaching', route);
      return true;
    } else {
      return false; // will be "project/:project" when user navigates to result
    }
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return undefined;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return undefined;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return undefined;
  }

}
