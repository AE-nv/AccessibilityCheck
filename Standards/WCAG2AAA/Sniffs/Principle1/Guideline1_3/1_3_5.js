/**
 * +--------------------------------------------------------------------+
 * | This HTML_CodeSniffer file is Copyright (c)                        |
 * | Squiz Pty Ltd (ABN 77 084 670 600)                                 |
 * +--------------------------------------------------------------------+
 * | IMPORTANT: Your use of this Software is subject to the terms of    |
 * | the Licence provided in the file licence.txt. If you cannot find   |
 * | this file please contact Squiz (www.squiz.com.au) so we may        |
 * | provide you a copy.                                                |
 * +--------------------------------------------------------------------+
 *
 */

_global.HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_3_1_3_5 = {
  /**
   * Determines the elements to register for processing.
   *
   * Each element of the returned array can either be an element name, or "_top"
   * which is the top element of the tested code.
   *
   * @returns {Array} The list of elements.
   */
  register: function() {
    return ["input", "select", "textarea"];
  },

  /**
   * Checks that the values of the autocomplete attribute are values listed in the HTML 5.2 spec.
   *
   * @param {DOMNode} element The element registered.
   */
  checkValidAttributes: function(element) {
    var valid_attributes = [
      "additional-name",
      "address-level1",
      "address-level2",
      "address-level3",
      "address-level4",
      "address-line1",
      "address-line2",
      "address-line3",
      "bday",
      "bday-year",
      "bday-day",
      "bday-month",
      "billing",
      "cc-additional-name",
      "cc-csc",
      "cc-exp",
      "cc-exp-month",
      "cc-exp-year",
      "cc-family-name",
      "cc-given-name",
      "cc-name",
      "cc-number",
      "cc-type",
      "country",
      "country-name",
      "current-password",
      "email",
      "family-name",
      "fax",
      "given-name",
      "home",
      "honorific-prefix",
      "honorific-suffix",
      "impp",
      "language",
      "mobile",
      "name",
      "new-password",
      "nickname",
      "off",
      "on",
      "organization",
      "organization-title",
      "pager",
      "photo",
      "postal-code",
      "sex",
      "shipping",
      "street-address",
      "tel-area-code",
      "tel",
      "tel-country-code",
      "tel-extension",
      "tel-local",
      "tel-local-prefix",
      "tel-local-suffix",
      "tel-national",
      "transaction-amount",
      "transaction-currency",
      "url",
      "username",
      "work"
    ];

    var values = element
      .getAttribute("autocomplete")
      .split(" ")
      .map(function(x) {
        return x.trim();
      });

    if (
      values.some(function(x) {
        return !valid_attributes.includes(x) && !x.indexOf("section-") !== 0;
      })
    ) {
      HTMLCS.addMessage(
        HTMLCS.WARNING,
        element,
        "This element contains a potentially faulty value in its autocomplete attribute: " +
          values,
        "H98"
      );
    }
  },

  /**
   * Checks that the values of the autocomplete attribute match the right control groups.
   *
   * This uses the logic from the followingtable in the HTML 5.2 spec:
   * https://www.w3.org/TR/html52/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute
   *
   * @param {DOMNode} element The element registered.
   */
  checkControlGroups: function(element) {
    var textFields = [
      "name",
      "honorific-prefix",
      "given-name",
      "additional-name",
      "family-name",
      "honorific-suffix",
      "nickname",
      "organization-title",
      "username",
      "organization",
      "address-line1",
      "address-line2",
      "address-line3",
      "address-level4",
      "address-level3",
      "address-level2",
      "address-level1",
      "country",
      "country-name",
      "postal-code",
      "cc-name",
      "cc-given-name",
      "cc-additional-name",
      "cc-family-name",
      "cc-number",
      "cc-csc",
      "cc-type",
      "transaction-currency",
      "language",
      "sex",
      "tel-country-code",
      "tel-national",
      "tel-area-code",
      "tel-local",
      "tel-local-prefix",
      "tel-local-suffix",
      "tel-extension"
    ];
    var isText =
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "hidden") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "text") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "search") ||
      element.tagName === "TEXTAREA" ||
      element.tagName === "SELECT";

    var multilineFields = ["street-address"];
    var isMultiline =
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "hidden") ||
      element.tagName === "TEXTAREA" ||
      element.tagName === "SELECT";

    var passwordFields = ["new-password", "current-password"];
    var isPassword =
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "hidden") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "text") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "search") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "password") ||
      element.tagName === "TEXTAREA" ||
      element.tagName === "SELECT";

    var urlFields = ["url", "photo", "impp"];
    var isUrl =
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "hidden") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "text") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "search") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "email") ||
      element.tagName === "TEXTAREA" ||
      element.tagName === "SELECT";

    var telFields = ["tel"];
    var isTel =
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "hidden") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "text") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "search") ||
      (element.tagName === "INPUT" && element.getAttribute("type") === "tel") ||
      element.tagName === "TEXTAREA" ||
      element.tagName === "SELECT";

    var numericFields = [
      "cc-exp-month",
      "cc-exp-year",
      "transaction-amount",
      "bday-day",
      "bday-month",
      "bday-year"
    ];
    var isNumeric =
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "hidden") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "text") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "search") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "number") ||
      element.tagName === "TEXTAREA" ||
      element.tagName === "SELECT";

    var monthFields = ["cc-exp"];
    var isMonth =
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "hidden") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "text") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "search") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "month") ||
      element.tagName === "TEXTAREA" ||
      element.tagName === "SELECT";

    var dateFields = ["bday"];
    var isDate =
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "hidden") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "text") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "search") ||
      (element.tagName === "INPUT" &&
        element.getAttribute("type") === "date") ||
      element.tagName === "TEXTAREA" ||
      element.tagName === "SELECT";

    var values = element.getAttribute("autocomplete");

    values
      .split(" ")
      .map(function(x) {
        return x.trim();
      })
      .forEach(function(x) {
        if (textFields.includes(value) && !isText) {
          HTMLCS.addMessage(
            HTMLCS.ERROR,
            element,
            "Invalid autocomplete value: " +
              value +
              ". Element does not belong to Text control group. See https://www.w3.org/TR/html52/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute",
            "H98"
          );
        }
        if (multilineFields.includes(value) && !isMultiline) {
          HTMLCS.addMessage(
            HTMLCS.ERROR,
            element,
            "Invalid autocomplete value: " +
              value +
              ". Element does not belong to Multiline control group. See https://www.w3.org/TR/html52/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute",
            "H98"
          );
        }
        if (passwordFields.includes(value) && !isPassword) {
          HTMLCS.addMessage(
            HTMLCS.ERROR,
            element,
            "Invalid autocomplete value: " +
              value +
              ". Element does not belong to Password control group. See https://www.w3.org/TR/html52/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute",
            "H98"
          );
        }
        if (urlFields.includes(value) && !isUrl) {
          HTMLCS.addMessage(
            HTMLCS.ERROR,
            element,
            "Invalid autocomplete value: " +
              value +
              ". Element does not belong to Url control group. See https://www.w3.org/TR/html52/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute",
            "H98"
          );
        }
        if (telFields.includes(value) && !isTel) {
          HTMLCS.addMessage(
            HTMLCS.ERROR,
            element,
            "Invalid autocomplete value: " +
              value +
              ". Element does not belong to Telephone control group. See https://www.w3.org/TR/html52/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute",
            "H98"
          );
        }
        if (numericFields.includes(value) && !isNumeric) {
          HTMLCS.addMessage(
            HTMLCS.ERROR,
            element,
            "Invalid autocomplete value: " +
              value +
              ". Element does not belong to Numeric control group. See https://www.w3.org/TR/html52/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute",
            "H98"
          );
        }
        if (monthFields.includes(value) && !isMonth) {
          HTMLCS.addMessage(
            HTMLCS.ERROR,
            element,
            "Invalid autocomplete value: " +
              value +
              ". Element does not belong to Month control group. See https://www.w3.org/TR/html52/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute",
            "H98"
          );
        }
        if (dateFields.includes(value) && !isDate) {
          HTMLCS.addMessage(
            HTMLCS.ERROR,
            element,
            "Invalid autocomplete value: " +
              value +
              ". Element does not belong to Date control group. See https://www.w3.org/TR/html52/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute",
            "H98"
          );
        }
      });
  },

  /**
   * Process the registered element.
   *
   * @param {DOMNode} element The element registered.
   * @param {DOMNode} top     The top element of the tested code.
   */
  process: function(element, top) {
    HTMLCS.addMessage(
      HTMLCS.NOTICE,
      top,
      'Check that the input field serves a purpose identified in the <a href="https://www.w3.org/TR/WCAG21/#input-purposes" target="_blank">Input Purposes for User Interface Components</a> section; and that the content is implemented using technologies with support for identifying the expected meaning for form input data.',
      "H98"
    );

    // See table in https://www.w3.org/TR/html52/sec-forms.html#the-input-element
    var types_to_skip = [
      "hidden",
      "checkbox",
      "radio",
      "file",
      "submit",
      "image",
      "reset",
      "button"
    ];
    if (types_to_skip.includes(element.getAttribute("type"))) {
      // Skip any further validation for input types where the autocomplete attribute does not apply, or where the autocomplete element wears the "autofill anchor mantle".
      return;
    }
    if (element.hasAttribute("autocomplete") === false) {
      HTMLCS.addMessage(
        HTMLCS.NOTICE,
        element,
        "This element does not have an autocomplete attribute. If this field collects information about the user, consider adding one to comply with this Success Criterion.",
        "H98"
      );
    } else {
      this.checkValidAttributes(element);
      this.checkControlGroups(element);
    }
  }
};
