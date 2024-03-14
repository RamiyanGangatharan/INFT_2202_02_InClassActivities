"use strict";
(function () {
    function AddLinkEvents(link) {
        let linkQuery = $(`a.link[data=${link}]`);
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");
        linkQuery.on("click", function () {
            LoadLink(`${link}`);
        });
        linkQuery.on("mouseover", function () {
        });
    }
    function AddNavigationEvents() {
        let navlinks = $("ul>li>a");
        navlinks.off("click");
        navlinks.off("mouseover");
        navlinks.on("click", function () {
            LoadLink($(this).attr("data"));
        });
        navlinks.on("mouseover", function () {
            LoadLink($(this).css("cursor"));
        });
    }
    function LoadLink(link, data = "") {
        router.ActiveLink = link;
        AuthGuard();
        router.LinkData = data;
        history.pushState({}, "", router.ActiveLink);
        document.title = CapitalizeFirstLetter(router.ActiveLink);
        $("ul>li>a").each(function () { $(this).removeClass("active"); });
        $(`il>a>:contains(${document.title})`).addClass("active");
        LoadContent();
    }
    function AuthGuard() {
        let protected_routes = ["contact-list"];
        if (protected_routes.indexOf(router.ActiveLink) > -1) {
            if (!sessionStorage.getItem("user")) {
                LoadLink("login");
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
            LoadLink("login");
        });
    }
    function ContactFormValidation() {
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid full name");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid contact number");
        ValidateField("#emailAddress", /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid email address");
    }
    function ValidateField(input_field_id, regular_expression, error_message) {
        let messageArea = $("#messageArea").hide();
        $(input_field_id).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.fullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function DisplayHomePage() {
        console.log("Called DisplayHomePage()");
        $("#AboutUsBtn").on("click", () => {
            LoadLink("about");
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
        let sendButton = document.getElementById("sendButton");
        let subscribeButton = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click", function () {
            if (subscribeButton.checked) {
                let fullName = document.forms[0].fullname.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                let contact = new core.Contact(fullName, contactNumber, emailAddress);
                if (contact.serialize()) {
                    let key = contact.fullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }
    function DisplayContactListPage() {
        console.log("Called DisplayContactListPage()");
        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList");
            let data = "";
            let keys = Object.keys(localStorage);
            let index = 1;
            for (const key of keys) {
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
        $("#addButton").on("click", () => {
            LoadLink("edit#add");
        });
        $("button.delete").on("click", function () {
            if (confirm("Please confirm contact deletion")) {
                localStorage.removeItem($(this).val());
            }
            LoadLink("contact-list");
        });
        $("button.edit").on("click", function () {
            LoadLink("edit#" + $(this).val());
        });
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
                case "contact": return DisplayContactUsPage;
                case "contact-list": return DisplayContactListPage;
                case "register": return DisplayLoginPage;
                case "edit": return DisplayEditPage;
                case "404": return Display404Page;
                default:
                    console.error("Error: callback does not exist for link: " + router.ActiveLink);
                    return Display404Page;
            }
        }
        else {
            console.error("Error: router.ActiveLink is undefined");
            throw new Error("router.ActiveLink is undefined");
        }
    }
    function LoadHeader() {
        $.get("Week_10/Week_10_2/views/components/header.html", function (html_data) {
            $("header").html(html_data);
            document.title = CapitalizeFirstLetter(router.ActiveLink);
            $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
            CheckLogin();
        });
    }
    function CapitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function LoadContent() {
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallback();
        $.get(`./views/content/${page_name}.html`, function (html_data) {
            $("main").html(html_data);
            callback();
        });
    }
    function LoadFooter() {
        $.get("./views/components/footer.html", function (html_data) {
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
                    let fullName = document.forms[0].fullname.value;
                    let contactNumber = document.forms[0].contactNumber.value;
                    let emailAddress = document.forms[0].emailAddress.value;
                    AddContact(fullName, contactNumber, emailAddress);
                    LoadLink("contact-list");
                });
                $("#ResetButton").on("click", () => {
                    LoadLink("contact-list");
                });
                break;
            default:
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));
                $("#fullName").val(contact.fullName);
                $("#contactNumber").val(contact.contactNumber);
                $("#emailAddress").val(contact.emailAddress);
                $("#editButton").on("click", (event) => {
                    event.preventDefault();
                    contact.fullName = $("#fullName").val();
                    contact.contactNumber = $("#contactNumber").val();
                    contact.emailAddress = $("#emailAddress").val();
                    localStorage.setItem(page, contact.serialize());
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
        $("#loginButton").on("click", function () {
            let success = false;
            let newUser = new core.User();
            $.get("./data/users.json", function (data) {
                for (const user of data.user) {
                    console.log(data.user);
                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;
                    if (username === user.Username && password === user.password) {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    LoadLink("contact-list");
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
                    LoadLink("index");
                });
            });
        });
    }
    function DisplayRegisterPage() {
        console.log("Called DisplayRegisterPage");
    }
    function Start() {
        console.log("App Started");
        LoadHeader();
        LoadContent();
        LoadFooter();
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map