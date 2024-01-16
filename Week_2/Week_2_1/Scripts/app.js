"use strict";

// IIFE == immediately invoked functional expression
// AKA == Anonymous Self-Executing Function
(
    function()
    {
        function displayHomepage()
        {
            console.log("Called Displayed Homepage.");
            let AboutUsBTN = document.getElementById("AboutUsBTN");
            AboutUsBTN.addEventListener("click", function() { location.href = "about.html" })
        }

        function displayProductsPage()
        {
            console.log("Called Displayed Products Page.");
        }

        function displayContactUsPage()
        {
            console.log("Called Displayed Contact Us Page.");
        }

        function displayServicesPage()
        {
            console.log("Called Displayed Our Services Page.");
        }

        function Start()
        {
            console.log("App Started.");
            switch (document.title)
            {
                case "Home":
                    displayHomepage();
                    break;
                case "Our Products":
                    displayProductsPage();
                    break;
                case "Our Services":
                    displayServicesPage();
                    break;
                case "Contact Us":
                    displayContactUsPage();
                    break;
            }
        }
        window.addEventListener("load", Start);
    }
    ()
)