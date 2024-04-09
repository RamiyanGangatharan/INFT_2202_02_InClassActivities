"use strict";

namespace core
{
    export class Contact
    {
        private _name:string;
        private _contactNumber:string;
        private _emailAddress:string;

        constructor(name = "", contactNumber = "", emailAddress = "")
        {
            this._name = name;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
        }

        public get fullName():string {
            return this._name;
        }

        public set fullName(value:string) {
            this._name = value;
        }

        public get contactNumber() {
            return this._contactNumber;
        }

        public set contactNumber(value:string) {
            this._contactNumber = value;
        }

        public get emailAddress():string {
            return this._emailAddress;
        }

        public set emailAddress(value:string) {
            this._emailAddress = value;
        }

        public toString():string {
            return `name ${this._name}\n contactNumber ${this._contactNumber}\n emailAddress ${this._emailAddress}`;
        }

        public serialize():string | null
        {
            if (this._name !== "" && this._contactNumber !== "" && this._emailAddress !== "") {
                return `${this._name}, ${this._contactNumber}, ${this._emailAddress}`;
            } else {
                console.log("One or more of the contact information is invalid or empty");
                return null;
            }
        }

        /**
         * Deserialize means to read data from local storage
         */
        public deserialize(data:string) {
            //                      Array Position:   [0]         [1]             [2]
            // the split method does the following: "Bruce", "555-555-5555", "Bruce@batman.com"
            let propertyArray = data.split(",");
            this._name = propertyArray[0];
            this._contactNumber = propertyArray[1];
            this._emailAddress = propertyArray[2];
        }
    }
    core.Contact = Contact;
}