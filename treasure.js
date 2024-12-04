j = 0; 
oc = 0; 
tc = 0; 
rc = 0; 

hero = 0; //initial hero
herOLocation = 0; //hero location
IDstore = new Array;  //implicit decleration
obsTAcle = new Array; //implicit decleration for obstacles
treASUre = new Array; //implicit decleration for tressure
roBOTKIller = new Array; //implicit decleration for robot killer
arrouNDRObot = new Array;//find the space arround the robot killer

round=0;//record round
score=0;//record the score for hero
setupGame=false;
playGame=false;
endGame=false;

function findINrarray(var1,var2){ //find variable var2 in array var1 and return the index of the desired value
    var count;
    for(count=0;count<var1.length;count++){
        if (var1[count]==var2) {
            break;
        }
    }
    return count;
}

function setATTRibute(var1,var2,var3){ //create an object: hero, treassure, obstacle or killing robot
    var img=document.createElement("img");
    img.setAttribute("id",var1);
    img.setAttribute("src",var1+".png");
    img.setAttribute("height","48");
    img.setAttribute("width","48");
    var2.appendChild(img);
    IDstore[j]=var3;//put the id of the object into the array named IDstore.
    j++;//total length of the IDstore plus 1
}

function creaTEOBstacle (var1,var2){//create an obstacle
    setATTRibute("obstacle",var1,var2);
    obsTAcle[oc] = var2;  
    oc++;  //total number of the obstacle counter plus one
}

function creaTEHEro (var1,var2){//create a hero
    setATTRibute("hero",var1,var2);
    herOLocation = var2;
    hero = 1;                  //set hero status to 1 (0 means no hero and 1 means hero exist)
}

function creaTETRessure (var1,var2,var3){
    setATTRibute("treasure",var1,var2);
    treASUre[tc] = var2; //store the ID number of the treassure into array
    treASUre[tc+1] = var3;//store the level of (money+200) into the next position 
    tc+=2;
}

function creaTERObot (var1,var2){
    setATTRibute("robot",var1,var2);
    roBOTKIller[rc] = var2;
    rc++;    //Each space
}

function deletATTRibute(var1){ //delete an object: hero, obstacle, treassure or killing robot
    var picture = document.getElementById(var1);//delete relevent picture
    picture.removeChild(picture.childNodes[0]);//delete the child node
    var count = findINrarray(IDstore,var1);//obtain the index of the desired value from the array
    IDstore.splice(count,1);//delete the correspoding element inside the array
    j--;//total length of the IDstore array minus 1
}

function deleTEOBstacle (var1,var2){//delete an obstacle
    deletATTRibute(var1);
    obsTAcle.splice(var2,1);     //delete the id which stored in the obsTAcle array
    oc--; //length of the obstacle array minus 1
}

function deleTEHEro(var1){
    deletATTRibute(var1);      //delete hero
    hero = 0;                 //set hero status back to 0
}

function deleTETRessure (var1,var2){
    deletATTRibute(var1);
    treASUre.splice(var2,2);     
    tc = tc-2;     //delete both the treassure and the value of the treassure
}

function deleTERObot(var1,var2){
    deletATTRibute(var1);
    roBOTKIller.splice(var2,1);
    rc--;
}

function endgame(){
    endGame = confirm("结束游戏?");
    if (endGame) {
        endOFgame();
        displayHighScore();
    }
}

function endOFgame(){//terminal the game
    if (endGame) {
        playGame=false;   
        var rl = roBOTKIller.length, tl = treASUre.length, ol = obsTAcle.length;
        for(a1=0; a1 < rl ;a1++){ //delete all robot
        deleTERObot(roBOTKIller[0],0);
        }
        if (hero==1) {//delete hero
        deleTEHEro(herOLocation);
        }
        for(a2=0;a2<tl; a2+=2){   //delete all treassure
        deleTETRessure(treASUre[0],0);
        }
        for(a3=0;a3<ol;a3++){  //delete all obstacle
        deleTEOBstacle(obsTAcle[0],0);
        }
        setupGame=false;
        playGame=false;
    }
}

