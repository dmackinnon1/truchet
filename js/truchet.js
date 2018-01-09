
var truchet = {};
truchet.tiles = null;
truchet.border = false;

truchet.start = function(size, rows) {
	truchet.tiles = new Tiles(size,rows);
	truchet.tiles.init();
};

truchet.curveAndLine = function(rotation, t) {
		var tile = new Bldr("line").att("style","stroke:rgb(0,0,0);stroke-width:3")
			.att("stroke-linecap","square");
		var c = t.size;
		var tl = "0,0";
		var tr = c +",0";
		var bl = "0," + c;
		var br = c + "," + c;

		var tile1 = new Bldr("path").att("style","stroke:rgb(0,0,0);stroke-width:3")
			.att("stroke-linecap","square")
			.att("fill","none");

		if (rotation == 0) {
			tile.att("x1", 0);
			tile.att("y1", c/2);
			tile.att("x2", c/2);
			tile.att("y2",c);
			
			var arc ="M " + c/2 + " 0";
			arc += " A " + c/2 + " " + c/2 + " "; //radii
			arc += "0 0" ; //rotation
			arc += "0"; //sweep
			arc += " " + c + " " + c/2;
			tile1.att("d",arc);
		
		} else if (rotation == 1) {
			tile.att("x1", c);
			tile.att("y1", c/2);
			tile.att("x2", c/2);
			tile.att("y2",c); 

			var arc ="M 0 " + c/2;
			arc += " A " + c/2 + " " + c/2 + " "; //radii
			arc += "0 0" ; //rotation
			arc += "0"; //sweep
			arc += " " + c/2 + " 0";
			tile1.att("d",arc);

		} else if (rotation == 2) {
			tile.att("x1", c/2);
			tile.att("y1", 0);
			tile.att("x2", c);
			tile.att("y2",c/2);
			
			var arc1 ="M 0 " + c/2;
			arc1 += " A " + c/2 + " " + c/2 + " "; //radii
			arc1 += "0 0" ; //rotation
			arc1 += "1"; //sweep
			arc1 += " " + c/2 + " " + c;
			tile1.att("d", arc1)
		
		} else {
			tile.att("x1", c/2);
			tile.att("y1", 0);
			tile.att("x2", 0);
			tile.att("y2",c/2); 
		
			var arc1 ="M " + c/2 + " " + c;
			arc1 += " A " + c/2 + " " + c/2 + " "; //radii
			arc1 += "0 0" ; //rotation
			arc1 += "1"; //sweep
			arc1 += " " + c + " " + c/2;
			tile1.att("d", arc1)
		}
		
		var group = new Bldr("g").elem(tile).elem(tile1);
		return group;

};

truchet.curveAndSquare = function(rotation, t) {
		var tile = new Bldr("line").att("style","stroke:rgb(0,0,0);stroke-width:3")
			.att("stroke-linecap","square");
		
		var tile2 = new Bldr("line").att("style","stroke:rgb(0,0,0);stroke-width:3")
			.att("stroke-linecap","square");
		
		var c = t.size;
		var tl = "0,0";
		var tr = c +",0";
		var bl = "0," + c;
		var br = c + "," + c;

		var tile1 = new Bldr("path").att("style","stroke:rgb(0,0,0);stroke-width:3")
			.att("stroke-linecap","square")
			.att("fill","none");

		if (rotation == 0) {
			tile.att("x1", 0);
			tile.att("y1", c/2);
			tile.att("x2",c/2);
			tile.att("y2",c/2);
			
			tile2.att("x1",c/2);
			tile2.att("y1",c/2);		
			tile2.att("x2", c/2);
			tile2.att("y2",c);
			
			var arc ="M " + c/2 + " 0";
			arc += " A " + c/2 + " " + c/2 + " "; //radii
			arc += "0 0" ; //rotation
			arc += "0"; //sweep
			arc += " " + c + " " + c/2;
			tile1.att("d",arc);
		
		} else if (rotation == 1) {
			tile.att("x1", c);
			tile.att("y1", c/2);
			tile.att("x2",c/2);
			tile.att("y2",c/2);
			tile2.att("x1",c/2);
			tile2.att("y1",c/2);		
			tile2.att("x2", c/2);
			tile2.att("y2",c); 

			var arc ="M 0 " + c/2;
			arc += " A " + c/2 + " " + c/2 + " "; //radii
			arc += "0 0" ; //rotation
			arc += "0"; //sweep
			arc += " " + c/2 + " 0";
			tile1.att("d",arc);

		} else if (rotation == 2) {
			tile.att("x1", c/2);
			tile.att("y1", 0);
			tile.att("x2",c/2);
			tile.att("y2",c/2);
			tile2.att("x1",c/2);
			tile2.att("y1",c/2);
			tile2.att("x2", c);
			tile2.att("y2",c/2);
			
			var arc1 ="M 0 " + c/2;
			arc1 += " A " + c/2 + " " + c/2 + " "; //radii
			arc1 += "0 0" ; //rotation
			arc1 += "1"; //sweep
			arc1 += " " + c/2 + " " + c;
			tile1.att("d", arc1)
		
		} else {
			tile.att("x1", c/2);
			tile.att("y1", 0);
			tile.att("x2",c/2);
			tile.att("y2",c/2);
			tile2.att("x1",c/2);
			tile2.att("y1",c/2);
			tile2.att("x2", 0);
			tile2.att("y2",c/2); 
		
			var arc1 ="M " + c/2 + " " + c;
			arc1 += " A " + c/2 + " " + c/2 + " "; //radii
			arc1 += "0 0" ; //rotation
			arc1 += "1"; //sweep
			arc1 += " " + c + " " + c/2;
			tile1.att("d", arc1)
		}
		
		var group = new Bldr("g").elem(tile).elem(tile1).elem(tile2);
		return group;
};

