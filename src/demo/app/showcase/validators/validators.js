/* tslint:disable */
var re = {
    creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
    email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    password: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/
};
/* tslint:enable */
export function creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value && control.value.match(re.creditCard)) {
        return null;
    }
    else {
        return { invalidCreditCard: true };
    }
}
export function emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value && control.value.match(re.email)) {
        return null;
    }
    else {
        return { invalidEmailAddress: true };
    }
}
export function passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value && control.value.match(re.password)) {
        return null;
    }
    else {
        return { invalidPassword: true };
    }
}
export function fieldMatchValidator(formControlNames, message, negative) {
    if (negative === void 0) { negative = false; }
    if (formControlNames.length < 2) {
        throw new Error('Field match validator requires at least 2 fields');
    }
    negative = !!negative;
    return function (control) {
        var primaryControl = control.get(formControlNames[0]);
        var theTruth = primaryControl && primaryControl.value;
        for (var i = 1, len = formControlNames.length; i < len; i++) {
            var child = control.get(formControlNames[i]);
            if (child) {
                var notMatched = theTruth !== child.value;
                var errors = child.errors || {};
                if ((notMatched && !negative) || (!notMatched && negative)) {
                    errors['fieldMatchValidator'] = message;
                }
                else {
                    delete errors['fieldMatchValidator'];
                }
                child.setErrors(Object.keys(errors).length ? errors : null);
            }
        }
        return {};
    };
}
//# sourceMappingURL=validators.js.map