function decision(var1){//var1 is the ID number of the next position where hero intended to move
    var count = findINrarray(IDstore,var1);  //decide whether that location contains an object or not 
    if (count == IDstore.length) {           //means no object in that position
        deleTEHEro(herOLocation);            //delete hero in current location
        creaTEHEro(document.getElementById(var1),var1);//create hero in var1
    }
    else{//if cell contains an object
        var count1 = findINrarray(obsTAcle,var1); //try to find whether the object is an obstacle or not
        if (count1 == obsTAcle.length) {//if not an obstacle
            var count2 = findINrarray(treASUre,var1);//find whether the object is treassure or not
            if (count2 != treASUre.length) { //if treassure
                levelOFtreassure0 = treASUre[count2+1]-200; //subtract the level of the treassure from the array
                score+=levelOFtreassure0;   
                deleTETRessure(var1,count2);    //delete treassure
                deleTEHEro(herOLocation);       //delete hero in current location
                creaTEHEro(document.getElementById(var1),var1);//create ehero in that location
                document.getElementById("scoreNum").innerHTML=score;//show the score in HTML
                updateHighScore(score);
            }
            else{//if not a treassure, then meet a robot
                alert("碰上了杀手机器人！");
                endGame=true;
                endOFgame();
                displayHighScore();
                document.getElementById("outcome").innerHTML="机器人胜利，总分为: "+score+". 总回合是: "+round;
                return;
            }
        }
        else{//if obstacle
            alert("有障碍挡住了去路");
        }
    }
}

function spaceORtreasure(var1){//find the cell arround the robot
    if (var1 == "0") {
        arrouNDRObot = [eval(var1)+eval(1),eval(var1)+eval(11),eval(var1)+eval(10)];
    }
    else if(var1 == "1"||var1=="2"||var1=="3"||var1=="4"||var1=="5"||var1=="6"||var1=="7"||var1=="8"){
        arrouNDRObot = [var1-1,eval(var1)+eval(1),eval(var1)+eval(9),eval(var1)+eval(10),eval(var1)+eval(11)];
    }
    else if (var1 == "9") {
        arrouNDRObot = [var1-1,eval(var1)+eval(9),eval(var1)+eval(10)];
    }
    else if (var1 == "10"||var1 == "20"||var1=="30"||var1=="40"||var1=="50"||var1=="60"||var1=="70"||var1=="80") {
        arrouNDRObot = [eval(var1)+eval(10),eval(var1)+eval(11),eval(var1)+eval(1),var1-9,var1-10];
    }
    else if(var1 == "19"||var1 == "29"||var1=="39"||var1=="49"||var1=="59"||var1=="69"||var1=="79"||var1=="89"){
        arrouNDRObot = [var1-10,var1-11,var1-1,eval(var1)+eval(9),eval(var1)+eval(10)];
    }
    else if(var1 == "90"){
        arrouNDRObot = [eval(var1)+eval(1),var1-9,var1-10];
    }
    else if(var1 == "99"){
        arrouNDRObot = [var1-1,var1-10,var1-11];
    }
    else if(var1 == "91"||var1=="92"||var1=="93"||var1=="94"||var1=="95"||var1=="96"||var1=="97"||var1=="98"){
        arrouNDRObot = [var1-1,eval(var1)+eval(1),var1-9,var1-10,var1-11];
    }
    else{
        arrouNDRObot = [var1-11,var1-10,var1-9,var1-1,eval(var1)+eval(1),eval(var1)+eval(9),eval(var1)+eval(10),eval(var1)+eval(11)];
    }
}

function findvacancyArroundRobot(var1){//find the vacancy cell around robot
    spaceORtreasure(var1);  //obtain the cell arround robot
    var vacancy0 = new Array;//use vacancy0 to store the vacancy arrount tobot killer
    var StringA, StringB, judge=0;
    for(c1=0;c1<arrouNDRObot.length;c1++){//subtract different value from arrouNDRObot and IDstore, the different value is the vacancy
        StringA = arrouNDRObot[c1];
        judge = 0;
        for(c2=0;c2<IDstore.length;c2++){
            StringB=IDstore[c2];
            if (StringA == StringB) {
                judge++;
            }
        }
        if (judge==0) {
            vacancy0.push(StringA.toString());
        }
    }
    arrouNDRObot = [];//reset
    return vacancy0;
}