truchet.semiCircle = function(rotation, t) {		
		var c = t.size;
		var tl = "0,0";
		var tr = c +",0";
		var bl = "0," + c;
		var br = c + "," + c;
		var f = 1; //may be used to alter curvature. 1 = circle
		var tile = new Bldr("polygon").att("stroke-width",1)
			.att("stroke","rgb(0,0,0)").att("fill","rgb(0,0,0)");
		
		var tile1 = new Bldr("path").att("style","stroke:rgb(0,0,0);stroke-width:0")
			.att("stroke-linecap","square")
			.att("fill","rgb(0,0,0)");

		if (rotation == 0) {

			tile.att("points", bl + " " + tl + " " + tr);
			
			var arc ="M 0 " + c;
			arc += " A " + c*f + " " + c*f + " "; //radii
			arc += "0 0" ; //rotation
			arc += "0"; //sweep
			arc += " " + c+ " 0";
			tile1.att("d",arc);

					
		} else if (rotation == 1) {
			
			tile.att("points", tl + " " + tr + " " + br);
			
			var arc ="M " + "0 0";//var arc ="M " + c/2 + " 0";
			arc += " A " + c*f + " " + c*f + " "; //radii
			arc += "0 0" ; //rotation
			arc += "0"; //sweep
			arc += " " + c +" " + c; //arc += " " + c + " " + c/2;
			tile1.att("d",arc);


		} else if (rotation == 2) {

			tile.att("points", tr + " " + br + " " + bl);
			
			var arc1 ="M " + c + " 0";
			arc1 += " A " + c*f + " " + c*f + " "; //radii
			arc1 += "0 0" ; //rotation
			arc1 += "0"; //sweep
			arc1 += " 0 " + c;
			tile1.att("d", arc1)

		} else {

			tile.att("points", br + " " + bl + " " + tl);					
			
			var arc1 ="M  " + c + " " + c;
			arc1 += " A " + c*f + " " + c*f + " "; //radii
			arc1 += "0 0" ; //rotation
			arc1 += "0"; //sweep
			arc1 += " 0 0";
			tile1.att("d", arc1)
				}		
		
		var group = new Bldr("g").elem(tile).elem(tile1);
		return group;
};

