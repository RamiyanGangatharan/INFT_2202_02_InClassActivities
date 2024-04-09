"use strict";

namespace core {

    export class Router {

        private _activeLink: string;
        private _routingTable: string[];
        private _LinkData:string;

        constructor() {
            this._activeLink = "";
            this._routingTable = [];
            this._LinkData = "";
        }

        public get LinkData(): string {
            return this._LinkData;
        }

        public set LinkData(link: string) {
            this._LinkData = link;
        }

        public get ActiveLink(): string {
            return this._activeLink;
        }

        public set ActiveLink(link: string) {
            this._activeLink = link;
        }

        /** this method replaces the reference for the routing table with a new one
         *
         * @constructor
         * @returns {void}
         *
         * */
        public Add(route: string):void {
            this._routingTable.push(route);
        }

        public AddTable(routingTable: string[]):void {
            this._routingTable = routingTable;
        }

        public Find(route: string): number {
            return this._routingTable.indexOf(route);
        }

        /** this method remove a route from the routing table. It returns true if the route was successfully removed
         *@param route
         * @constructor
         * @returns {boolean}
         *
         * */
        public Remove(route: string):boolean
        {
            let index:number = this.Find(route);
            if (index > -1) {
                this._routingTable.splice(index, 1);
                return true;
            }
            return false;
        }

        /** This method return the routing table contents in a comma separate string (array to string default)
         * @returns {string}
         *
         * */
        public toString(): string {
            return this._routingTable.toString();
        }
    }
}

//instantiate router
let router:core.Router = new core.Router();
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

router.ActiveLink = (router.Find(route)> -1)
    ? ((route === "/")? " home" : route.substring(1))
    : ("404");