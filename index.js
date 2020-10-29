window.onload = function () {
      "use strict";

      function _s(x) {
            return document.getElementById(x);
      }

      var vw = window.innerWidth || 360;
      var vh = window.innerHeight || 560;

      var w = (vw > 400) ? 400 : vw;
      var h = (vh > 700) ? 700 : vh;

      var ll = (vw - w) / 2;
      var wrong = 0;

      var totalCoin = getCookie("data").coins;
      var bonusCoin = 0;
      _s("container").style.backgroundImage = "url(https://bdsports.000webhostapp.com/wsnd/9.jpg)";
      var coinElm = _s("coin");
      var nextBtn = _s("nextBtn");
      var completeDiv = _s("over");
      var levelDiv = _s("levelDiv");
      var myDomain = "https://bdsports.000webhostapp.com/";
      var canPlay = false;
      var sounds = {
            "levelComplete": new Audio(),
            "levelStart": new Audio(),
            "right": new Audio(),
            "wrong": new Audio(),
            "select": new Audio(),
            "shuffle": new Audio(),
            "extraWord": new Audio()
      }

      sounds.levelComplete.src = myDomain + "wsnd/level_complete.mp3";
      sounds.levelStart.src = myDomain + "wsnd/level_start.mp3";
      sounds.right.src = myDomain + "wsnd/right.mp3";
      sounds.wrong.src = myDomain + "wsnd/wrong.mp3";
      sounds.select.src = myDomain + "wsnd/select.mp3";
      sounds.shuffle.src = myDomain + "wsnd/shuffle.ogg";
      sounds.extraWord.src = myDomain + "wsnd/extra_word.ogg";
      function play(x) {
            if (canPlay) {
                  try {
                        if (sounds[x].paused) {
                              sounds[x].play().catch(function (err) { });
                        }
                        else {
                              sounds[x].currentTime = 0;
                        }
                  }
                  catch (err) {
                        //alert(err);
                  }
            }
      }

      var starCnt = _s("starCnt");
      var compl = _s("complete");
      var nextBtnCnt = _s("nextBtnCnt");
      checkCookie()
      function ShowInfo(params) {
            _s("start-info").style.display = "block"
            _s("st").style.display = "none";
            if (window.innerWidth >= 768) {
                  _s("btn-info-ok").style.display = "none"
                  startPlay()
            }

      }
      function HideInfo(params) {
            _s("start-info").style.display = "none"
            startPlay()
      }
      function startPlay() {
            levelBtn.style.display = "inline-block";
            //lContainer.style.transform = "scale(1)";
            nextBtn.style.display = "inline-block";
            //startLevel(0);
            levelCnt.style.display = "block";
            starCnt.style.display = "none";
            compl.style.display = "none";
            levelBack.style.display = "none";
            nextBtnCnt.style.display = "none";
            // levelDiv.style.transform = "translateY(0)";
            canPlay = true;
            for (var x in sounds) {
                  try {
                        sounds[x].play().catch(function (err) { });
                  }
                  catch (err) {
                        //alert(err);
                  }
            }
      }

      _s("st").addEventListener("click", ShowInfo);
      _s("btn-info-ok").addEventListener("click", HideInfo)
      document.querySelector(".toLevels").style.display = "none"
      var container = _s("container");
      container.style.height = h;
      container.style.width = w;
      container.style.left = ll + "px";


      var cw = 220;
      var ch = 220;
      var ct = h / 2 + (h / 2 - ch) / 2;
      var cl = (w - cw) / 2;
      var c = _s("gameContainer");
      c.height = h;
      c.width = w;
      c.left = window.innerWidth

      var ctx = c.getContext("2d");

      //ctx.fillRect(cl,ct,cw,ch);

      var shuffleBtn = _s("shuffle");
      var hintBtn = _s("hint");

      var lContainer = _s("lContainer");

      var lt = [_s("l1"), _s("l2"), _s("l3"), _s("l4"), _s("l5"), _s("l6"), _s("l7")];
      var previewTxt = _s("previewTxt");


      let letterContainerTop = window.innerWidth <= 320 ? window.innerHeight * 0.4 : window.innerHeight * 0.45
      let letterWidth = window.innerWidth <= 320 ? 42 : 400 * 0.12
      var points = [[(window.innerWidth / 2 - 20) + letterWidth, letterContainerTop + 20 + letterWidth], [50 + letterWidth + ll, letterContainerTop + 50 + letterWidth], [window.innerWidth - 50 - ll, letterContainerTop + 50 + letterWidth], [letterWidth + 10 + ll, letterContainerTop + 130 + letterWidth], [window.innerWidth - 10 - ll, letterContainerTop + 130 + letterWidth], [90 + letterWidth + ll, letterContainerTop + 250], [window.innerWidth - 90 - ll, letterContainerTop + 250]];
      var linePoints = [];
      var started = true;

      ctx.lineWidth = 9;
      ctx.strokeStyle = "blue";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      function drawLine(x, y) {
            if (linePoints[0] >= 0) {
                  ctx.clearRect(0, 0, w, h);
                  ctx.beginPath();
                  ctx.moveTo(points[linePoints[0]][0] - letterWidth / 2 - ll, points[linePoints[0]][1] - letterWidth / 2);
                  for (let n = 1; n < linePoints.length; n++) {
                        ctx.lineTo(points[linePoints[n]][0] - letterWidth / 2 - ll, points[linePoints[n]][1] - letterWidth / 2);
                  }
                  ctx.lineTo(x - ll, y);
                  ctx.stroke();
                  //letterTrans(lt[linePoints[linePoints.length-1]]);
            }
      }

      var temp1 = [];
      var temp2 = [];
      function clearLine() {
            var wordPos = levels[currentLevel][1].indexOf(currentWord);
            if (linePoints[0] >= 0) {
                  if (wordPos > -1) {
                        ctx.strokeStyle = "lime";
                        previewTxt.style.background = "lime";
                        previewTxt.style.color = "#000";

                        var txt = "";
                        var wordArr = currentWord.split("");


                        txt = "<div class='wld'><span>" + currentWord + "</span></div>";

                        wcnt[wordPos].innerHTML = txt;

                        if (temp1.indexOf(currentWord) < 0) {
                              temp1.push(currentWord);
                              //play("right");
                              if (temp1.length >= levels[currentLevel][1].length) {
                                    temp1 = [];
                                    temp2 = [];
                                    setTimeout(function () {
                                          levelComplete();
                                          //    startLevel(currentLevel+1);
                                    }, 2000)

                                    setTimeout(function () {
                                          var wls = document.getElementsByClassName("wld");
                                          for (var n = 0; n < wls.length; n++) {
                                                wls[n].style.transform = "translateY(" + Math.floor(100 + Math.random() * 200) + "px) rotate(" + Math.floor(Math.random() * 90 - 45) + "deg)";
                                                wls[n].style.opacity = 0;
                                                lContainer.style.transform = "scale(0) rotate(0)";
                                                levelDiv.style.transform = "translateY(-100px)";
                                                shuffleBtn.style.transform = "translateX(-100px)";
                                                hintBtn.style.transform = "translateX(100px)";
                                                document.querySelector(".toLevels").style.display = "none"
                                          }
                                    }, 1000);
                              }
                              setTimeout(function () {
                                    play("right");
                              }, 100);
                        }
                  }
                  else if (levels[currentLevel][1].indexOf(currentWord) > -1) {
                        ctx.strokeStyle = "orange";
                        previewTxt.style.background = "orange";
                        previewTxt.style.color = "#fff";
                        if (temp2.indexOf(currentWord) === -1) {
                              wrong--;
                              temp2.push(currentWord);
                              bonusCoin += currentWord.length;
                              updateCoin(currentWord.length);
                              setTimeout(function () {
                                    play("extraWord");
                              }, 100)
                        }
                        else {

                        }
                  }
                  else {
                        ctx.strokeStyle = "red";
                        previewTxt.style.background = "red";
                        previewTxt.style.color = "#fff";
                        setTimeout(function () {
                              wrong++;
                              play("wrong");
                        }, 100);
                  }
                  drawLine(points[linePoints[linePoints.length - 1]][0], points[linePoints[linePoints.length - 1]][1]);
                  setTimeout(function () {
                        ctx.clearRect(0, 0, w, h);
                        ctx.strokeStyle = "blue";
                        previewTxt.textContent = "";
                        previewTxt.style.background = "rgba(240,240,240,0.8)";
                        previewTxt.style.color = "#666";
                        previewTxt.style.display = "none";
                  }, 500)
            }
      }

      c.addEventListener("touchstart", function (e) {

            e.preventDefault();
            var touchObject, tx, ty;


            if (started) {
                  var touchObject = e.changedTouches[0]
                  let clientX = touchObject.clientX
                  let clientY = touchObject.clientY
                  for (let index = 0; index < points.length; index++) {
                        let clientXInLetter = points[index][0] - clientX >= 0 && points[index][0] - clientX <= letterWidth
                        let clientYInLetter = points[index][1] - clientY >= 0 && points[index][1] - clientY <= letterWidth
                        if (clientXInLetter && clientYInLetter) {
                              linePoints.push(index);
                              //    play("select");
                              previewTxt.textContent += lt[index].textContent;
                              previewTxt.style.display = "inline-block";
                              started = false;
                        }
                  }
            }
      })

      c.addEventListener("touchmove", function (e) {

            e.preventDefault();
            if (!started) {
                  var touchObject = e.changedTouches[0]
                  let clientX = touchObject.clientX
                  let clientY = touchObject.clientY
                  for (let index = 0; index < points.length; index++) {
                        let clientXInLetter = points[index][0] - clientX >= 0 && points[index][0] - clientX <= letterWidth
                        let clientYInLetter = points[index][1] - clientY >= 0 && points[index][1] - clientY <= letterWidth
                        if (clientXInLetter && clientYInLetter) {
                              if (linePoints.indexOf(index) === -1) {
                                    linePoints.push(index);
                                    //    play("select");
                                    previewTxt.textContent += lt[index].textContent;
                                    previewTxt.style.display = "inline-block";
                                    started = false;
                              }

                        }
                  }
                  drawLine(clientX, clientY);
            }
      })

      c.addEventListener("touchend", function () {
            currentWord = "";
            for (var n = 0; n < linePoints.length; n++) {
                  currentWord += lt[linePoints[n]].textContent;
            }

            clearLine();
            linePoints = [];
            started = true;
      })

      //Mouse events...
      var msdn = false;
      c.addEventListener("mousedown", function (e) {
            e.preventDefault();
            msdn = true;
            var touchObject, tx, ty;
            if (started) {
                  var touchObject = e
                  let clientX = touchObject.clientX
                  let clientY = touchObject.clientY
                  for (let index = 0; index < points.length; index++) {
                        let clientXInLetter = points[index][0] - clientX >= 0 && points[index][0] - clientX <= letterWidth
                        let clientYInLetter = points[index][1] - clientY >= 0 && points[index][1] - clientY <= letterWidth
                        if (clientXInLetter && clientYInLetter) {
                              linePoints.push(index);
                              //    play("select");
                              previewTxt.textContent += lt[index].textContent;
                              previewTxt.style.display = "inline-block";
                              started = false;
                        }
                  }
            }
      })

      c.addEventListener("mousemove", function (e) {
            e.preventDefault();
            var touchObject, tx, ty;
            if (!started) {
                  var touchObject = e
                  let clientX = touchObject.clientX
                  let clientY = touchObject.clientY
                  for (let index = 0; index < points.length; index++) {
                        let clientXInLetter = points[index][0] - clientX >= 0 && points[index][0] - clientX <= letterWidth
                        let clientYInLetter = points[index][1] - clientY >= 0 && points[index][1] - clientY <= letterWidth
                        if (clientXInLetter && clientYInLetter) {
                              if (linePoints.indexOf(index) === -1) {
                                    linePoints.push(index);
                                    //    play("select");
                                    previewTxt.textContent += lt[index].textContent;
                                    previewTxt.style.display = "inline-block";
                                    started = false;
                              }

                        }
                  }
                  drawLine(clientX, clientY);
            }
      })

      c.addEventListener("mouseup", function () {
            currentWord = "";
            for (var n = 0; n < linePoints.length; n++) {
                  currentWord += lt[linePoints[n]].textContent;
            }

            clearLine();
            linePoints = [];
            started = true;
            msdn = false;
      })




      //transitions
      function trn1(x, t) {
            x.style.transform = t;
      }

      function letterTrans(x) {
            trn1(x, "scale(0.8)");
            setTimeout(function () {
                  trn1(x, "scale(1)");
            }, 100)
      }

      //Level

      var currentLevel = 0;
      var currentWord = "";
      var wcnt = document.getElementsByClassName("word");

      function startLevel(ln) {
            currentLevel = ln;
            ctx.fillRect(0, 0, w, h);
            completeDiv.style.display = "none";
            levelDiv.style.transform = "translateY(0px)";
            shuffleBtn.style.transform = "translateX(0)";
            hintBtn.style.transform = "translateX(0)";
            _s("levelNum").textContent = ln + 1;
            var levelContent = levels[ln][0];
            levelContent = levelContent[levelContent.length - 1].split("");
            levelContent.sort(function (x, y) { return Math.random() - 0.5 });
            for (var n = 0; n < levelContent.length; n++) {
                  lt[n].textContent = levelContent[n];
                  //lt[n].style.transform = "rotate("+Math.floor(Math.random()*40-20)+"deg)";
            }

          coinElm.innerHTML = "<span>" + getCookie("data").coins + "</span>";
            lContainer.style.transform = "scale(1) rotate(0deg)";
            for (var n = 0; n < levels[ln][1].length; n++) {
                  var txt = "";
                  for (var x = 0; x < levels[ln][1][n].length; x++) {
                        txt += "<div class='wl'>.</div>";
                  }
                  wcnt[n].innerHTML = txt;
            }

            var curvePoints = [];
            for (var n = 0; n < 20; n++) {
                  if (n % 2 === 0) {
                        curvePoints.push(Math.floor(w / 2 - Math.random() * w / 10));
                  }
                  else {
                        curvePoints.push(Math.floor(w / 2 + Math.random() * w / 10));
                  }
            }

            var dx = 0;
            var fy = h / 19;
            function drawAnim() {
                  ctx.clearRect(0, 0, w, h);
                  ctx.beginPath();
                  ctx.moveTo(0, 0);
                  for (var n = 0; n < curvePoints.length; n++) {
                        ctx.lineTo(curvePoints[n] - dx, fy * n);
                  }
                  ctx.lineTo(0, h);
                  ctx.fill();
                  ctx.closePath();
                  ctx.beginPath();
                  ctx.moveTo(w, 0);
                  for (var n = 0; n < curvePoints.length; n++) {
                        ctx.lineTo(curvePoints[n] + dx, fy * n);
                  }
                  ctx.lineTo(w, h);
                  ctx.fill();
                  ctx.closePath();
                  dx += 10;
                  if (dx > w / 1.5) {
                        clearInterval(intv);
                        dx = 0;
                  }
            }

            var intv = setInterval(drawAnim, 20);

      }

      //startLevel(0);

      //star...
      function star(x) {
            var txt = "";
            for (var n = 0; n < 3; n++) {
                  txt += (n < x) ? "<span>⭐</span>" : "<span style='visibility:hidden'>⭐</span>";
            }
            _s("star").innerHTML = txt;
      }

      //menu

      nextBtn.addEventListener("click", function () {
            if ((currentLevel + 1) < levels.length) {
                  startLevel(currentLevel + 1);
                  //sounds.levelStart.play().catch(function(err){alert(err)});
                  play("levelStart");
            }
            else {
                  startLevel(0);
                  //currentLevel = 0;
            }
      })



      function levelComplete(ishint) {

            let data = getCookie("data")
            completeDiv.style.display = "block";
            let starslist = [...data.stars]
            var starCount;
            if (ishint) {
                  starCount = 0;
            }
            else if (wrong === 0) {
                  starCount = 3;
                  bonusCoin += 10
            }
            else if (wrong < 2) {
                  starCount = 2;
                  bonusCoin += 5
            }
            else {
                  starCount = 1;
                  bonusCoin += 3
            }
            let starObj = {
                  level: currentLevel,
                  count: starCount
            }

            wrong = 0;
            star(starCount);

            let isReplayed = currentLevel < data.finished - 1 && data.finished > 1
            if (isReplayed) starslist[currentLevel] = starObj
            else starslist.push(starObj)
            updateCoin(ishint ? -20 : bonusCoin, starslist)
            bonusCoin = 0;
            play("levelComplete");
      }

      function shuffle() {
            var levelContent = levels[currentLevel][0];
            levelContent = levelContent[levelContent.length - 1].split("").sort(function (x, y) { return Math.random() - 0.5 });
            for (var n = 0; n < levelContent.length; n++) {
                  lt[n].textContent = levelContent[n];
                  //lt[n].style.transform = "rotate("+Math.floor(Math.random()*40-20)+"deg)";
            }
            lContainer.style.transform = "scale(0.1) rotate(720deg)";
            setTimeout(function () {
                  lContainer.style.transform = "scale(1) rotate(0deg)";
            }, 500)
            play("shuffle");
      }

      shuffleBtn.addEventListener("click", shuffle);

      var levelBtn = _s("levelBtn");
      var levelCnt = _s("levelCnt");
      var levelBack = document.querySelector("#levelBack button");
      var lvb = _s("levelBack");
      lvb.style.left = "0px";
      lvb.style.bottom = 20 + 'px';
      lvb.style.width = vw + "px";
      function diplayLevels() {
            levelMenu()
            updateLevelsCount()
            levelCnt.style.display = "block";
            nextBtn.style.display = "inline-block";
             levelBack.style.display = "none";
            starCnt.style.display = "none";
            compl.style.display = "none";
            nextBtnCnt.style.display = "none";
      }

      levelBtn.addEventListener("click", diplayLevels)
      document.querySelector(".toLevels").addEventListener("click", function () {
            document.getElementById("wContainer").style.display = "none"
            completeDiv.style.display = "block"
            compl.style.display = "none"
            lContainer.style.display = "none";
            levelDiv.style.display = "none";
            shuffleBtn.style.transform = "translateX(-100px)";
            hintBtn.style.transform = "translateX(100px)";
            levelCnt.style.display = "block";
            nextBtnCnt.style.display = "none";
            levelBack.style.display = "none";
            document.querySelector(".toLevels").style.display = "none"
      })
      levelBack.addEventListener("click", function () {
            levelCnt.style.display = "none";
            compl.style.display = "block";
            starCnt.style.display = "block";
            nextBtnCnt.style.display = "block";
      })

      function levelMenu() {
            let data = getCookie("data")
            var txt = "";
            for (var n = 0; n < levels.length; n++) {
                  txt += "<button class='level'>";
                  txt += "<span class='lt'>Уровень " + (n + 1) + "</span>";
                  txt += `<span class='cn'>💰 ${data.coins}</span>`;
                  txt += "<span class='st'></span></button>";
            }
            _s("levelList").innerHTML = txt;


      }

      levelMenu();
      function updateLevelsCount(params) {
            let data = getCookie("data")
            for (var n = 0; n < levels.length; n++) {
                  if (n < data.finished) {
                        document.querySelector(".level:nth-child(" + (n + 1) + ")").addEventListener("click", function () {
                              startLevel(parseInt(this.textContent.slice(7)) - 1);
                              document.getElementById("wContainer").style.display = "block"
                              levelCnt.style.display = "none";
                              levelBack.style.display = "inline-block";
                              nextBtnCnt.style.display = "block";
                              starCnt.style.display = "block";
                              document.querySelector(".toLevels").style.display = "block"
                              compl.innerHTML = "Отлично !!!";
                              compl.style.display = "block";
                              lContainer.style.display = "block";
                              levelDiv.style.display = "block";
                              shuffleBtn.style.transform = "translateX(0)";
                              hintBtn.style.transform = "translateX(0)";
                              _s("coin").innerText = data.coins;
                              play("levelStart");
                        })
                        document.querySelector(".level:nth-child(" + (n + 1) + ") .lt").style.background = "green"
                        let stars = ""
                        for (let index = 0; index < data.stars.length; index++) {
                              if (data.stars[index].level === n) {
                                    let starstext = ""
                                    for (let i = 0; i < data.stars[index].count; i++) {
                                          starstext += "<span>⭐</span>"
                                    }
                                    document.querySelector(".level:nth-child(" + (n + 1) + ")  .st").innerHTML = starstext
                              }
                        }

                  }

                  else {
                        document.querySelector(".level:nth-child(" + (n + 1) + ") .lt").style.background = "grey"
                  }
                  if (document.querySelector(".level:nth-child(" + data.finished + ") .lt")) {
                        document.querySelector(".level:nth-child(" + data.finished + ") .lt").style.background = "orange"
                  }


            }
      }
      updateLevelsCount()


      //updateLevelMenu(2,65,3);

      function updateCoin(x, starslist) {
            let data = getCookie("data")
            let isReplayed = currentLevel < data.finished - 1 && data.finished > 1
            let newdata = { finished: isReplayed ? data.finished : data.finished + 1, stars: starslist, coins: x === -20 && data.coins === 0 ? 0 : isReplayed ? data.coins : data.coins + x }
            setCookie("data", JSON.stringify(newdata))
            coinElm.innerHTML = "<span>" + newdata.coins + "</span>";
      }

      function hint() {

            for (var n = 0; n < levels[currentLevel][1].length; n++) {
                  if (temp1.indexOf(levels[currentLevel][1]) === -1 && getCookie("data").coins >= 20) {
                        currentWord = levels[currentLevel][1][n];
                        var wordPos = levels[currentLevel][1].indexOf(currentWord);
                        var txt = "";
                        txt += "<div class='wld'>" + currentWord + "</div>";

                        wcnt[wordPos].innerHTML = txt;

                        if (temp1.indexOf(currentWord) < 0) {
                              temp1.push(currentWord);
                              //play("right");
                              if (temp1.length >= levels[currentLevel][0].length) {
                                    temp1 = [];
                                    temp2 = [];
                                    setTimeout(function () {
                                          levelComplete(true);
                                          //    startLevel(currentLevel+1);
                                    }, 2000)

                                    setTimeout(function () {
                                          var wls = document.getElementsByClassName("wld");
                                          for (var n = 0; n < wls.length; n++) {
                                                wls[n].style.transform = "translateY(" + Math.floor(100 + Math.random() * 200) + "px) rotate(" + Math.floor(Math.random() * 90 - 45) + "deg)";
                                                wls[n].style.opacity = 0;
                                                lContainer.style.transform = "scale(0) rotate(0)";
                                                levelDiv.style.transform = "translateY(-100px)";
                                                shuffleBtn.style.transform = "translateX(-100px)";
                                                hintBtn.style.transform = "translateX(100px)";
                                          }
                                    }, 1000);
                              }
                              setTimeout(function () {
                                    play("right");
                              }, 100);
                        }
                        break;
                  }
                  else {
                        document.getElementById("nocoins").style.display = "block"
                        setTimeout(() => document.getElementById("nocoins").style.display = "none", 1000)
                  }
            }
      }

      hintBtn.addEventListener("click", hint)

      container.style.display = "block";
}