truchet.circleEdge = function(rotation, t) {		
		var c = t.size;		
		var zero = 0;
		var tl = zero + "," + zero;
		var tr = "" + c +"," + zero;
		var bl = "" + zero + "," + c;
		var br = c + "," + c;
		var f = 1; //may be used to alter curvature. 1 = circle
		var tile1 = new Bldr("path").att("style","stroke:rgb(0,0,0);stroke-width:0.5;fill:none")
			.att("stroke-linecap","round");
		if (rotation == 0) {
			var arc ="M 0 " + c;
			arc += " A " + c*f + " " + c*f + " "; //radii
			arc += "0 0" ; //rotation
			arc += "0"; //sweep
			arc += " " + c + " 0";
			tile1.att("d",arc);
		} else if (rotation == 1) {
			var arc ="M " + "0 0";//var arc ="M " + c/2 + " 0";
			arc += " A " + c*f + " " + c*f + " "; //radii
			arc += "0 0" ; //rotation
			arc += "0"; //sweep
			arc += " " + c +" " + c; //arc += " " + c + " " + c/2;
			tile1.att("d",arc);
		} else if (rotation == 2) {
			var arc1 ="M " + c + " 0";
			arc1 += " A " + c*f + " " + c*f + " "; //radii
			arc1 += "0 0" ; //rotation
			arc1 += "0"; //sweep
			arc1 += " 0 " + c;
			tile1.att("d", arc1)
		} else {
			var arc1 ="M  " + c + " " + c;
			arc1 += " A " + c*f + " " + c*f + " "; //radii
			arc1 += "0 0" ; //rotation
			arc1 += "0"; //sweep
			arc1 += " 0 0";
			tile1.att("d", arc1)
		}				
		var group = new Bldr("g").elem(tile1);
		return group;
};


truchet.tileTraditional = function(rotation, t) {
		var tile = new Bldr("polygon").att("stroke-width",0).att("fill","black");
		var c = t.size;
		var tl = "0,0";
		var tr = c +",0";
		var bl = "0," + c;
		var br = c + "," + c;

		if (rotation == 0) {
			tile.att("points", bl + " " + tl + " " + tr);
		} else if (rotation == 1) {
			tile.att("points", tl + " " + tr + " " + br);
		} else if (rotation == 2) {
			tile.att("points", tr + " " + br + " " + bl);
		} else {
			tile.att("points", br + " " + bl + " " + tl);					
		}
		return tile;
};


truchet.tileSmith = function(rotation, t) {
		var tile = new Bldr("path").att("style","stroke:rgb(0,0,255);stroke-width:3")
			.att("stroke-linecap","square")
			.att("fill","none");
		
		
		var tile1 = new Bldr("path").att("style","stroke:rgb(0,0,255);stroke-width:3")
			.att("stroke-linecap","square")
			.att("fill","none");

		var c = t.size;
		if (rotation %2 == 0) {
			var arc ="M " + c/2 + " 0";
			arc += " A " + c/2 + " " + c/2 + " "; //radii
			arc += "0 0" ; //rotation
			arc += "0"; //sweep
			arc += " " + c + " " + c/2;
			tile.att("d",arc);
		
			var arc1 ="M 0 " + c/2;
			arc1 += " A " + c/2 + " " + c/2 + " "; //radii
			arc1 += "0 0" ; //rotation
			arc1 += "1"; //sweep
			arc1 += " " + c/2 + " " + c;
			tile1.att("d", arc1)
		} else {
			var arc ="M 0 " + c/2;
			arc += " A " + c/2 + " " + c/2 + " "; //radii
			arc += "0 0" ; //rotation
			arc += "0"; //sweep
			arc += " " + c/2 + " 0";
			tile.att("d",arc);
		
			var arc1 ="M " + c/2 + " " + c;
			arc1 += " A " + c/2 + " " + c/2 + " "; //radii
			arc1 += "0 0" ; //rotation
			arc1 += "1"; //sweep
			arc1 += " " + c + " " + c/2;
			tile1.att("d", arc1)
		}
		var group = new Bldr("g").elem(tile).elem(tile1);
		return group;
};


truchet.tileDiag = function(rotation,t) {
		var tile = new Bldr("line").att("style","stroke:rgb(0,0,255);stroke-width:3")
			.att("stroke-linecap","square");
		var c = t.size;
		if (rotation % 2 == 0) {
			tile.att("x1", c);
			tile.att("y1", 0);
			tile.att("x2", 0);
			tile.att("y2",c); 
		} else {
			tile.att("x1", 0);
			tile.att("y1", 0);
			tile.att("x2", c);
			tile.att("y2",c);		
		}
		return tile;
};

truchet.tileStyle = truchet.tileTraditional;


truchet.ruleNone = function(i,j, t) {
	//do nothing
};