function deciDEDIrection(var1, var2){//to get the horizontal and vertical value of the object.i.e:12->Hx=1,Hy=2
    if (var1<10) {
        Hx=0;
        Hy=var1.toString().substring(0,1);
    }
    else{
        Hx=var1.toString().substring(0,1);//subtract the tens digit
        Hy=var1.toString().substring(1);//subtract the decimal digit
    }
    if (var2<10) {
        Rx=0;
        Ry=var2.toString().substring(0,1);
    }
    else{
        Rx=var2.toString().substring(0,1);
        Ry=var2.toString().substring(1);
    }
    var direction = new Array(Hx,Hy,Rx,Ry);//create an array and store the four value
    return direction;
}

function miniDIstance(var1,var2){//var1 is robot location, var2 is hero or treasure loction
    var location = deciDEDIrection(var1,var2);//obtain the horizontal and vertical value for both hero and robot
    var distance = eval((location[0]-location[2])*(location[0]-location[2]))+eval((location[1]-location[3])*(location[1]-location[3]));//calculate the squre of the distance
    return distance;
}

function robotMEETobstacle(var1){//decide the action when robot meeting the obstacle
    var d2=0,  minimum=0;
    var vacancy = findvacancyArroundRobot(var1);//obtain the vacancy arround robot
    var miniDIStance = new Array;
    for(var d1=0;d1<vacancy.length;d1++){//store the distance between each vacancy and the hero
        miniDIStance[d1]=miniDIstance(vacancy[d1],herOLocation);
    }
    for(d2 = 1; d2<miniDIStance.length;d2++){//find the smallest distance and record the index into minimum
        if (miniDIStance[d2]<miniDIStance[minimum]) {
            minimum=d2;
        }
    }
    RoboTDEcision(vacancy[minimum],var1);//robot move to the vacancy which is cloest to the hero 
}

function heroORtreassue(var1){//decide to move to hero or the surronding treassure
    var move=0, c=0; 
    var treTOrobot = new Array;//
    spaceORtreasure(var1);//find the surronding cells of the robot
    var count = findINrarray(arrouNDRObot,herOLocation);//decide whether hero locate at the surronding cell
    for (var a = 0; a<arrouNDRObot.length;a++){//decide whether the surronding contains a treasure
        for(var b = 0; b<treASUre.length;b++){
            if (arrouNDRObot[a]==treASUre[b]) {
                treTOrobot[c]=arrouNDRObot[a];
                ++c;
            }
        }
    }
    if ((treTOrobot.length==0) || (count != arrouNDRObot.length)) {//if there is no treassure or hero at surronding cell
        move = herOLocation;//move to the hero
    }
    else{//if there is treassure at the surronding cell
        move = treTOrobot[0];//move to one of the vacancy
    }
    arrouNDRObot=[];//reset
    return move;
}

function RoboTDEcision(var61,var63){//var61 is the location for next cell, var63 is robot ID
    var count0, count1, count2;
    if (var61 >= 0) {
        var count0 = findINrarray(IDstore,var61);//find whether there is an obstacle in that cell
        if (count0 == IDstore.length) {//No object contained in that cell
            deleTERObot(var63); //delete current location
            creaTERObot(document.getElementById(var61),var61);//create another location in that cell
        }
        else{//if there is an obstacle
            var count1 = findINrarray(obsTAcle,var61);//find whether that object is an obstacle or not
            if (count1==obsTAcle.length) {//if not an obstcale
             var count2 = findINrarray(treASUre,var61);//find whether that object is a treassure or not
                    if (count2 != treASUre.length) {//if treassure
                            deleTETRessure(var61,count2);    //delete treassure
                            deleTERObot(var63); //delete robot
                            creaTERObot(document.getElementById(var61),var61);//create robot in that cell
                        }
                    else{
                        if(var61 == herOLocation){//if the location is hero
                            alert("Hero已经死亡!");//kill hero
                            document.getElementById("outcome").innerHTML="机器人赢了: "+score+". 总回合是: "+round;
                            endGame=true;
                            endOFgame();//end game
                            displayHighScore();
                            return;
                        }
                        else{//robot meet the other robot killer
                        robotMEETobstacle(var63);
                        }
                    }
                }
                else{
                    robotMEETobstacle(var63);
                }
            }
        }    
}

