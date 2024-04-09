"use strict";

// IIFE == immediately invoked functional expression
// AKA == Anonymous Self-Executing Function
(
    function ()
    {
     function Start()
     {
         console.log("App Started.");
     }
     window.addEventListener("load", Start);
    }
    ()
)