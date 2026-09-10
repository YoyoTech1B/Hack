"use strict";

/* =====================================================
   CYBERLAB
   COMMAND CENTER INTERFACE

   This controls the GitHub Pages dashboard UI.
   Real targets should only be systems you own or are
   explicitly authorized to test.
===================================================== */


/* =====================================================
   CYBERLAB STATE
===================================================== */

const CyberLab = {

    activeTargets: 0,

    missionsCompleted: 0,

    maxMissions: 50,

    labOnline: true,

    terminalHistory: [],

    initialized: false

};


/* =====================================================
   DOM ELEMENTS
===================================================== */

const elements = {

    enterLabButton:

        document.querySelector(".primary-button"),


    viewTargetsButton:

        document.querySelector(".secondary-button"),


    deployTargetButton:

        document.querySelector(".add-target"),


    targetSection:

        document.querySelector(".targets-grid"),


    quickCards:

        document.querySelectorAll(".quick-card"),


    targetCards:

        document.querySelectorAll(".target-card"),


    stats:

        document.querySelectorAll(".stat-card"),


    terminal:

        document.querySelector(".terminal-output")

};


/* =====================================================
   INITIALIZE
===================================================== */

function initializeCyberLab() {

    if (CyberLab.initialized) {

        return;

    }

    CyberLab.initialized = true;


    console.log(

        "%c⚡ CYBERLAB INITIALIZED",

        "color: #0088ff; font-size: 16px; font-weight: bold;"

    );


    console.log(

        "%cAUTHORIZED SECURITY TRAINING ENVIRONMENT",

        "color: #00ff99;"

    );


    loadLabData();

    initializeButtons();

    initializeQuickAccess();

    initializeTargetCards();

    updateDashboard();

    addTerminalMessage(

        "✓ COMMAND CENTER INITIALIZED",

        "success"

    );

}


/* =====================================================
   LOAD SAVED DATA
===================================================== */

function loadLabData() {

    const savedData =

        localStorage.getItem(

            "cyberlab-data"

        );


    if (!savedData) {

        return;

    }


    try {

        const data =

            JSON.parse(savedData);


        CyberLab.activeTargets =

            data.activeTargets || 0;


        CyberLab.missionsCompleted =

            data.missionsCompleted || 0;


        console.log(

            "CYBERLAB DATA RESTORED"

        );

    }

    catch (error) {

        console.error(

            "Could not load CyberLab data:",

            error

        );

    }

}


/* =====================================================
   SAVE DATA
===================================================== */

function saveLabData() {

    const data = {

        activeTargets:

            CyberLab.activeTargets,


        missionsCompleted:

            CyberLab.missionsCompleted,


        lastUpdate:

            new Date().toISOString()

    };


    localStorage.setItem(

        "cyberlab-data",

        JSON.stringify(data)

    );

}


/* =====================================================
   MAIN BUTTONS
===================================================== */

function initializeButtons() {


    /* ENTER LAB */

    if (elements.enterLabButton) {

        elements.enterLabButton.addEventListener(

            "click",

            function () {

                enterLab();

            }

        );

    }


    /* VIEW TARGETS */

    if (elements.viewTargetsButton) {

        elements.viewTargetsButton.addEventListener(

            "click",

            function () {

                scrollToTargets();

            }

        );

    }


    /* DEPLOY TARGET */

    if (elements.deployTargetButton) {

        elements.deployTargetButton.addEventListener(

            "click",

            function () {

                deployTargetMenu();

            }

        );

    }

}


/* =====================================================
   ENTER LAB
===================================================== */

function enterLab() {

    addTerminalMessage(

        "> ACCESSING CYBERLAB COMMAND CENTER...",

        "normal"

    );


    addTerminalMessage(

        "✓ ADMIN SESSION READY",

        "success"

    );


    window.scrollTo({

        top:

            0,

        behavior:

            "smooth"

    });


    showNotification(

        "⚡ CYBERLAB COMMAND CENTER READY"

    );

}


/* =====================================================
   SCROLL TO TARGETS
===================================================== */

function scrollToTargets() {

    if (!elements.targetSection) {

        return;

    }


    elements.targetSection.scrollIntoView({

        behavior:

            "smooth",

        block:

            "center"

    });


    showNotification(

        "🎯 TARGET MANAGER OPENED"

    );

}


/* =====================================================
   DEPLOY TARGET MENU
===================================================== */

function deployTargetMenu() {

    showNotification(

        "TARGET DEPLOYMENT: CONNECT YOUR OWN LAB INFRASTRUCTURE"

    );


    addTerminalMessage(

        "> TARGET DEPLOYMENT REQUEST RECEIVED",

        "normal"

    );


    addTerminalMessage(

        "! Dashboard deployment controls require an authorized lab backend",

        "warning"

    );

}


/* =====================================================
   TARGET CARDS
===================================================== */

function initializeTargetCards() {

    elements.targetCards.forEach(

        function (card) {

            const button =

                card.querySelector("button");


            if (!button) {

                return;

            }


            button.addEventListener(

                "click",

                function () {

                    configureTarget(card);

                }

            );

        }

    );

}