function robotMOVEornot(){//decide whether the robot can move or not
    var move = 0,c;       //If all robot cannot move, then return 0, and if at least one robot can move, return 1
    if (roBOTKIller.length==0) {//if there is no robot, return 
        move = 1;
    }
    else{//if there is one robot or hero can move, return 1
        for(c=0;c<roBOTKIller.length;c++){
            var vacancy = findvacancyArroundRobot(roBOTKIller[c]);
            if (vacancy.length !=0) {
                move = 1;
                break;}
            }
        }
        return move;
}

function robotGOorNOt(var2){//decide whether an robot have a space to go or change to another robot
    var a=0;
    var b = findINrarray(roBOTKIller,var2);//b is the index from the robotkiller array.
    var var1 = var2;
    while(1){
        var judge = 0;
        var vacancy = findvacancyArroundRobot(var1);//obtain the vacancy arround robot
    if (vacancy.length != 0) {//prove that there is vacancy
        judge = 1;
    }
    else{
        a=findINrarray(roBOTKIller,var2);
        var change2 = roBOTKIller[a+1];
        roBOTKIller.splice(a+1,1);//substitude the two values
        roBOTKIller.splice(b,0,change2);//change the position of two value inside the array
        var1=change2;
    }
    if (judge == 1) {break;}
    }
}

function robotDISTANCE(robotlocation,location){  //judgement of the distance between hero and killing robot
    var move, sIGn; //move is the return value, sIGn is to determine the direction of the movement
    var location1 = deciDEDIrection(robotlocation,location); //obtain the Hx,Hy, Rx, Ry
    var Hx = location1[2], Hy=location1[3], Rx=location1[0], Ry=location1[1];
    if (Rx==Hx) {
        sIGn = Ry-Hy;//decide the derection
        if (sIGn > 0) {
            move = -1;
        }
        else{
            move = 1;
        }
    }
        else if (Ry==Hy) {
            sIGn = Rx-Hx;
            if (sIGn>0) {
                move = -10;
            }
            else{
                move = 10;
            }
        }
        else if (Rx<Hx && Ry<Hy) {
            move = 11;//upper left
        }
        else if(Rx<Hx && Ry>Hy){
            move = 9;//lower right
        }
        else if(Rx>Hx && Ry<Hy){
            move = -9;//lower left
        }
        else if (Rx>Hx && Ry>Hy) {
            move = -11;//upper left
        }
        return move;
}
// Hero的移动
document.onkeydown=function(event){//detect the key pressing event
    if (playGame) {
        if (treASUre.length==0) {//detect whether there is treassure left or not
            alert("宝箱已经被拿完!");
            document.getElementById("outcome").innerHTML="Heo胜利， 总分是: "+score+". 总回合是: "+round;
            endGame=true;
            endOFgame();
            displayHighScore();
            return;
        }     
        var difference = 0;//temporally store the next cell where the hero intend to go
        var choose = (event||window.event).keyCode;//store the key code from the pressing key event
        if ((choose != 65)&&(choose !=87)&&(choose != 68)&&(choose != 83)) {//alert
            alert("输入错误");
        }
        else{
            round++;
            document.getElementById("roundNum").innerHTML=round;
            switch(choose){
                case 65://if user pressed a
                for(a1 = 0; a1 < 100; a1+=10){//detect whether hero locate at the left edge
                   if (a1 == herOLocation) {
                      break;
                  }
              }
              if (a1 == 100) {//if not at the left edge, move to that location
                difference = herOLocation - 1;
                decision(difference);
            }
            else{//if locat at the left edge, alert user.
                alert("还没有穿墙的技能");
            }
            break;

            case 87://if user pressed a w
            difference = herOLocation - 10;
            if (difference>=0) {
                decision(difference);
            }
            else{alert("还没有穿墙的技能");}
            break;

            case 68://if user pressed an d
            for(a1 = 9; a1 < 109; a1+=10){//detect whether hero locate at the righ edge
               if (a1 == herOLocation) {
                   break;
               }
           }
           if (a1 == 109) {
            difference = eval(herOLocation)+eval(1);
            decision(difference);
        }
        else{
            alert("还没有穿墙的技能");
        }
        break;

        case 83://if user pressed an x
        difference = eval(herOLocation) + eval(10);
        if (difference<100) {//decide whether the hero out of bound
            decision(difference);
        }
        else{
            alert("还没有穿墙的技能");
        }
        break;
    }
          }
        if (treASUre.length==0) {//detect treassure information after each hero's move
            alert("宝箱已被全部拿走!");
            document.getElementById("outcome").innerHTML="Hero胜利，总分是: "+score+". 总回合数是: "+round;
            endGame=true;
            endOFgame();
            displayHighScore();
            return;
        }     
        document.getElementById("turn").innerHTML = "Killer's turn";
        if (robotMOVEornot()==0) {//if robot or hero cannot move
            alert("机器人不能移动");
            document.getElementById("outcome").innerHTML="总分是: "+score+". 总回合数是: "+round;
            endGame=true;
            endOFgame();
            displayHighScore();
            return;
        }
        for(counter1=0; counter1 < rc ;counter1++){//killers turn
                robotGOorNOt(roBOTKIller[0]);//decide which robot go first
                var difference1 = eval(robotDISTANCE(roBOTKIller[0],heroORtreassue(roBOTKIller[0])))+eval(roBOTKIller[0]);
                RoboTDEcision(difference1, roBOTKIller[0]);
        }
        document.getElementById("turn").innerHTML = "hero's turn";
    }
}

