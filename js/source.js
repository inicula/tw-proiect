var page404d = 0

var ctime = setInterval(ctime_func, 1000);
function ctime_func() {
        if(page404d == 0)
        {
            var d = new Date();
            document.getElementById("cdate").innerHTML = d.toLocaleTimeString();
        }
}

localStorage.setItem("subcount", 0);
localStorage.setItem("answers", JSON.stringify([]));

function validateForm1()
{
        var str = document.forms["tark_form"]["tark_death"].value;
        var storedans = JSON.parse(localStorage.getItem("answers"));

        console.log("Raspunsurile precedente:")
        for(var i = 0; i < storedans.length; i++)
        {
                console.log(storedans[i]);
        }

        storedans.push(str);
        localStorage.setItem("answers", JSON.stringify(storedans));

        const newresp = {
                contents: str
        }

        $.post({
                url:"http://localhost:3000/formresponses",
                data: newresp
        })

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

function highlight_contact(evt) {
        evt.target.style.color = 'red';
}

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

                p1.addEventListener('click', highlight_contact, false);
                p2.addEventListener('click', highlight_contact, false);

                const currentp = document.getElementById("end");
                document.body.insertBefore(p2, currentp.nextSibling);
                document.body.insertBefore(p1, currentp.nextSibling);

                contact_shown = 1;
        }
}

function get_p_info()
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
        if(dfilms.includes(fname))
        {
                alert("Correct. Dreyer directed " + fname.toUpperCase());
        }
        else
        {
                alert("False. Dreyer did not direct a film named " + fname.toUpperCase());
        }
        return false;
}

var colors = ["yellow", "blue", "white"];

document.addEventListener('keydown', (event) => {
        var path = window.location.pathname;
        var page = path.split("/").pop();
        if(page != "tarkovsky.html")
        {
                return false;
        }

  if (event.keyCode == 65) {
          setTimeout(function(){
          document.getElementById("svsealanim").style.border="1px solid " + 
                                             colors[Math.floor((Math.random() * 3))]},
                    1000);
  }
}, false);

function get_prev_responses()
{
        var presponses = [];

        $.get({
                url:"http://localhost:3000/formresponses"
        })
        .done((resp)=>{
                presponses = resp;
        })
        .then(()=>{
                console.log(presponses);
        })
}

function try_get() {
    const thepath = "http://localhost:3000/formresponses/dreyer";

    $.ajax({
        type: "GET",
        url: thepath,
        statusCode: {
            200: function() {
                console.log("success");
            },
            404: function() {
                page404d = 1;
                document.body.innerHTML = "404: FAILED TO ACCESS " + thepath;
            }
        }
    })
}

function hide_correct_answers() {
    const hide_c_resp = {
        contents: "correct answer hidden"
    }

    $.ajax({
        type: "PUT",
        url:"http://localhost:3000?contents=" + "1986",
        data: hide_c_resp
    })
}

function delete_correct_answers() {
    var cresp = "1986";

    $.ajax({
        type: "DELETE",
        url:"http://localhost:3000?contents=" + cresp
    })
}
