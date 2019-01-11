'use strict';
/*global $, document, window, alert*/
/*eslint-disable no-unused-vars*/
function initSearchFields() {
    var startSelect,
        startRes,
        endSelect,
        endRes,
        optStart,
        optEnd,
        i,
        j,
        startID,
        endID;

    startID = "room-list-start-e";
    endID = "room-list-end-e";

    startSelect = document.getElementById(startID);
    startRes = $.urlParam("start");

    for (i = 0; i < startSelect.options.length; i = i + 1) {
        optStart = startSelect.options[i];

        if (optStart.value === startRes) {
            optStart.selected = true;
        } else {
            optStart.selected = false;
        }
    }

    endSelect = document.getElementById(endID);
    endRes = $.urlParam("end");

    for (j = 0; j < endSelect.options.length; j = j + 1) {
        optEnd = endSelect.options[j];

        if (optEnd.value === endRes) {
            optEnd.selected = true;
        } else {
            optEnd.selected = false;
        }
    }
}

function processData(data) {

    var dataListStart,
        dataListEnd,
        caption1 = '',
        caption2 = '',
        caption3 = '',
        caption4 = '',
        first = true,
        rowNr = 0,
        levelsE,
        level = '',
        url;

    dataListStart = document.getElementById("room-list-start-e");
    dataListEnd = document.getElementById("room-list-end-e");

    for (rowNr = 0; rowNr < levelsE.length; rowNr++) {
        var currentLevel = levelsE[rowNr];
        if (currentLevel[1] === '0' && caption1 === '') {
            level = 'Erdgeschoß';
            caption1 = 'full';
        } else if (currentLevel[1] === '1' && caption2 === '') {
            level = '1. Obergeschoß';
            caption2 = 'full';
        } else if (currentLevel[1] === '2' && caption3 === '') {
            level = '2. Obergeschoß';
            caption3 = 'full';
        } else if (currentLevel[1] === '3' && caption4 === '') {
            level = 'TechLab';
            caption4 = 'full';
        }


        if (level !== null) {
            if (first) {
                first = false;
            } else {
                dataListStart.innerHTML += '</optgroup>';
                dataListEnd.innerHTML += '</optgroup>';
            }

            dataListStart.innerHTML += '<optgroup label="' + level + '">';
            dataListEnd.innerHTML += '<optgroup label="' + level + '">';
            level = null;
        }

        dataListStart.innerHTML += '<option value=' + currentLevel[1] + "," + currentLevel[3] + "," + currentLevel[2] + '>' + currentLevel[0] + '</option>';
        dataListEnd.innerHTML += '<option value=' + currentLevel[1] + "," + currentLevel[3] + "," + currentLevel[2] + '>' + currentLevel[0] + '</option>';
    }

    //prüfen, ob es im Parameter ?-> gibt!
    //dann loop über alle einträge UND die selektierten setzen
    url = window.location.href;

    if (url.indexOf('?') !== -1) {
        initSearchFields();
    }
}

$(document).ready(function () {

    // Lädt Räume aus der CSV
    $.ajax({
        type: "GET",
        url: "js/pathfinder/raumliste-eisenstadt.csv",
        dataType: "text",
        success: function (data) {
            processData(data);
        }
    });
});

function checkStartAndEnd() {
    var startPoint, endPoint, animation, strUndefined = "undefined,undefined,undefined",
        strHTML;


    startPoint = document.getElementById("room-list-start-e").value;
    endPoint = document.getElementById("room-list-end-e").value;
    //animation = document.getElementById("animation");
    strHTML = "enavi.html?start=";

    if (startPoint === strUndefined && endPoint === strUndefined) {
        alert("ACHTUNG! Du hast weder den Startraum noch den Zielraum ausgewählt!");
    } else if (startPoint === strUndefined) {
        alert("ACHTUNG! Du hast keinen Startraum ausgewählt!");
    } else if (endPoint === strUndefined) {
        alert("ACTUNG! Du hast keinen Zielraum ausgewählt!");
    } else if (startPoint === endPoint) {
        alert("Der Start- und Zielraum sind ident! Bitte zwei unterschiedliche Räume wählen!");
    } else {
        //window.location.href = "indoornavi-map.html?start=" + startPoint + "&end=" + endPoint + "&ani=" + animation.checked;
        window.location.href = strHTML + startPoint + "&end=" + endPoint + "&ani=true"; // + animation.checked;
    }
}