truchet.ruleRotate = function(i,j,t) {
	var x = t.rows -1 -i;
	var y = t.rows -1 -j;
	t.tiles[j][x] = (t.tiles[i][j] + 1) % 4;
	t.tiles[x][y] = (t.tiles[i][j] + 2) % 4;
	t.tiles[y][i] = (t.tiles[i][j] + 3) % 4;
	return;	
};

truchet.ruleReflect = function(i,j,t) {
	var x = t.rows -1 -i;
	var y = t.rows -1 -j;
	var c = t.tiles[i][j];
	if (c %2 ==0) {
		t.tiles[i][y] = (c + 1) % 4;
		t.tiles[x][j] = (c + 3) % 4;
		t.tiles[x][y] = (c +2) % 4;
	} else {
		t.tiles[i][y] = (c + 3) % 4;
		t.tiles[x][j] = (c + 1) % 4;
		t.tiles[x][y] = (c +2) % 4;
	}		
	return;	
};

truchet.rule = truchet.ruleRotate;

class Tiles {

	constructor(size, rows, isStatic) {
		this.size = size;
		this.rows = rows;
		this.cols = rows;
		this.tiles = [];
		if (isStatic === true) { //maybe better pattern for optional param
			this.static = true;
		} else {
			this.static =false;
		}
	}

	init() {
		for (var i = 0; i < this.rows; i++){
			this.tiles[i] = [];
			for (var j = 0; j < this.cols; j ++) {
				this.tiles[i].push(0); 
			} 
		}	
	}
	
	distance(another) {
		if (another.rows !== this.rows && another.cols !== this.cols) {
			console.log("programming error - comparing incompatable tiles");
			return;
		}
		var total = 0;
		for (var i = 0; i < this.rows ;i++){
			for (var j = 0; j < this.cols ; j++) {
				var a = this.tiles[i][j];
				var b = another.tiles[i][j];
				if (a<=b) total += b-a;
				else total += (4-a)+b;
			}
		}
		return total;
	}

	htmlTable() {
		var html = new Bldr("table").att("align", "center"); 
		for (var i = 0; i < this.rows; i++){
			var row = new Bldr("tr");
			for (var j = 0; j < this.cols; j ++) {
				var cell = new Bldr("td");
				cell.elem(this.newTruchet(i,j,this.tiles[i][j]));
				row.elem(cell); 
			} 
			html.elem(row);
		}
		return html.build();	
	}
	
	newTruchet(i,j,k) {
		var frame = new Bldr("svg").att("id", "tile_"+i+"_"+j)
					.att("data-row", i).att("data-col", j)
					.att("align", "center").att("width", this.size).att("height", this.size);		
		
		var tile = truchet.tileStyle(k, this);
		
		if (truchet.border) {
			var border = new Bldr("rect").att("stroke-width",1).att("fill","none");
			border.att("height", this.size).att("width", this.size).att("stroke","grey")
				.att("x", 0).att("y",0);
			frame.elem(border);
		}
		tile.attOnAllElements("data-row", i).attOnAllElements("data-col", j);
		frame.elem(tile);
		if (!this.static){
			frame.att("onclick","elementClick(event)");
		}
		return frame;
	}

	element(i,j) {
		return $("#" + "tile_"+i+"_"+j);
	}		

	rotate(i,j) {
		this.tiles[i][j] = (this.tiles[i][j] + 1) % 4;
	}

	applyRules(i,j){
		truchet.rule(i,j,this);
			
	}

	applyAll() {
		for(var i = 0; i <this.rows; i++){
			for (var j = 0; j<this.rows; j++){
				this.applyRules(i,j);
			}
		}
	}

	randomizeTile() {
		var r = randomInt(this.rows);
		var c = randomInt(this.cols);
		this.rotate(r,c);
		this.applyRules(r,c);				
	}

};


function randomInt(lessThan){
	var selection = Math.floor(Math.random()*(lessThan));
	return selection;
};

function elementClick(event) {
	var i = parseInt(event.target.getAttribute("data-row"));
	var j = parseInt(event.target.getAttribute("data-col"));	
	truchet.tiles.rotate(i,j);
	truchet.tiles.applyRules(i,j);
	evnts.fireEvent("refresh");
	$('#tileBoard').html(truchet.tiles.htmlTable());
};
