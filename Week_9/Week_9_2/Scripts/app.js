"use strict";
(function () {
    function AddLinkEvents(link) {
        let linkQuery = $(`a.link[data=${link}]`);
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");
        linkQuery.on("click", function () { loadLink(`${link}`); });
        linkQuery.on("mouseover", function () {
            $(this).css("font-weight", "bold");
            $(this).css("cursor", "pointer");
        });
        linkQuery.on("mouseout", function () { $(this).css("font-weight", "normal"); });
    }
    function AddNavigationEvents() {
        let navlink = $("ul>il>a");
        navlink.off("click");
        navlink.off("mouseover");
        navlink.on("click", function () { loadLink($(this).attr("data")); });
        navlink.on("mouseover", function () { $(this).css("cursor", "pointer"); });
    }
    function loadLink(link, data = "") {
        router.ActiveLink = link;
        authGuard();
        router.linkData = data;
        history.pushState({}, "", router.ActiveLink);
        document.title = CapitalizeFirstLetter(router.ActiveLink);
        $("iul>il>a").each(function () { $(this).removeClass("active"); });
        $(`il>a>:contains(${document.title})`).addClass("active");
        LoadContent();
    }
    function authGuard() {
        let protected_routes = ["contact-list"];
        if (protected_routes.indexOf(router.ActiveLink) > -1) {
            if (!sessionStorage.getItem("user")) {
                loadLink("login");
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
        });
        AddNavigationEvents();
        loadLink("login");
    }
    function AjaxRequest(method, url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
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
        xhr.send();
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
            loadLink("about");
        });
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the first Paragraph</p>`);
        $("main").append(`<article class="container"><p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`);
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
        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function () { loadLink("contact-list"); });
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
        $("#addButton").on("click", () => { loadLink("edit", "add"); });
        $("button.delete").on("click", function () {
            if (confirm("Please confirm contact deletion")) {
                localStorage.removeItem($(this).val());
            }
            loadLink("contact-list");
        });
        $("button.edit").on("click", function () { loadLink("edit", $(this).val()); });
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
        $.get("/views/component/header.html", function (html_data) {
            $("header").html(html_data);
            document.title = CapitalizeFirstLetter(router.ActiveLink);
            $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
            AddNavigationEvents();
            CheckLogin();
        });
    }
    function CapitalizeFirstLetter(str) {
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
                    let fullName = document.forms[0].fullname.value;
                    let contactNumber = document.forms[0].contactNumber.value;
                    let emailAddress = document.forms[0].emailAddress.value;
                    AddContact(fullName, contactNumber, emailAddress);
                    location.href = "/contact-list";
                });
                $("#ResetButton").on("click", () => {
                    loadLink("contact-list");
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
                    loadLink("contact-list");
                });
                $("#ResetButton").on("click", () => {
                    loadLink("contact-list");
                });
                break;
        }
    }
    function DisplayLoginPage() {
        console.log("Called DisplayLoginPage");
        let messageArea = $("#messageArea");
        messageArea.hide();
        AddLinkEvents("register");
        $("#loginButton").on("click", function () {
            let success = false;
            let newUser = new core.User();
            $.get("./data/users.json", function (data) {
                for (const user of data.users) {
                    console.log(data.user);
                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;
                    if (username === user.Username && password === user.Password) {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    loadLink("contact-list");
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
                    loadLink("home");
                });
            });
        });
    }
    function DisplayRegisterPage() {
        console.log("Called DisplayRegisterPage");
        AddLinkEvents("login");
    }
    function Start() {
        console.log("App Started");
        LoadHeader();
        loadLink("home");
        LoadFooter();
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map