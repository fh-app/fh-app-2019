'use strict';
/*global $, document, window, Graph, astar, setTimeout, grid0, grid1, grid2, grid3*/
/*eslint-disable no-loop-func, no-undef*/

/*definitions*/
// Die Stockwerke wurden bereits eingebunden
var mapSearchEisenstadt = function () {
    var eg0Map = document.getElementById('eg0Map');
    var og1Map = document.getElementById('og1Map');
    var og2Map = document.getElementById('og2Map');
    var tb3Map = document.getElementById('tb3Map');

    var mainMap = [eg0Map, og1Map, og2Map, tb3Map];

    var graphEG = new Graph(grid0);
    var rows0 = grid0.length;
    var cols0 = grid0[0].length;

    var graph1OG = new Graph(grid1);
    var rows1 = grid1.length;
    var cols1 = grid1[0].length;

    var graph2OG = new Graph(grid2);
    var rows2 = grid2.length;
    var cols2 = grid2[0].length;

    var graph3TL = new Graph(grid3);
    var rows3 = grid3.length;
    var cols3 = grid3[0].length;

    var graph = [graphEG, graph1OG, graph2OG, graph3TL];
    var rows = [rows0, rows1, rows2, rows3];
    var cols = [cols0, cols1, cols2, cols3];
    var grid = [grid0, grid1, grid2, grid3];

    var gridElems = [],
        g = 0;

    var selectStart, selectEnd; // selectize Objekte

    /* Konstanten - Start */
    function pointStart() {
        return 'start';
    }

    function pointPath() {
        return 'path';
    }

    function pointEnd() {
        return 'end';
    }

    function ani() {
        return 'ani';
    }

    function wayPoint() {
        return 'waypoint';
    }

    function groundFloor() {
        return '0';
    }

    function firstFloor() {
        return '1';
    }

    function secondFloor() {
        return '2';
    }

    function thirdFloor() {
        return '3';
    }

    function eGFMap() {
        return '#eg0Map';
    }

    function eFFMap() {
        return '#og1Map';
    }

    function eSFMap() {
        return '#og2Map';
    }

    function eTFMap() {
        return '#tb3Map';
    }

    function showStairs() {
        return '#stairs';
    }

    function showBuilding() {
        return '#building';
    }

    function elementDiv() {
        return 'div';
    }

    function cnGridBox() {
        return 'grid-box';
    }

    function strPercent() {
        return '%';
    }

    function strCommaSpace() {
        return ', ';
    }

    function delimiterComma() {
        return ',';
    }

    function regExp1() {
        return '[\\?&]';
    }

    function regExp2() {
        return '=([^&#]*)';
    }

    function getFour() {
        return 4;
    }

    function getEight() {
        return 8;
    }

    function getNineTeen() {
        return 19;
    }

    function getTwentyOne() {
        return 21;
    }

    function getHGtoTLX() {
        return 1;
    }

    function getHGtoTLY() {
        return 0;
    }

    function getThirdFloorX() {
        return 23;
    }

    function getThirdFloorY() {
        return 23;
    }

    /* Konstanten - Ende */

    /* Funktionen - Start */
    function initGrids(g) {
        // vorläufiger Container für die zu erstellenden HTML-Elemente
        var docFrag = document.createDocumentFragment(),
            i = 0,
            elem,
            row,
            j;

        // Raster Elemente für begehbare Bereiche erzeugen
        for (i = 0; i < rows[g]; i += 1) {
            row = [];

            for (j = 0; j < cols[g]; j += 1) {
                // ignoriere nicht begehbare Bereiche
                if (grid[g][i][j] !== 0) {
                    // Element erzeugen und Attribute setzen
                    elem = document.createElement(elementDiv());
                    elem.className = cnGridBox();
                    elem.style.left = 100 / cols[g] * j + strPercent();
                    elem.style.top = 100 / rows[g] * i + strPercent();
                    elem.title = i + strCommaSpace() + j;
                    //
                    docFrag.appendChild(elem);
                    row[j] = elem;
                }
            }
            // Elemente für späteren Zugriff speichern
            gridElems[g][i] = row;
        }
        mainMap[g].appendChild(docFrag);
    }

    /* Main - Start */
    var mainMapLength = mainMap.length;

    for (g = 0; g < mainMapLength; g += 1) {
        gridElems[g] = [];
        initGrids(g);
    }
    /* Main - Ende */

    function initMaps(start_st) {
        'use strict';
        $(showStairs()).hide();
        $(showBuilding()).hide();

        if (start_st === groundFloor()) {
            $(eGFMap()).show();
            $(eFFMap()).hide();
            $(eSFMap()).hide();
            $(eTFMap()).hide();
        } else if (start_st === firstFloor()) {
            $(eGFMap()).hide();
            $(eFFMap()).show();
            $(eSFMap()).hide();
            $(eTFMap()).hide();
        } else if (start_st === secondFloor()) {
            $(eGFMap()).hide();
            $(eFFMap()).hide();
            $(eSFMap()).show();
            $(eTFMap()).hide();
        } else if (start_st === thirdFloor()) {
            $(eGFMap()).hide();
            $(eFFMap()).hide();
            $(eFFMap()).hide();
            $(eTFMap()).show();
        }
    }

    function checkStairsBuilding(stairs, building) {
        if ((stairs) && (!building)) {
            $(showStairs()).show();
            $(showBuilding()).hide();
        } else if ((building) && (!stairs)) {
            $(showStairs()).hide();
            $(showBuilding()).show();
        } else if ((!building) && (!stairs)) {
            $(showStairs()).hide();
            $(showBuilding()).hide();
        }
    }

    function getPoint(i, length, stairs, building) {
        var point = '';

        if (i === 0) {
            point = pointStart();
        } else if (i < (length - 1)) {
            point = pointPath();
        } else {
            point = pointEnd();

            checkStairsBuilding(stairs, building);
        }

        return point;
    }

    function drawPath(st, start, end, stairs, building, ani) {
        // astar anwenden
        var result = astar.search(graph[st], start, end),
            resultLength = result.length,
            punkt = '',
            i = 0;

        // Ergebnisse anzeigen
        for (i = 0; i < resultLength; i += 1) {
            if (ani) {
                (function (ind) {
                    setTimeout(function () {
                        punkt = getPoint(ind, resultLength, stairs, building);
                        gridElems[st][result[ind].x][result[ind].y].classList.add(wayPoint(), punkt);
                    }, 60 * ind);
                }(i));
            } else {
                punkt = getPoint(i, resultLength, stairs, building);
                gridElems[st][result[i].x][result[i].y].classList.add(wayPoint(), punkt);
            }
        }
    }

    function getStaircaseX(startX) {
        var diffFour = 0,
            diffNineteen = 0,
            stX = Number(startX);

        if (stX > getFour()) {
            diffFour = stX - getFour();
        } else {
            diffFour = getFour() - stX;
        }

        if (stX > getNineTeen()) {
            diffNineteen = stX - getNineTeen();
        } else {
            diffNineteen = getNineTeen() - stX;
        }

        if (diffFour < diffNineteen) {
            return getFour();
        } else if (diffNineteen < diffFour) {
            return getNineTeen();
        }
    }

    function getStaircaseY(startY) {
        var diffEight = 0,
            diffTwentyOne = 0,
            stY = Number(startY);

        if (stY > getEight()) {
            diffEight = stY - getEight();
        } else {
            diffEight = getEight() - stY;
        }

        if (stY > getTwentyOne()) {
            diffTwentyOne = stY - getTwentyOne();
        } else {
            diffTwentyOne = getTwentyOne() - stY;
        }

        if (diffEight < diffTwentyOne) {
            return getEight();
        } else if (diffTwentyOne < diffEight) {
            return getTwentyOne();
        }
    }

    function goToFloor(start_st, start_x, start_y, end_st, end_x, end_y, ani) {
        'use strict';
        var stairX = 0,
            stairY = 0,
            start = 0,
            end = 0,
            startX = start_x,
            startY = start_y,
            endY = end_y,
            endX = end_x,
            stockwerk = end_st,
            strMessage = '';

        //X- & Y-Koordinaten der nähesten Stiegen finden
        stairY = getStaircaseX(startY);
        stairX = getStaircaseY(startX);

        start = graph[start_st].grid[startY][startX];
        end = graph[start_st].grid[stairY][stairX];
        drawPath(start_st, start, end, true, false, ani);

        if (stockwerk === groundFloor()) {
            strMessage = 'Gehe ins Erdgeschoß!';
        } else {
            strMessage = 'Gehe in den ' + stockwerk + '. Stock!';
        }

        // Klicke auf den Button, um in das andere Stockwerk zu gelangen
        $("#stairs").append(strMessage).off("click touch").on("click touch", function () {
            initMaps(end_st);

            //von Stiege bis zum Endpunkt
            start = graph[end_st].grid[stairY][stairX];
            end = graph[end_st].grid[endY][endX];
            drawPath(end_st, start, end, false, false, ani);
        });
    }

    function goToTL(start_st, start_x, start_y, end_st, end_x, end_y, ani) {
        var stairX = 0,
            stairY = 0,
            start = 0,
            end = 0,
            strMessageEG = 'Gehe ins Erdgeschoß!',
            strMessageTL = 'Gehe zum Techlab!',
            gfTrue = false;

        start = graph[start_st].grid[start_y][start_x];

        if (start_st !== groundFloor()) {
            stairY = getStaircaseX(start_y);
            stairX = getStaircaseY(start_x);

            end = graph[start_st].grid[stairY][stairX];
            drawPath(start_st, start, end, true, false, ani);

            // Klicke auf den Button, um in das andere Stockwerk zu gelangen
            $(showStairs()).append(strMessageEG).off("click touch").on("click touch", function () {
                initMaps(groundFloor());

                start = graph[groundFloor()].grid[stairY][stairX];
                end = graph[groundFloor()].grid[getHGtoTLY()][getHGtoTLX()];
                drawPath(groundFloor(), start, end, false, true, ani);

                setTimeout(function () {
                    gfTrue = true;
                }, 500);

            });

            $(showBuilding()).append(strMessageTL).off("click touch").on("click touch", function () {
                if (gfTrue) {
                    initMaps(end_st);
                    start = graph[thirdFloor()].grid[getThirdFloorY()][getThirdFloorX()];
                    end = graph[end_st].grid[end_y][end_x];
                    drawPath(end_st, start, end, false, false, ani);
                }
            });
        } else if (start_st === groundFloor()) {
            end = graph[start_st].grid[getHGtoTLY()][getHGtoTLX()];
            drawPath(start_st, start, end, false, true, ani);

            $(showBuilding()).append(strMessageTL).off("click touch").on("click touch", function () {
                initMaps(end_st);

                start = graph[thirdFloor()].grid[getThirdFloorY()][getThirdFloorX()];
                end = graph[end_st].grid[end_y][end_x];
                drawPath(end_st, start, end, false, false, ani);
            });
        }
    }

    function goToHG(start_st, start_x, start_y, end_st, end_x, end_y, ani) {
        var start = 0,
            end = 0,
            strMessageHG = 'Gehe zum Hauptgebäude!';

        start = graph[start_st].grid[start_y][start_x];
        end = graph[thirdFloor()].grid[getThirdFloorY()][getThirdFloorX()];
        drawPath(start_st, start, end, false, true, ani);

        $(showBuilding()).append(strMessageHG).off("click touch").on("click touch", function () {
            initMaps(groundFloor());

            if (end_st === groundFloor()) {
                start = graph[groundFloor()].grid[getHGtoTLY()][getHGtoTLX()];
                end = graph[end_st].grid[end_y][end_x];
                drawPath(groundFloor(), start, end, false, false, ani);
            } else {
                goToFloor(groundFloor(), getHGtoTLX(), getHGtoTLY(), end_st, end_x, end_y, ani);
            }
        });
    }

    function initPathStartEnd(start_st, start_x, start_y, end_st, end_x, end_y, ani) {
        // Entferne zuvor erstellen Path
        $(".grid-box").removeClass("start end waypoint path");
        $("#stairs").hide().html('<span class="glyphicon glyphicon-circle-arrow-up" aria-hidden="true"></span>');
        $("#building").hide().html('<span class="glyphicon glyphicon-circle-arrow-up" aria-hidden="true"></span>');

        initMaps(start_st);

        var startY = start_y,
            startX = start_x,
            endX = end_x,
            endY = end_y,
            start = 0,
            end = 0;

        start = graph[start_st].grid[startY][startX];


        if (start_st === end_st) {
            //ist der Start-Stock = End-Stock -> Navigation durch das gleiche Stockwerk
            end = graph[end_st].grid[endY][endX];
            drawPath(end_st, start, end, false, false, ani);
        } else if ((start_st !== thirdFloor()) && (end_st !== thirdFloor())) {
            //wenn die Navigation im selben Gebäude ist, aber in unterschiedlichen Stockwerken!
            goToFloor(start_st, start_x, start_y, end_st, end_x, end_y, ani);
        } else if ((start_st !== thirdFloor()) && (end_st === thirdFloor())) {
            //wenn die Navigation von Hauptgebäude zu TechLab geht!
            goToTL(start_st, start_x, start_y, end_st, end_x, end_y, ani);
        } else if ((start_st === thirdFloor()) && ((end_st === groundFloor()) || (end_st === firstFloor()) || (end_st === secondFloor()))) {
            //wenn die Navigation von Techlab zu Hauptgebäude geht!
            goToHG(start_st, start_x, start_y, end_st, end_x, end_y, ani);
        }
    }

    function searchEndpoint(start_res, end_res) {
        var aniBool = true;


        initPathStartEnd(start_res[0], start_res[1], start_res[2], end_res[0], end_res[1], end_res[2], aniBool);
    }

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
        startRes = '0,5,15'; // Haupteingang

        for (i = 0; i < startSelect.options.length; i = i + 1) {
            optStart = startSelect.options[i];

            if (optStart.value === startRes) {
                optStart.selected = true;
            } else {
                optStart.selected = false;
            }
        }

        endSelect = document.getElementById(endID);
        endRes = '0,5,15'; // Haupteingang

        for (j = 0; j < endSelect.options.length; j = j + 1) {
            optEnd = endSelect.options[j];

            if (optEnd.value === endRes) {
                optEnd.selected = true;
            } else {
                optEnd.selected = false;
            }
        }
    }

    function processData() {
        var dataListStart,
            dataListEnd,
            caption1 = '',
            caption2 = '',
            caption3 = '',
            caption4 = '',
            first = true,
            rowNr = 0,
            level = '';

        dataListStart = document.getElementById("room-list-start-e");
        dataListEnd = document.getElementById("room-list-end-e");
        dataListStart.innerHTML += '<option value="">Wählen oder Nummer eingeben</option>';
        dataListEnd.innerHTML += '<option value="">Wählen oder Nummer eingeben</option>';

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
    }

    function checkStartAndEnd(ev) {
        var startPoint, endPoint, animation, strUndefined = "undefined,undefined,undefined",
            strHTML;


        startPoint = document.getElementById("room-list-start-e").value;
        endPoint = document.getElementById("room-list-end-e").value;
        //animation = document.getElementById("animation");


        if (startPoint === strUndefined && endPoint === strUndefined) {
            alert("ACHTUNG! Du hast weder den Startraum noch den Zielraum ausgewählt!");
        } else if (startPoint === strUndefined) {
            alert("ACHTUNG! Du hast keinen Startraum ausgewählt!");
        } else if (endPoint === strUndefined) {
            alert("ACTUNG! Du hast keinen Zielraum ausgewählt!");
        } else if (startPoint === endPoint) {
            alert("Der Start- und Zielraum sind ident! Bitte zwei unterschiedliche Räume wählen!");
        } else {
            searchEndpoint(startPoint.split(delimiterComma()), endPoint.split(delimiterComma()));
        }
    }

    var init = function () {

        var btnSearchE = $('#btnSearchE');
        btnSearchE.on('click touchend', checkStartAndEnd)
        processData();
        initMaps(groundFloor());
        // selectize initialisieren

        selecteStart = $('#room-list-start-e');
        selectStart.selectize();
        selectEnd = $('#room-list-end-e');
        selectEnd.selectize();
    }

    init();
    return {
        search: searchEndpoint
    };
}