function play(){
    if (hero==0) {//determine whether user put a hero or not, if not remain in setup stages, otherwise proceed to play
        alert("hero未上场");
        return;
    }
    if (treASUre.length==0) {//To satisfy th requirement, no treassure means hero win
        alert("没有剩余的宝箱，Hero胜利");
        document.getElementById("outcome").innerHTML="Hero 赢了，总分是: "+score+". 总回合数是: "+round;
        endGame=true;
        endOFgame();
        displayHighScore();
        return;
    }
    var confirmPlay=confirm("结束布置并开始游戏吗？");
    if (confirmPlay) {//play stage
        setupGame=false;
        playGame=true;
        displayHighScore();
    }
}

function setup(){//set up game
    round=0;
    score=0;
    var confirmSetup=confirm("开始布置？");
    if (confirmSetup) {//set several public variables
        setupGame=true;  
        document.getElementById("roundNum").innerHTML=round;
        document.getElementById("scoreNum").innerHTML=score;
        document.getElementById("turn").innerHTML="";
        document.getElementById("outcome").innerHTML="";
        input(id);
    }
}

function input(id){ 
    if (setupGame) {
        var x = document.getElementById(id);
        var count = findINrarray(IDstore,id);
        while(1){
            var InputValue=prompt("开始布置：hero(h),障碍(o),宝箱([1-9]),猎人机器(k)", "");
            if(InputValue== "h"||InputValue=="k"||InputValue=="o"||InputValue=="1"||InputValue=="2"||InputValue=="3"||InputValue=="4"||InputValue=="5"||InputValue=="6"||InputValue=="7"||InputValue=="8"||InputValue=="9"){
                break;
            }
            else{
                alert("输入有误，请重新输入");
            }
        }
        if (count!=IDstore.length) {
            alert("只能放一个");
        }
        else{
            if (InputValue=="o") {
                creaTEOBstacle(x,id);
            }
            else if(InputValue=="h"){
                if (hero==0) {
                    creaTEHEro(x,id);
                }
                else{
                    alert("你已经布置了hero");
                }
            }
            else if (InputValue=="k") {
                creaTERObot(x,id);
            }
            else{
                leVEl = eval(InputValue)+eval("200");
                creaTETRessure(x,id,leVEl);
            }
        }
    }
}



// 函数来更新最高分数
function updateHighScore(score) {
  var highScore = localStorage.getItem('highScore'); // 从LocalStorage获取最高分数
  highScore = highScore ? parseInt(highScore) : 0; // 如果没有最高分数，则初始化为0
  if (score > highScore) {
    localStorage.setItem('highScore', score); // 更新LocalStorage中的最高分数
  }
}

// 函数来获取最高分数
function getHighScore() {
  return localStorage.getItem('highScore'); // 如果没有最高分数，则返回0
}

// 在游戏开始时调用此函数来显示最高分数
function displayHighScore() {
  var highScore = getHighScore();
  // 使用元素来显示最高分数
  document.getElementById('highScoreDisplay').textContent = '最高分数: ' + highScore;
}

// 在游戏结束时调用此函数来保存分数
function saveScore() {
  updateHighScore(currentScore);
}

// 在页面加载时显示最高分数
window.onload = function() {
  displayHighScore();
};
