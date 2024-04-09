"use strict";
var core;
(function (core) {
    class Router {
        _activeLink;
        _routingTable;
        _LinkData;
        constructor() {
            this._activeLink = "";
            this._routingTable = [];
            this._LinkData = "";
        }
        get LinkData() {
            return this._LinkData;
        }
        set LinkData(link) {
            this._LinkData = link;
        }
        get ActiveLink() {
            return this._activeLink;
        }
        set ActiveLink(link) {
            this._activeLink = link;
        }
        Add(route) {
            this._routingTable.push(route);
        }
        AddTable(routingTable) {
            this._routingTable = routingTable;
        }
        Find(route) {
            return this._routingTable.indexOf(route);
        }
        Remove(route) {
            let index = this.Find(route);
            if (index > -1) {
                this._routingTable.splice(index, 1);
                return true;
            }
            return false;
        }
        toString() {
            return this._routingTable.toString();
        }
    }
    core.Router = Router;
})(core || (core = {}));
let router = new core.Router();
router.AddTable([
    "/",
    "/home",
    "/about",
    "/services",
    "/contact",
    "/contact-list",
    "/products",
    "/register",
    "/login",
    "/edit"
]);
let route = location.pathname;
router.ActiveLink = (router.Find(route) > -1)
    ? ((route === "/") ? " home" : route.substring(1))
    : ("404");
//# sourceMappingURL=router.js.map