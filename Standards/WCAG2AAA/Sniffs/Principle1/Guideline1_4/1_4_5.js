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

_global.HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_5 = {
    /**
     * Determines the elements to register for processing.
     *
     * Each element of the returned array can either be an element name, or "_top"
     * which is the top element of the tested code.
     *
     * @returns {Array} The list of elements.
     */
    register: function()
    {
        return ['_top'];

    },

    /**
     * Process the registered element.
     *
     * @param {DOMNode} element The element registered.
     * @param {DOMNode} top     The top element of the tested code.
     */
    process: function(element, top)
    {
        var imgObj = top.querySelector('img');

        if (imgObj !== null) {
            HTMLCS.addMessage(HTMLCS.NOTICE, top, _global.HTMLCS.getTranslation("1_4_5_G140,C22,C30.AALevel"), 'G140,C22,C30.AALevel');
        }
        if(element === top) {
            this.checkImageForText(top);
        }
    },

    checkImageForText: function(top) {
        elements = HTMLCS.util.getAllElements(top, 'img, area, input[type="image"]');
        var numberOfChecks = 0;

        for (var el = 0; el < elements.length; el++) {
            var element = elements[el];
            var nodeName      = element.nodeName.toLowerCase();

            // Now determine which test(s) should fire.
            switch (nodeName) {
            case 'img':
                if(numberOfChecks >= 4) {
                    break;
                }
                var srcName = element.src ? element.src.toLowerCase() : "";
                var isJpeg = /\.jpg$/i.test(srcName) || /\.jpeg$/i.test(srcName);
                var isPng = /\.png$/i.test(srcName);
                if(isJpeg || isPng) {
                    HTMLCS.addAsyncMessage(this.executeTextRecognizition(element));
                    numberOfChecks++;
                }
                break;
            default:
                // No other tags defined.
                break;
            }//end switch
        }//end for
    }, 

    executeTextRecognizition: function(element) {
        return Tesseract.recognize(
            element.src,
            'eng')
        .then(function(result) {
            if(result.data.text && result.data.text.length > 0) {
                HTMLCS.addMessage(HTMLCS.WARNING, element, _global.HTMLCS.getTranslation("1_4_5_text").replace('{0}', result.data.text), 'G140,C22,C30.AALevel');
            }
        });
    }
};
