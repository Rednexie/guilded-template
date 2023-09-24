Consoled.js is a powerful Node.js module that allows developers to add colorful formatting to their console output. Developed by Rednexie, this module is lightweight, efficient, and does not require any dependencies.

It has been tested on both Linux and Windows platforms, making it a versatile tool for developers across different environments.

The module supports a variety of formatting options, including basic color text and background color text. These options are easy to use, and developers can select from white, black, gray, red, yellow, green, cyan, blue, and magenta to customize their console output.

In addition to basic formatting, consoled.js also supports underlined, faded, and bright text. This allows developers to add a wide range of styles.

If you want to take a look at the methods/colors consoled.js supports, view 'example.png' 

Methods:
    
    consoled.<color>(text): Prints the colored text to the console. color can be one of these: white, black, gray, red, yellow, green, cyan, blue or magenta. 
    
    consoled.<bgcolor>(text): Prints the background-colored text to the console. bgcolor can be one of these: white, black, gray, red, yellow, green, cyan, blue or magenta.

    consoled.us.<color>(text): Prints the colored and underlined text to the console. color can be one of these: white, black, gray, red, yellow, green, cyan, blue or magenta.
    
    consoled.fade.<color>(text): Prints the colored and faded text to the console. color can be one of these: white, black, gray, red, yellow, green, cyan, blue, magenta 
    
    consoled.bright.<color>(text): Prints the colored and bright text to the console. color can be one of these: white, black, gray, red, yellow, green, cyan, blue or magenta.

    consoled.usfade.<color>(text): Prints the colored, underscored and faded text to the console. color can be one of these: white, black, gray, red, yellow, green, cyan, blue or magenta.

    consoled.brightus.<color>(text): Prints the colored, underscored and bright text to the console. color can be one of these: white, black, gray, red, yellow, green, cyan, blue or magenta.

Usage & Examples:

Firstly, you have to install consoled.js node module to your system. Use the command:

    npm i consoled.js

After the installation is done, you can import and use it.

Using es6 import:

    import consoled from "consoled.js"

    consoled.red("This is a normal red text!");

    consoled.bgred("This is a white or black text, with a red background!");

    consoled.bright.red("This is a bright red text!");

    consoled.brightus.red("This is an underscored, bright red text!");

    consoled.fade.red("This is a red text, but it is faded.");

    consoled.usfade.bgred("This is an underscored and faded text with a red background!");

Using require(Recommended)

    const consoled = require("consoled.js");

    consoled.green("This is a normal green text!");

    consoled.bggreen("This is a white or black text, with a green background!")

    consoled.bright.green("This is a bright green text!")

    consoled.brightus.green("This is an underscored, bright green text!")

    consoled.fade.green("This is a green text, but it is faded.")

    consoled.usfade.bggreen("This is a underscored and faded text with a green background!")


It is important to note that there may be some issues with white colors in Windows command prompt and with yellow colors on Windows Powershell.

Overall, consoled.js is an excellent tool for developers who want to add some visual flair to their console output. Its flexibility and ease of use makes it a great choice for beginners and experienced developers alike.