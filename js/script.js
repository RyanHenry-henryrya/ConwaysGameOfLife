var cells= [];

function toggle(x,y){
  let colour = document.getElementById(`(${x},${y})`).style.background;
  if (colour == "black"){
    document.getElementById(`(${x},${y})`).style.background = "white";
  } else {
    document.getElementById(`(${x},${y})`).style.background = "black";
  }
}

function submit(){
  var X = parseInt(document.getElementById("x").value);
  var Y = parseInt(document.getElementById("y").value);
  document.getElementById("table").innerHTML = "";
  let s = "";
  for (let y = 0; y < Y; y++){
    s += `<tr>`;
    cells.push([]);
    for (let x =0; x < X; x++){
      cells[y].push({neighbors:0,alive:false});
      s += 
      `
      <td draggable="true" ondragover="toggle(${x},${y});" 
      onmousedown="toggle(${x},${y});" id="(${x},${y})" 
      style="background: white;"></td>
      `;
    }
    s += `</tr>`;
  }
  document.getElementById("table").innerHTML = s;
}

function go(){
  var X = parseInt(document.getElementById("x").value);
  var Y = parseInt(document.getElementById("y").value);
  for (let y = 0; y < Y; y++){
    for (let x = 0; x < X; x++){
      life(x,y);
    }
  }
}

function life(x,y){
  var X = parseInt(document.getElementById("x").value);
  var Y = parseInt(document.getElementById("y").value);
  var n = 0;
  var alive = (document.getElementById(`(${x},${y})`).style.background == "black");
  for (let y1 = y-1;y1<=y+1;y1++){
    for (let x1 = x-1;x1<=x+1;x1++){
      let cell = document.getElementById(`(${x1},${y1})`);
      if (cell == null){
        continue;
      } else if (!(x==x1&&y==y1) && cell.style.background == "black"){
        n++;
      }
    }
  }
  cells[x][y]={neighbors:n,alive:alive};
  if (document.getElementById("Number").checked) {
    document.getElementById(`(${x},${y})`).innerText = n + "";
  } else {
    document.getElementById(`(${x},${y})`).innerText = "";
  }
}

function step(){
  var X = parseInt(document.getElementById("x").value);
  var Y = parseInt(document.getElementById("y").value);
  for (let y = 0; y < Y; y++){
    for (let x = 0; x < X; x++){
      let n = cells[x][y].neighbors;
      let alive = cells[x][y].alive;
      if (alive==true && !(n==2||n==3)){
        document.getElementById(`(${x},${y})`).style.background = "white";
      } else if (alive==false && n==3){
        document.getElementById(`(${x},${y})`).style.background = "black";
      }
    }
  }
}

function run(){
  go();
  step();
}

var myVar;
function start(){
  myVar = setInterval(run,500);
}

function stop(){
  clearInterval(myVar);
}