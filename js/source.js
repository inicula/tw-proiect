function validateForm1()
{
        var str = document.forms["tark_form"]["tark_death"].value;
        var reg = new RegExp("^.*1986.*$");
        if (reg.test(str))
        {
                alert("Correct answer.");
        }
        else
        {
                alert("False answer.");
        }
        document.forms["tark_form"]["tark_death"].value = "";
        return false;
}


function validateForm2()
{
        var str = document.forms["dreyer_form"]["dreyer_birth"].value;
        var reg = new RegExp("^.*1889.*$");
        if (reg.test(str))
        {
                alert("Correct answer.");
        }
        else
        {
                alert("False answer.");
        }
        document.forms["dreyer_form"]["dreyer_birth"].value = "";
        return false;
}

function delete_quiz_boxes()
{
        var elements = document.getElementsByClassName("quizbox")
        while(elements.length > 0)
        {
                elements[0].parentNode.removeChild(elements[0]);
        }
}

var contact_shown = 0;

function get_contact_info()
{
        if(contact_shown == 0)
        {
                const p1 = document.createElement("p");
                const p2 = document.createElement("p");
        
                const t1 = document.createTextNode("Email: niculaionut@tutanota.com");
                const t2 = document.createTextNode("Github handle: niculaionut");
        
                p1.appendChild(t1);
                p2.appendChild(t2);
        
                const currentp = document.getElementById("end");
                document.body.insertBefore(p2, currentp.nextSibling);
                document.body.insertBefore(p1, currentp.nextSibling);

                contact_shown = 1;
        }
}

function get_body_info()
{
        let para = document.querySelector('p');
        let cstyle = window.getComputedStyle(para);
        alert("Font size is " + 
              cstyle.getPropertyValue("font-size") +
              ".\nFont family is " + 
              cstyle.getPropertyValue("font-family") +
              ".\n");
}

var tfilms = ["Stalker", "Mirror", "Andrei Rublev"];
var dfilms = ["Ordet", "The Passion of Joan of Arc"];

function validate_tfilm()
{
        fname = document.forms["tfilm_form"]["filmname"].value;
        if(tfilms.includes(fname))
        {
                alert("Correct. Tarkovsky directed " + fname.toUpperCase());
        }
        else
        {
                alert("False. Tarkovsky did not direct a film named " + fname.toUpperCase());
        }
        return false;
}


function validate_dfilm()
{
        fname = document.forms["dfilm_form"]["filmname"].value;
        if(tfilms.includes(fname))
        {
                alert("Correct. Dreyer directed " + fname.toUpperCase());
        }
        else
        {
                alert("False. Dreyer did not direct a film named " + fname.toUpperCase());
        }
        return false;
}
