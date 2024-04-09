"use strict";
var core;
(function (core) {
    class Contact {
        _name;
        _contactNumber;
        _emailAddress;
        constructor(name = "", contactNumber = "", emailAddress = "") {
            this._name = name;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
        }
        get fullName() {
            return this._name;
        }
        set fullName(value) {
            this._name = value;
        }
        get contactNumber() {
            return this._contactNumber;
        }
        set contactNumber(value) {
            this._contactNumber = value;
        }
        get emailAddress() {
            return this._emailAddress;
        }
        set emailAddress(value) {
            this._emailAddress = value;
        }
        toString() {
            return `name ${this._name}\n contactNumber ${this._contactNumber}\n emailAddress ${this._emailAddress}`;
        }
        serialize() {
            if (this._name !== "" && this._contactNumber !== "" && this._emailAddress !== "") {
                return `${this._name}, ${this._contactNumber}, ${this._emailAddress}`;
            }
            else {
                console.log("One or more of the contact information is invalid or empty");
                return null;
            }
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this._name = propertyArray[0];
            this._contactNumber = propertyArray[1];
            this._emailAddress = propertyArray[2];
        }
    }
    core.Contact = Contact;
    core.Contact = Contact;
})(core || (core = {}));
//# sourceMappingURL=contact.js.map