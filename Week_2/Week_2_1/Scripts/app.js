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
            AboutUsBTN.addEventListener("click", function()
            {
                location.href = "about.ejs"
            })
            let MainContent = document.getElementsByTagName("main")[0];
            let MainParagraph = document.createElement("p");
            MainParagraph.setAttribute("id", "MainParagraph");
            MainParagraph.setAttribute("class", "mt-3");
            MainParagraph.textContent = "This is my first paragraph";
            MainContent.appendChild(MainParagraph);
            let FirstString = "This is";

            let SecondString = `${FirstString} the main Paragraph.`; // `` is a string literal to concatenate strings.
            MainParagraph.textContent = SecondString;
            MainContent.appendChild(MainParagraph);

            let DocumentBody = document.body;
            let Article = document.createElement("article");
            let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph.</p>`;
            Article.setAttribute("class", "container");
            Article.innerHTML = ArticleParagraph;
            DocumentBody.appendChild(Article);
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