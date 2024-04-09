"use strict";

(function (core)
{
    class Router
    {
        constructor()
        {
            this.activeLink = "";
        }

        get activeLink()
        {
            return this._activeLink();
        }

        set activeLink(link)
        {
            this._activeLink = link;
        }

        /**
         * This method adds a new route to the routing table.
         * @param route
         * @constructor
         * @returns {void}
         */
        Add(route)
        {
            this._routingTable.push(route);
        }

        /**
         * This method replaces the reference for the routing table with a new one.
         * @param routingTable
         * @constructor
         * @returns {void}
         */
        AddTable(routingTable)
        {
            this._routingTable = routingTable;
        }

        /**
         * This method finds and returns the index of the route in the routing table, otherwise it returns -1
         * @param route
         * @returns {*}
         * @constructor
         */
        Find(route)
        {
            return this._routingTable.indexOf(route);
        }

        /**
         * This method removes a route from the routing table. It returns true if the route was successfully removed.
         * @param route
         * @returns {boolean}
         * @constructor
         */
        Remove(route)
        {
            if(this.Find(route) > -1)
            {
                this._routingTable.splice(this.Find(route), 1);
                return true;
            }
            else
            {
                return false;
            }
        }

        /**
         * This method returns the routing table contents in a comma seperated string (array toString default)
         * @returns {string}
         */
        toString()
        {
            return this._routingTable.toString();
        }
    }
    core.Router = Router;
})(core || (core = {}))

// instantiate router
let router = new core.Router();

router.AddTable
(
 [
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
 ]
)

let route = location.pathname;

router.activeLink = (router.Find(route) > 1) ? ((route === "/") ? "home" : route.substring(1)) : ("404");