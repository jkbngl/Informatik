function myFunction() 
{
    var stunde = document.getElementById("hour").value;
    var minute = document.getElementById("minute").value;
    
    if(minute < 30)
    {
         minute = 0;
    }   
    else if(minute >= 30 && minute < 60)
    {
         minute = 30;
    }   
    
    if(stunde > 23 || minute >= 60)
    {
        alert("Falsche Eingabe");
    }  
    else
    {
        playsound(stunde, minute);
    }
}

function ring(stunde, minute)
{
    // alert("Stunde: " + stunde + "\nMinute: " + minute);
    
    if(stunde % 4 == 0 && minute == 0)
        return("8");
    else if(stunde % 4 == 0 && minute == 30)
        return("1");
    else if(stunde % 4 == 1 && minute == 0)
        return("2");
    else if(stunde % 4 == 1 && minute == 30)
        return("3");
    else if(stunde % 4 == 2 && minute == 0)
        return("4");
    else if(stunde % 4 == 2 && minute == 30)
        return("5");
    else if(stunde % 4 == 3 && minute == 0)
        return("6");
    else if(stunde % 4 == 3 && minute == 30)
        return("7");
}

function playsound(stunde, minute)
{
    var n = ring(stunde, minute);
    
    var doppel = n / 2;
    var einzel = n % 2;
    
    // alert("Doppelschlaege: " + parseInt(doppel) + "\nEinzelschlaege: " + parseInt(einzel));
	
	document.getElementById("p1").innerHTML = "Ausgabe: <br>------------------------<br>" + "Doppelschlaege: " + parseInt(doppel) + "\nEinzelschlaege: " + parseInt(einzel) + "<br>------------------------";
}

