"use strict";

//IIFE - Immediately Invoked Functional Expression
(function ()
{
    /**
     * Binds click, mouseover, and mouseout events to anchor tags with the class "link" and a matching data attribute.
     * Applies CSS changes for visual feedback and handles link activation onclick.
     * @param link
     * @constructor
     */
    function AddLinkEvents(link:string)
    {
        // Find all anchor tags with the class link that also has a data attribute equal to our link argument.
        let linkQuery = $(`a.link[data=${link}]`);

        // remove all link events from link queue.
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");
        linkQuery.on("click", function (){LoadLink(`${link}`);})
        linkQuery.on("mouseover", function ()
        {
            $(this).css("font-weight", "bold");
            $(this).css("cursor", "pointer");
        });
        linkQuery.on("mouseout", function (){ $(this).css("font-weight", "normal");})
    }
    function AddNavigationEvents()
    {
        let NavLink = $("ul>il>a") // find all navigation links
        NavLink.off("click");
        NavLink.off("mouseover");

        NavLink.on("click", function ():void {LoadLink($(this).attr("data") as string)});
        NavLink.on("mouseover", function ():void {$(this).css("cursor", "pointer");})
    }
    /**
     * Updates the app current active link, manages authentication and updates the browser history. It also updates
     * the navigation UI to reflect the current active link and load the corresponding content.
     * @param link
     * @param data
     */
    function LoadLink(link:string, data:string = "")
    {
        router.ActiveLink = link;
        AuthGuard();
        router.LinkData = data;
        history.pushState({}, "", router.ActiveLink);
        document.title = CapitalizeFirstLetter(router.ActiveLink)
        $("iul>il>a").each(function (){$(this).removeClass("active")});
        $(`il>a>:contains(${document.title})`).addClass("active");
        LoadContent();
    }


    function AuthGuard()
    {
        let protected_routes:string[] = ["contact-list"];
        if(protected_routes.indexOf(router.ActiveLink) > -1)
        {
            if(!sessionStorage.getItem("user"))
            {
                LoadLink("login");
            }
        }
    }

    /**
     *
     * @constructor
     */
    function CheckLogin() {

        if (sessionStorage.getItem("user"))
        {
            $("#login").html(`<a class="nav-link" href="#">
                                    <i class="fa fa-sign-out-alt"></i>Logout</a>`);
        }

        $("#logout").on("click", function () {

            sessionStorage.clear();

        });
        AddNavigationEvents();
        LoadLink("login");
    }

    /**
     *
     * @param method
     * @param url
     * @param callback
     * @constructor
     */
    function AjaxRequest(method: string, url: string, callback: Function) {
        // Step1: instantiate new xhr object
        let xhr = new XMLHttpRequest();

        // Step 2: Open XHR request
        xhr.open(method, url);

        // Step 4: Add event listener for the readystatechange event
        // The readystatechange event is triggered when the state of a document being fetched changes
        xhr.addEventListener("readystatechange", () => {

            if (xhr.readyState === 4 && xhr.status === 200) {

                if (typeof callback == "function") {
                    callback(xhr.responseText);
                }
                else {
                    console.error("ERROR: callback not a function");
                }
            }

        });

        // Step 3: send xhr request
        xhr.send();
    }

    /**
     *
     * @constructor
     */
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
            LoadLink("about");
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is the first Paragraph</p>`);

        $("main").append(`<article class="container"><p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`);
    }

    function DisplayProductsPage():void {
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

        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function (){LoadLink("contact-list");})

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

        $("#addButton").on("click", () => {LoadLink("edit", "add");});

        $("button.delete").on("click", function ()
        {
            if (confirm("Please confirm contact deletion")) {localStorage.removeItem($(this).val() as string);}
            LoadLink("contact-list");
        });
        $("button.edit").on("click", function () {LoadLink("edit", $(this).val() as string)});
    }

    function Display404Page() {
        console.log("called display display404page");
    }

    function ActiveLinkCallback() {
        if (router.ActiveLink) {
            switch (router.ActiveLink) {
                case "home": return DisplayHomePage;
                case "about": return DisplayAboutUsPage;
                case "services": return DisplayServicesPage;
                case "login": return DisplayLoginPage;
                case "contact": return DisplayContactUsPage;
                case "contact-list": return DisplayContactListPage;
                case "register": return DisplayRegisterPage; // Possibly meant to be DisplayRegisterPage?
                case "edit": return DisplayEditPage;
                case "404": return Display404Page;
                default:
                    console.error("Error: callback does not exist for link: " + router.ActiveLink);
                    return Display404Page; // Default to 404 page
            }
        } else {
            console.error("Error: router.ActiveLink is undefined");
            throw new Error("router.ActiveLink is undefined");
        }
    }

    function LoadHeader() {
        $.get("/views/component/header.html", function (html_data) {

            $("header").html(html_data);
            document.title = CapitalizeFirstLetter(router.ActiveLink);

            $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
            AddNavigationEvents();
            CheckLogin();
        });
    }

    function CapitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function LoadContent() {
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallback();
        $.get(`/views/content/${page_name}.html`, function (html_data) {
            $("main").html(html_data);
            CheckLogin();
            callback();
        });
    }

    function LoadFooter() {
        $.get("/views/components/footer.html", function (html_data) {

            $("footer").html(html_data);
        });
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
                    location.href = "/contact-list";
                });

                $("#ResetButton").on("click", () => {
                    LoadLink("contact-list");
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
                    LoadLink("contact-list");
                });

                $("#ResetButton").on("click", () => {
                    LoadLink("contact-list");
                });
                break;
        }
    }

    function DisplayLoginPage() {
        console.log("Called DisplayLoginPage");

        let messageArea = $("#messageArea");
        messageArea.hide();

        AddLinkEvents("register");

        // Remove any existing click handlers to prevent duplication
        $("#loginButton").off("click").on("click", function() {

            let success = false;
            let newUser = new core.User();

            $.get("./data/users.json", function(data) {

                for (const user of data.user) {
                    let username: string | number | string[] | undefined = $("#username").val();
                    let password: string | number | string[] | undefined = $("#password").val();
                    if (username === user.Username && password === user.password) {

                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                if (success) {
                    sessionStorage.setItem("user", <string>newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    LoadLink("contact-list");
                } else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea
                        .addClass("alert alert-danger") // Corrected class
                        .text("Error: Invalid Credentials")
                        .show();
                }
            });
        });

        // Assuming cancelButton needs similar logic to prevent handler duplication
        $("#cancelButton").off("click").on("click", function() {
            document.forms[0].reset();
            LoadLink("home");
        });
    }

    function DisplayRegisterPage()
    {
        console.log("Called DisplayRegisterPage");
        AddLinkEvents("login");
    }

    function Start() {
        console.log("App Started");
        LoadHeader();
        LoadLink("home");
        LoadFooter();
    }

    window.addEventListener("load", Start);

})();