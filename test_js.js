        let compteur=0,countdown=3,interval2=null,interval3,m=0,s=0,ms=0;
        const btn = document.getElementById("btn");      
        const gg = document.getElementById("felicitation");  
        const minuteur=document.getElementById("temps");
        const triche=document.getElementById("triche");
        const replay=document.getElementById("rejouer");
        const d1 = (e)=> btnMove(e,1);
        const d2 = (e)=> btnMove(e,2);

        function codeMinuteur() {
            minuteur.style.cssText = "min-width:100px;min-height:30px;border-radius:10px;";
            interval3 =setInterval(() => {
                ms+=10;if (ms>1000) {
                    ms=0;
                    s++;
                }
                if (s>60) {
                    s=0;
                    m++;
                }
           minuteur.textContent=`${m}:${s}:${ms}`; },10)

        }
        
        function fcountdown() {
            btn.disabled =true;
            btn.textContent = "ATTENTION";
            let interval=setInterval(function(){
                btn.textContent = countdown;
                countdown--;
                if (countdown<0){
                    clearInterval(interval);
                    btn.textContent = "GO !";
                    btn.disabled=false;}},1000)
            setTimeout(function(){btn.style="width:20em;height: 10em;"},3000);
            setTimeout(function(){document.querySelector('h3').classList.add("hidden")},2000);
            setTimeout(function(){document.querySelector('h3').classList.add("noDisp")},3000);
        }
        
        function dist(x1,x2,y1,y2) {
                    return Math.sqrt(Math.pow(x1-x2,2)+(Math.pow(y1-y2,2)))
        }
         
        function btnMove(e,d) {
                let XEcran=window.innerWidth;
                let YEcran=window.innerHeight;
                let XSouris=e.clientX;
                let YSouris=e.clientY;
                let btnRect=btn.getBoundingClientRect();
                let Xbtn=btnRect.left + btnRect.width/2;
                let Ybtn=btnRect.top + btnRect.height/2;
                let distance = dist(XSouris,Xbtn,YSouris,Ybtn);
                let XbtnNew,YbtnNew;
                if (d===1 && distance<150) {
                    let deltaX=Xbtn-XSouris;
                    let deltaY=Ybtn-YSouris;
                    let speedFactor = Math.max(0.2, (150 - distance) / 150);
                    XbtnNew=btnRect.left + deltaX*speedFactor;
                    YbtnNew=btnRect.top + deltaY*speedFactor;
                    btn.style.left = `${XbtnNew}px`;
                    btn.style.top = `${YbtnNew}px`;
                }
                if (d===2 && distance<100) tailleEcran(150,70);
                if (XbtnNew+btnRect.width>XEcran) XbtnNew=XEcran-btnRect.width;
                if (XbtnNew < 0) XbtnNew = 0;
                if (YbtnNew + btnRect.height > YEcran) YbtnNew=YEcran-btnRect.height;
                if (YbtnNew < 0) YbtnNew = 0;
                btn.style.left = `${XbtnNew}px`;
                btn.style.top = `${YbtnNew}px`;
                btn.style.position = "absolute"; 
        }

        function tailleEcran(x,y) {
            let XEcran=window.innerWidth;
            let YEcran=window.innerHeight;
            const randomX = Math.random() * (XEcran - x);
            const randomY = Math.random() * (YEcran - y);
            let styles = `position:absolute;left:${randomX}px;top:${randomY}px;width:${x}px;height:${y}px;`;
            if (x<100 && y<50) {
                styles+=`box-shadow: -8px 8px gray`;
            };
            btn.style.cssText = styles;
        }

        function ajout() {
            if (compteur===0 && countdown >0){
                    fcountdown();
                }
            
            else if (compteur<99){
            console.log("jee marche");
            compteur++;
            btn.textContent = compteur;}
            else {
                congratulation();
            }
        }
        
        function conditionCompteur() {
            // le faire en switch case
            if (compteur<20 && compteur>10) {
                btn.style="width:80px;height: 30px;transition:0.2s;";
            }
            else if (compteur<40 && compteur>=20) {
                tailleEcran(150,80);
            }
            else if (compteur<60 && compteur>=40) {
                tailleEcran(70,25);
            }
            else if (compteur<80 && compteur>=60 && interval2===null ) {
                interval2=setInterval(() => tailleEcran(150,80),800);
            }        
            else if (compteur<90 && compteur>=80) {
                clearInterval(interval2);
                interval2=null;
                document.addEventListener("mousemove", d1);
            }   
            else if (compteur<100 && compteur>=90) {
                document.removeEventListener("mousemove", d1);
                clearInterval(interval2);
                interval2=null;
                document.addEventListener("mousemove",d2);
            }
            else if (compteur===100) {
                congratulation();
            }    
            
        }

        function congratulation() {
            document.removeEventListener("mousemove", d1);
            document.removeEventListener("mousemove",d2);
            clearInterval(interval2);
            interval2=null;
            btn.removeEventListener("click", demmare);
            btn.classList.add("noDisp");
            gg.classList.remove("noDisp");
            gg.textContent=`WOOWOWWWOOWOWOWOW 100 IMPRESSIONANT GG en seulement ${m} minute et ${s} secondes !!!`;
            replay.classList.remove("noDisp");
            minuteur.classList.remove("hidden","noDisp");
            clearInterval(interval3);
        }

        function replayFonct() {
            compteur=0,m=0;s=0;ms=0;
            btn.classList.remove("noDisp");
            replay.classList.add("noDisp");
            gg.classList.add("noDisp");
            btn.textContent=compteur;
            goMinuteur();
            eventListeners();
        }

        function demmare() {
            ajout();
            conditionCompteur();
        }

        function goMinuteur() {
            let intervalMinuteur=setInterval(() => {
            if (compteur>0) {
            codeMinuteur();
            clearInterval(intervalMinuteur);
            setTimeout(() => {
                minuteur.classList.add("hidden");
            }, 5000);
            setTimeout(() => {
                minuteur.classList.add("noDisp");
            }, 7000);
        }
        }, 100);
        }
        
        function eventListeners() {
            btn.addEventListener("click", demmare);
            btn.addEventListener("keydown", function(event) {
                console.log("keydown");
                if (event.key === "Enter" || event.key === " " || event.keyCode === 32) {
                    event.preventDefault();}});
            triche.addEventListener("keydown", ajout);
            replay.addEventListener("click",replayFonct);
        }
        goMinuteur();
        eventListeners();
        