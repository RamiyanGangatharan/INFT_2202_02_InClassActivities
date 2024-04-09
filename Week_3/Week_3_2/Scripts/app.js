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
            AboutUsBTN.addEventListener("click", function() { location.href = "about.ejs" })
        }

        function displayProductsPage()
        {
            console.log("Called Displayed Products Page.");
        }

        function displayContactUsPage()
        {
            console.log("Called Displayed Contact Us Page.");

            let sendButton = document.getElementById("sendButton");
            let subscribeButton = document.getElementById("subscribeButton");

            sendButton.addEventListener("click", function()
            {
                if(subscribeButton.checked)
                {
                    let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
                    if(contact.serialize())
                    {
                        let key = contact.fullName.substring(0, 1) + Date.now();
                        localStorage.setItem(key, contact.serialize())
                    }
                }
            })
        }

        function displayContactListPage()
        {
            console.log("Called Displayed Contact List Page.");

            if(localStorage.length > 0)
            {
                let contactList = document.getElementById("contactList")
                let data = "";
                let keys = Object.keys(localStorage);
                let index = 1;

                for(const key of keys)
                {
                    let contact = new Contact();
                    let contactData = localStorage.getItem(key);
                    contact.deserialize(contactData);

                    data +=
                        `
                             <tr>
                                <td>
                                    ${contact.fullName}
                                </td>
                                <td>
                                    ${contact.contactNumber}
                                </td>
                                <td>
                                    ${contact.emailAddress}
                                </td>
                                <td>
                                
                                </td>
                                <td>
                                
                                </td>
                            </tr>
                        `
                    index++;
                }
                contactList.innerHTML = data;
            }
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

                case "Contact List":
                    displayContactListPage();
                    break;
            }
        }
        window.addEventListener("load", Start);
    }
    ()
)