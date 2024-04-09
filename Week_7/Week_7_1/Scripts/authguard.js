"use strict";

(function ()
{
    if(!sessionStorage.getItem("user"))
    {
        location.href = "login.ejs";
    }
})();