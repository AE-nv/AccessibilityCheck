# PoC AE - BOSA Accessibility Check README

## What is BOSA Accessibility Check?

BOSA Accessibility Check is a JavaScript application that checks a HTML document
or source code, and detects violations of a defined presentation or accessibility
standard, such as Section508 or WCAG2.1.

This is a fork of [BOSA Accessibility check](https://github.com/openfed/AccessibilityCheck), which is released under a BSD-style license.

FOD BOSA wants to use AI for several checks. In this PoC, AE showed it is possible. In order to prove it, AE implemented the following checks:
1. Check whether the alt text describes what is visible on the image (backend model)
2. Check whether the language described in th lang attribute is used on the page (backend model)
3. Use Tessaract OCR to get the text used in an image

### Using BOSA Accessibility Check - AE PoC

BOSA Accessiblity Check can be called in multiple ways:

- Called directly in JavaScript source, BOSA Accessibility Check will provide a list of known
  and potential violations to the calling script.
- It also comes with a pop-up auditor interface, accessible via a bookmarklet,
  letting you browse through messages emitted from one of the defined standards.
  Where possible, the auditor also points you to the HTML element causing the problem.
- It can also be run on the command line with the assistance of a headless browser app.

For more information, please go to the [BOSA Accessibility github page](http://github.com/openfed/AccessibilityCheck).

### Bookmark 

#### Installation bookmark
The bookmark can be installed using the following steps:
1. Open the bookmark manager in your favorite browser (Chrome, Firefox, ...)
2. Create a new bookmark
   - **Name**: AE PoC
   - **Url**: javascript:(function() {var _p='//fodbosapoc20200330074148.blob.core.windows.net/hosting/';var _i=function(s,cb) {var sc=document.createElement('script');sc.onload = function() {sc.onload = null;sc.onreadystatechange = null;cb.call(this);};sc.onreadystatechange = function(){if(/^(complete|loaded)$/.test(this.readyState) === true){sc.onreadystatechange = null;sc.onload();}};sc.src=s;if (document.head) {document.head.appendChild(sc);} else {document.getElementsByTagName('head')[0].appendChild(sc);}}; var options={path:_p};_i(_p+'HTMLCS.js',function(){HTMLCSAuditor.run('WCAG2AA',null,options);});})();

#### Usage bookmark
1. Navigate to the page you want to investigate. Make sure the CSP headers of these website allow to download the sources hosted at the azure blob storage (domain: fodbosapoc20200330074148.blob.core.windows.net). 
2. When the page is loaded, click on the AE PoC bookmark

### New checks implemented in the PoC

#### Alt text image
For each image, the UI will send the URL, alt text and page language to a backend AI model. The backend model will return the most important objects recognized on the image and indicate whether the alt text was ok or not. When not, an error will be generated for that specific image. 

Because this is a PoC, try to limit the number of images on a page (max 5). No performance improvements are implemented yet, so the backend model will start failing when you overload the system. 

We support JPEG, PNG, BMP, GIF and SVG images.

This check is an extension of the BOSA Accessibility check implementation of [WCAG 2.1 Guideline 1.1.1](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html).

#### Language of the page
For each run, the UI will check the page language once. A backend AI model will be used to check the language of the page. 

This check is an extension of the BOSA Accessibility check implementation of [WCAG 2.1 Guideline 3.1.1](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html).

#### Text on an image
For each image, an AI model will calculate the text visible on the image. A frontend AI model will be used for this task. For each image, a warning will be generated showing the text and asking the user to check whether it is better to use the image or the text. 

We support JPEG and PNG images.

This check is an extension of the BOSA Accessibility check implementation of [WCAG 2.1 Guideline 1.4.5](https://www.w3.org/WAI/WCAG21/Understanding/images-of-text).

#### Result
As long as at least 1 check is running, the results will not yet be visualised. You will see 3 spinners. 

### Licence

Licensed under [the BSD 3-Clause "New" or "Revised" License](https://opensource.org/licenses/BSD-3-Clause). For more information,please see the file "licence.txt".

## Using the source code

### Building the auditor

The BOSA Accessiblity Check auditor can be built using [node.js](https://nodejs.org/) and the Grunt
tasker (http://gruntjs.com/). It has been tested with the latest version of node.js
(at time of writing: version 6.0) and Grunt, but should also work with recent
earlier versions.

- Install node.js with your package manager of choice.
- You may need to update the Node.js package manager (npm) itself:
  <code>npm update -g npm</code>
- Install the Grunt CLI helper if you haven't already done so:  
  <code>npm install -g grunt-cli</code>
- Get node.js to install the dependencies Grunt needs:  
  <code>npm install</code>
- Run Grunt to build the auditor:
  <code>grunt build</code>

You should see two new directories: <code>node_modules</code> (containing the node.js
dependencies), and <code>build</code> (containing your auditor). You can then move
(or symlink as appropriate) your <code>build</code> directory to a web-accessible
location.

Then grab or copy the JavaScript from the auditor bookmarklet from the [BOSA Accessibility Check site](https://openfed.github.io/AccessibilityCheck),
replace the directory at the start (//openfed.github.io/AccessibilityCheck/build) with your local URL, and save as a new bookmarklet.

## More Information

More information on BOSA Accessibility Check can be found on its GitHub site,
[http://openfed.github.io/AccessibilityCheck/](http://openfed.github.io/AccessibilityCheck/). This site provides:

- A link to the BOSA Accessibility Check bookmarklet, letting you check other pages using the pop-up auditor interface.
