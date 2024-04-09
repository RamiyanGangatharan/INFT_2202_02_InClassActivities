"use strict";

//IIFE - Immediately Invoked Functional Expression
(function () {

    /**
     *
     * @param link
     * @constructor
     */

    function AuthGuard()
    {
        let protected_routes:string[] = ["contact-list", "/edit"];
        if(protected_routes.indexOf(location.pathname) > -1)
        {
            if(!sessionStorage.getItem("user"))
            {
                window.location.href = '/login';
            }
        }
    }
    function CheckLogin() {

        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a class="nav-link" href="#">
                                    <i class="fa fa-sign-out-alt"></i>Logout</a>`);
        }

        $("#logout").on("click", function () {

            sessionStorage.clear();
            window.location.href = '/login';
        });
    }



    function ContactFormValidation() {

        //fullName

        ValidateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid full name");

        //contactNumber
        ValidateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid contact number");

        //emailAddress
        ValidateField("#emailAddress",
            /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address");
    }

    /**
     * Validate form fields provided by users
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */
    function ValidateField(input_field_id: string, regular_expression: RegExp, error_message: string) {

        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur", function () {

            let inputFieldText = $(this).val();

            if (!regular_expression.test(<string>inputFieldText)) {
                //full name does not success Pattern Matching
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();

            } else {
                //fullName is successful
                messageArea.removeAttr("class").hide();

            }


        });
    }

    /**
     * Add contact to localStorage
     * @param fullName
     * @param contactNumber
     * @param emailAddress
     */
    function AddContact(fullName: string, contactNumber: string, emailAddress: string) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.fullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize() as string);
        }
    }

    function DisplayHomePage() {
        console.log("Called DisplayHomePage()");

        $("#AboutUsBtn").on("click", () => {
            window.location.href = '/about';
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is the first Paragraph</p>`);

        $("body").append(`<article class="container"><p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`);
    }

    function DisplayProductsPage() {
        console.log("Called DisplayProductsPage");
    }

    function DisplayServicesPage() {
        console.log("Called DisplayServicesPage");
    }

    function DisplayAboutUsPage() {
        console.log("Called DisplayAboutUsPage");
    }

    function DisplayContactUsPage() {
        console.log("Called DisplayContactUsPage");

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton") as HTMLButtonElement;
        let subscribeButton = document.getElementById("subscribeCheckbox") as HTMLInputElement;

        sendButton.addEventListener("click", function () {
            if (subscribeButton.checked) {
                let fullName: string = document.forms[0].fullname.value;
                let contactNumber: string = document.forms[0].contactNumber.value;
                let emailAddress: string = document.forms[0].emailAddress.value;
                let contact = new core.Contact(fullName, contactNumber, emailAddress);
                if (contact.serialize()) {
                    let key = contact.fullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize() as string);
                }
            }
        });
    }

    function DisplayContactListPage() {
        console.log("Called DisplayContactListPage()");

        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList") as HTMLElement;
            let data = "";

            let keys = Object.keys(localStorage);

            let index = 1;
            for (const key of keys) {
                let contact = new core.Contact();
                let contactData = localStorage.getItem(key) as string;
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

        $("#addButton").on("click", () => {
            window.location.href = '/edit#add';
        });

        $("button.delete").on("click", function () {
            if (confirm("Please confirm contact deletion")) {
                localStorage.removeItem($(this).val() as string);
            }
            window.location.href = '/contact-list';
        });

        $("button.edit").on("click", function () {
            window.location.href = '/edit#' + $(this).val();
        });
    }

    function Display404Page() {
        console.log("called display display404page");
    }
    function DisplayEditPage() {
        console.log("Called DisplayEditPage()");

        let page = location.hash.substring(1);

        switch (page) {
            case "add":

                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plu-circle fa-sm"/> Add`);

                $("#editButton").on("click", (event) => {

                    event.preventDefault();
                    let fullName: string = document.forms[0].fullname.value;
                    let contactNumber: string = document.forms[0].contactNumber.value;
                    let emailAddress: string = document.forms[0].emailAddress.value;
                    AddContact(fullName, contactNumber, emailAddress);
                    window.location.href = '/contact-list';
                });

                $("#ResetButton").on("click", () => {
                    window.location.href = '/contact-list';
                });
                break;
            default:

                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page) as string);

                $("#fullName").val(contact.fullName);
                $("#contactNumber").val(contact.contactNumber);
                $("#emailAddress").val(contact.emailAddress);

                $("#editButton").on("click", (event) => {
                    event.preventDefault();

                    contact.fullName = $("#fullName").val() as string;
                    contact.contactNumber = $("#contactNumber").val() as string;
                    contact.emailAddress = $("#emailAddress").val() as string;

                    //replace the contact in localStorage
                    localStorage.setItem(page, contact.serialize() as string);
                    window.location.href = '/contact-list';
                });

                $("#ResetButton").on("click", () => {
                    window.location.href = '/contact-list';
                });
                break;
        }
    }

    function DisplayLoginPage() {
        console.log("Called DisplayLoginPage");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function () {

            let success = false;
            let newUser = new core.User();

            $.get("./data/users.json", function (data) {

                for (const user of data.user) {
                    console.log(data.user);
                    let username: string = document.forms[0].username.value;
                    let password: string = document.forms[0].password.value;
                    if (username === user.Username && password === user.password) {

                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                if (success) {
                    sessionStorage.setItem("user", newUser.serialize() as string);
                    messageArea.removeAttr("class").hide();
                    window.location.href = '/contact-list';
                }
                else {
                    $("#user").trigger("focus").trigger("select");
                    messageArea
                        .addClass("alert alert danger")
                        .text("Error: Invalid Credentials")
                        .show();
                }

                $("#cancelButton").on("click", function () {


                    document.forms[0].reset();
                    window.location.href = '/contact-list';
                });
            });
        });
    }

    function DisplayRegisterPage() {
        console.log("Called DisplayRegisterPage");
    }

    function Start() {
        console.log("App Started");

    }

    window.addEventListener("load", Start);

})();