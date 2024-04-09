"use strict";

//IIFE - Immediately Invoked Functional Expression
(function (){

    function ContactFormValidation()
    {
        ValidateFields
        (
            "#fullName",
            /^([A-Z][a-z]{1,3}\\.?\\s)?([A-Z][a-z]+)+([\\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid full name."
        );
        ValidateFields
        (
            "#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid phone number."
        );
        ValidateFields
        (
            "#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address."
        );
    }
    /**
     * Validate form fields.
     * @param input_id
     * @param regex
     * @param err_message
     */
    function ValidateFields(input_id, regex, err_message)
    {
        let messageArea = $("#messageArea").hide();

        $("input_id").on("blur", function ()
        {
            let inputText = $(this).val();
            if(!regex.test(inputText))
            {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(err_message).show();
            }
            else {messageArea.removeAttr("class").hide();}
        });
    }

    /**
     * Add contact to localStorage
     * @param fullName
     * @param contactNumber
     * @param emailAddress
     * @constructor
     */
    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new core.Contact(fullName, contactNumber, emailAddress)
        if(contact.serialize()){
            let key = contact.fullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function DisplayHomePage(){
        console.log("Called DisplayHomePage()");

        $("#AboutUsBtn").on("click", () => {
            location.href = "about.ejs";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is the first Paragraph</p>`);

        $("body").append(`<article class="container"><p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`);


    }
    function DisplayProductsPage(){
        console.log("Called DisplayProductsPage");
    }
    function DisplayServicesPage(){
        console.log("Called DisplayServicesPage");
    }
    function DisplayAboutUsPage(){
        console.log("Called DisplayAboutUsPage");
    }
    function DisplayContactUsPage()
    {

        console.log("Called DisplayContactUsPage");
        //TestFullName();

        let sendButton = document.getElementById("sendButton");
        let subscribeButton = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(){
            if(subscribeButton.checked){
                let contact = new core.Contact(contact.fullName.value, contact.contactNumber.value, contact.emailAddress.value);
                if(contact.serialize()){
                    let key = contact.fullName.substring(0,1) + Date.now();
                    localStorage.setItem(key, contact.serialize())
                }
            }
        });
    }
    function DisplayEditPage()
    {
        console.log("Display Edit Page");
        ContactFormValidation();
    }
    function DisplayContactListPage(){
        console.log("Called DisplayContactListPage()");

        ContactFormValidation();

        if(localStorage.length > 0)
        {
            let contactList = document.getElementById("contactList");
            let data = "";

            let keys = Object.keys(localStorage);

            let index = 1;
            for(const key of keys){
                let contact = new core.Contact();
                let contactData = localStorage.getItem(key);
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                            <td>${contact.fullName}</td>
                            <td>${contact.emailAddress}</td>
                            <td>${contact.contactNumber}</td>
                            <td class="text-center">
                                <button value="${key}" class="btn btn-primary btn-sm edit">
                                    <i class="fas fa-edit fa-sm">&nbsp;Edit</i>
                                </button>
                            </td>
                            <td>
                                <button value="${key}" class="btn btn-danger btn-sm delete">
                                    <i class="fas fa-trash-alt fa-sm">&nbsp;Delete</i>
                                </button>
                            </td>
                        </tr>`;
                index++;
            }
            contactList.innerHTML = data;
        }

        function DisplayEditPage(){
            console.log("Called DisplayEditPage()");

            let page = location.hash.substring(1);

            switch (page){
                case "add":

                    $("main>h1").text("Add Contact");
                    $("#editButton").html(`<i class="fas fa-plu-circle fa-sm"/> Add`)

                    $("#editButton").on("click", (event) => {

                        event.preventDefault();
                        AddContact(contact.fullName.value, contact.contactNumber.value, contact.emailAddress.value);
                        location.href = "contact-list.ejs";
                    });

                    $("#ResetButton").on("click", () => {
                        location.href = "contact-list.ejs";
                    });
                    break;
                default:

                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page))

                    $("#fullName").val(contact.fullName);
                    $("#contactNumber").val(contact.contactNumber);
                    $("#emailAddress").val(contact.emailAddress);

                    $("#editButton").on("click", (event) => {
                        event.preventDefault();

                        contact.fullName = $("#fullName").val();
                        contact.contactNumber = $("#contactNumber").val();
                        contact.emailAddress = $("#emailAddress").val();

                        //replace the contact in localStorage
                        localStorage.setItem(page, contact.serialize());
                        location.href = "contact-list.ejs"
                    });

                    $("#ResetButton").on("click", () => {
                        location.href = "contact-list.ejs";
                    });
                    break;
            }
        }

        $("#addButton").on("click", () => {
            location.href = "edit.ejs#add"
        });

        $("button.delete").on("click", function() {
            if(confirm("Please confirm contact deletion")){
                localStorage.removeItem($(this).val())
            }
            location.href = "contact-list.ejs";
        });

        $("button.edit").on("click", function() {
            location.href = "edit.ejs#" + $(this).val();
        });
    }

    function DisplayLoginPage()
    {

    }

    function DisplayRegistrationPage()
    {

    }

    function Start(){
        console.log("App Started");

        switch (document.title){
            case "Home":
                DisplayHomePage()
                break;
            case "Products":
                DisplayProductsPage();
                break;
            case "Services":
                DisplayServicesPage();
                break;
            case "About Us":
                DisplayAboutUsPage();
                break;
            case "Contact Us":
                DisplayContactUsPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegistrationPage();
                break;
        }
    }
    window.addEventListener("load", Start);
})();