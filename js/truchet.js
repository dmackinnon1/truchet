
var truchet = {};
truchet.tiles = null;
truchet.reflect = false;
truchet.rotate = true;

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
		var tile = this.tileFill(k);
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
			if (i != j) {
				this.tiles[j][i] = (this.tiles[i][j] + 2) % 4;
			}
		}
		if (truchet.rotate) {
			var x = this.rows -1 -i;
			var y = this.rows -1 -j;
			this.tiles[j][x] = (this.tiles[i][j] + 1) % 4;
			this.tiles[x][y] = (this.tiles[i][j] + 2) % 4;
			this.tiles[y][i] = (this.tiles[i][j] + 3) % 4;
				
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