/* =====================================================
   CONFIGURE TARGET
===================================================== */

function configureTarget(card) {

    const targetName =

        card.querySelector("h3");


    const targetType =

        targetName

            ? targetName.textContent.trim()

            : "TARGET";


    addTerminalMessage(

        "> SELECTED: " + targetType,

        "normal"

    );


    addTerminalMessage(

        "! Configure this target through your authorized lab infrastructure",

        "warning"

    );


    showNotification(

        "⚙ " + targetType + " SELECTED"

    );

}


/* =====================================================
   QUICK ACCESS
===================================================== */

function initializeQuickAccess() {

    elements.quickCards.forEach(

        function (card) {

            card.addEventListener(

                "click",

                function () {

                    const title =

                        card.querySelector("h3");


                    if (!title) {

                        return;

                    }


                    openQuickAccess(

                        title.textContent.trim()

                    );

                }

            );

        }

    );

}


/* =====================================================
   QUICK ACCESS ACTIONS
===================================================== */

function openQuickAccess(section) {

    switch (section) {


        case "TERMINAL":

            openTerminal();

            break;


        case "TARGET MANAGER":

            scrollToTargets();

            break;


        case "MISSIONS":

            showNotification(

                "🏆 MISSIONS MODULE COMING NEXT"

            );

            break;


        case "LAB SETTINGS":

            showNotification(

                "⚙ LAB SETTINGS MODULE COMING NEXT"

            );

            break;


        default:

            showNotification(

                "MODULE SELECTED"

            );

    }

}


/* =====================================================
   TERMINAL
===================================================== */

function openTerminal() {

    showNotification(

        "⌘ TERMINAL INTERFACE ACTIVE"

    );


    addTerminalMessage(

        "> TERMINAL ACCESS OPENED",

        "normal"

    );


    addTerminalMessage(

        "✓ LOCAL DASHBOARD CONTROLS READY",

        "success"

    );

}


/* =====================================================
   TERMINAL MESSAGE
===================================================== */

function addTerminalMessage(

    message,

    type = "normal"

) {

    if (!elements.terminal) {

        return;

    }


    const line =

        document.createElement("p");


    line.textContent =

        message;


    if (type === "success") {

        line.style.color =

            "#00ff99";

    }


    if (type === "warning") {

        line.style.color =

            "#ffbb33";

    }


    elements.terminal.appendChild(

        line

    );


    CyberLab.terminalHistory.push({

        message:

            message,


        type:

            type,


        time:

            Date.now()

    });


    while (

        CyberLab.terminalHistory.length > 20

    ) {

        CyberLab.terminalHistory.shift();

    }


    elements.terminal.scrollTop =

        elements.terminal.scrollHeight;

}


/* =====================================================
   UPDATE DASHBOARD
===================================================== */

function updateDashboard() {

    if (!elements.stats.length) {

        return;

    }


    const activeTargetsElement =

        elements.stats[0].querySelector("h3");


    const securityElement =

        elements.stats[1].querySelector("h3");


    const statusElement =

        elements.stats[2].querySelector("h3");


    const missionsElement =

        elements.stats[3].querySelector("h3");


    if (activeTargetsElement) {

        activeTargetsElement.textContent =

            CyberLab.activeTargets;

    }


    if (securityElement) {

        securityElement.textContent =

            "100%";

    }


    if (statusElement) {

        statusElement.textContent =

            CyberLab.labOnline

                ? "READY"

                : "OFFLINE";

    }


    if (missionsElement) {

        missionsElement.textContent =

            CyberLab.missionsCompleted +

            " / " +

            CyberLab.maxMissions;

    }

}


/* =====================================================
   NOTIFICATION SYSTEM
===================================================== */

function showNotification(message) {

    const existingNotification =

        document.querySelector(

            ".cyberlab-notification"

        );


    if (existingNotification) {

        existingNotification.remove();

    }


    const notification =

        document.createElement("div");


    notification.className =

        "cyberlab-notification";


    notification.textContent =

        message;


    document.body.appendChild(

        notification

    );


    setTimeout(

        function () {

            notification.classList.add(

                "show"

            );

        },

        10

    );


    setTimeout(

        function () {

            notification.classList.remove(

                "show"

            );


            setTimeout(

                function () {

                    notification.remove();

                },

                300

            );

        },

        3500

    );

}


/* =====================================================
   KEYBOARD SHORTCUTS
===================================================== */

document.addEventListener(

    "keydown",

    function (event) {


        /* CTRL + ENTER = ENTER LAB */

        if (

            event.ctrlKey &&

            event.key === "Enter"

        ) {

            event.preventDefault();

            enterLab();

        }


        /* T = TERMINAL */

        if (

            event.key.toLowerCase() === "t" &&

            !event.ctrlKey &&

            !event.metaKey

        ) {

            const activeElement =

                document.activeElement;


            const typing =

                activeElement &&

                (

                    activeElement.tagName === "INPUT" ||

                    activeElement.tagName === "TEXTAREA"

                );


            if (!typing) {

                openTerminal();

            }

        }

    }

);


/* =====================================================
   SYSTEM STARTUP
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        initializeCyberLab();

    }

);
