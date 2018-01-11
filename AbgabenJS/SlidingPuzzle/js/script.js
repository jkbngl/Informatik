var anzahlVersuche = 0;
var context = document.getElementById('puzzle').getContext('2d');   // Auf den Canvas soll ein 2D Objekt dargestellt werden
var img = new Image();                                              // Das 2D Objekt ist ein Bild
img.src = './img/feld.jpg';                                         // Pfad zum Bild
img.addEventListener('load', drawTiles, false);                     // Sichergehen dass das Bild richtig dargestellt wird

var solved = false;

var boardSize = document.getElementById('puzzle').width;
var tileCount = 3;

var tileSize = boardSize / 3;                                       // Größe der einzelnen Teile des Bildes bestimmen

var clickLoc = new Object;                                          // Wo klickt der User hin
clickLoc.x = 0;                                                     // X-Koordinate davon
clickLoc.y = 0;                                                     // Y-Koordinate davon

var emptyLoc = new Object;
emptyLoc.x = 0;
emptyLoc.y = 0;

var boardParts;                                                      
setBoard();                                                         // Flaeche auf dem das Bild hinkommt erstellen


document.getElementById('puzzle').onclick = function(e)             // Neu berechnung wenn der User klickt
{
    clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
    clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
    
    if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) 
    {
        anzahlVersuche++;
        document.getElementById("p1").innerHTML = "Anzahl Klicks: " + anzahlVersuche;
        
        slideTile(emptyLoc, clickLoc);
        drawTiles();
    }
    if (solved)
    {
        setTimeout(function()
        {
            alert("Puzzle geloest!");
        }, 500);
    }
};

function setBoard()                                                 // Setzen der einzelnen Teile im Feld
{
    boardParts = new Array(tileCount);
    for (var i = 0; i < tileCount; ++i) 
    {
        boardParts[i] = new Array(tileCount);
        
        for (var j = 0; j < tileCount; ++j) 
        {
            boardParts[i][j] = new Object;
            boardParts[i][j].x = (tileCount - 1) - i;
            boardParts[i][j].y = (tileCount - 1) - j;
        }
    }
    
    emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
    emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
    solved = false;
}

function drawTiles()                                                // Wenn der Klick ok ist und das Teil bewegt werden kann, das Teil bewegen
{
  context.clearRect ( 0 , 0 , boardSize , boardSize );

    for (var i = 0; i < tileCount; ++i) 
    {
        for (var j = 0; j < tileCount; ++j) 
        {
            var x = boardParts[i][j].x;
            var y = boardParts[i][j].y;
            
            if(i != emptyLoc.x || j != emptyLoc.y || solved == true) 
            {
                context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize, i * tileSize, j * tileSize, tileSize, tileSize);
            }
        }
    }
}

function distance(x1, y1, x2, y2)                                   // Kontrolliert ob das Teil bewegt werden kann
{
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function slideTile(toLoc, fromLoc) 
{
    if (!solved) 
    {
        boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
        boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
        boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
        boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
        toLoc.x = fromLoc.x;
        toLoc.y = fromLoc.y;
        checkSolved();
    }
}

function checkSolved() 
{
    var flag = true;
    
    for(var i = 0; i < tileCount; ++i) 
    {
        for(var j = 0; j < tileCount; ++j) 
        {
            if(boardParts[i][j].x != i || boardParts[i][j].y != j) 
            {
                flag = false;
            }
        }
    }
    
    solved = flag;
}