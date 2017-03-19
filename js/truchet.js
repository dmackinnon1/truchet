
var truchet = {};
truchet.tiles = null;
truchet.reflect = false;
truchet.rotate = true;
truchet.style="diagonal";
truchet.border = false;
truchet.translate = false;

truchet.start = function(size, rows) {

	truchet.tiles = new Tiles(size,rows);
	truchet.tiles.init();
};

class Tiles {

	constructor(size, rows) {
		this.size = size;
		this.rows = rows;
		this.cols = rows;
		this.tiles = [];
	}

	init() {
		for (var i = 0; i < this.rows; i++){
			this.tiles[i] = [];
			for (var j = 0; j < this.cols; j ++) {
				this.tiles[i].push(0); 
			} 
		}	
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
		var frame = new Bldr("svg").att("id", this.count + "tile_"+i+"_"+j)
					.att("data-row", i).att("data-col", j)
					.att("align", "center").att("width", this.size).att("height", this.size);		
		var tile = null;
		if (truchet.style == "traditional") {
			tile = this.tileFill(k);
		} else {
			tile = this.tileDiag(k);
		}
		if (truchet.border) {
			var border = new Bldr("rect").att("stroke-width",1).att("fill","none");
			border.att("height", this.size).att("width", this.size).att("stroke","grey")
				.att("x", 0).att("y",0);
			frame.elem(border);
		}
		tile.att("data-row", i).att("data-col", j);
		frame.elem(tile);
		frame.att("onclick","elementClick(event)");
		return frame;
	}

	element(i,j) {
		return $("#" + "tile_"+i+"_"+j);
	}		

	rotate(i,j) {
		this.tiles[i][j] = (this.tiles[i][j] + 1) % 4;
	}

	applyRules(i,j){
		if (truchet.reflect) {
			var x = this.rows -1 -i;
			var y = this.rows -1 -j;
			this.tiles[i][y] = (this.tiles[i][j] + 3) % 4;
			this.tiles[x][j] = (this.tiles[i][j] + 1) % 4;
			this.tiles[x][y] = (this.tiles[i][j] +2) % 4;
			return;
			
		}
		if (truchet.rotate) {
			var x = this.rows -1 -i;
			var y = this.rows -1 -j;
			this.tiles[j][x] = (this.tiles[i][j] + 1) % 4;
			this.tiles[x][y] = (this.tiles[i][j] + 2) % 4;
			this.tiles[y][i] = (this.tiles[i][j] + 3) % 4;
			return;	
		}
		
		if (truchet.translate) {
			var m = Math.ceil(this.rows/2);
			var x = this.rows -1 - (m-i);
			var y = this.rows -1 - (m-j);
			this.tiles[x][j] = (this.tiles[i][j]);
			this.tiles[i][y] = (this.tiles[i][j]);
			this.tiles[x][y] = (this.tiles[i][j]);
			return;		
		}
			
	}

	applyAll() {
		for(var i = 0; i <this.rows; i++){
			for (var j = 0; j<this.rows; j++){
				this.applyRules(i,j);
			}
		}
	}

	tileFill(rotation) {
		var tile = new Bldr("polygon").att("stroke-width",0).att("fill","black");
		var c = this.size;
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
	}

	tileDiag(rotation) {
		var tile = new Bldr("line").att("style","stroke:rgb(0,0,255);stroke-width:3")
			.att("stroke-linecap","square");
		var c = this.size;
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
	$('#tileBoard').html(truchet.tiles.htmlTable());
};
