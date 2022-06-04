<style type="text/css">
	.flip-card {
  /*display: block;
  position: relative;
  z-index: 1000;*/
  width: 100%;
  height: 150px;
}
.flip-card .card-front{
-moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -moz-transition: -moz-transform 500ms;
  -o-transition: -o-transform 500ms;
  -webkit-transition: -webkit-transform 500ms;
  transition: transform 500ms;
  /*display: block;*/
 /* height: 100%;*/
  position: absolute;
  width: 100%;
  padding: 10px;
}
.flip-card .card-back {
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -moz-transition: -moz-transform 500ms;
  -o-transition: -o-transform 500ms;
  -webkit-transition: -webkit-transform 500ms;
  transition: transform 500ms;
  /*display: block;*/
  /*height: 100%;*/
  position: absolute;
  width: 100%;
}
.flip-card .card-front {
  -moz-transform: perspective(300) rotateY(0);
  -webkit-transform: perspective(300) rotateY(0);
  transform: perspective(300) rotateY(0);
  z-index: 900;
}
.flip-card .card-back {
  -moz-transform: rotateY(-180deg);
  -webkit-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  z-index: 800;
}
.flip-card:hover .card-front {
  -moz-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
  -moz-transform: perspective(300) rotateY(180deg);
  -webkit-transform: perspective(300) rotateY(180deg);
  transform: perspective(300) rotateY(180deg);
}
.flip-card:hover .card-back {
  z-index: 950;
  -moz-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
  -moz-transform: perspective(300) rotateY(0deg);
  -webkit-transform: perspective(300) rotateY(0deg);
  transform: perspective(300) rotateY(0deg);
}

/*** Just for show... ***/
.flip-card {
  text-shadow: 1px 1px 0 rgba(14, 85, 143, 0.8);
  color: #fff;
  cursor: pointer;
  float: left;
  font-weight: bold;
  margin: 10px;
  text-align: center;
  text-transform: uppercase;
  /*min-width: 100px;
  max-width: 400px;*/
}
.flip-card .card-front,
.flip-card .card-back {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-box-shadow: 1px 1px 2px rgba(14, 85, 143, 0.8);
  -webkit-box-shadow: 1px 1px 2px rgba(14, 85, 143, 0.8);
  box-shadow: 1px 1px 2px rgba(14, 85, 143, 0.8);
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #051e32;
  padding: 40px 0;
}
.flip-card .card-front {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #499bea;
  *zoom: 1;
  filter: progid:DXImageTransform.Microsoft.gradient(gradientType=0, startColorstr='#FF499BEA', endColorstr='#FF207CE5');
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzQ5OWJlYSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzIwN2NlNSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==');
  background-size: 100%;
  background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #499bea), color-stop(100%, #207ce5));
  background-image: -moz-linear-gradient(top, #499bea 0%, #207ce5 100%);
  background-image: -webkit-linear-gradient(top, #499bea 0%, #207ce5 100%);
  background-image: linear-gradient(to bottom, #499bea 0%, #207ce5 100%);
}
.flip-card .card-back {
  -moz-box-shadow: 0 0 20px rgba(19, 113, 189, 0.8) inset;
  -webkit-box-shadow: 0 0 20px rgba(19, 113, 189, 0.8) inset;
  box-shadow: 0 0 20px rgba(19, 113, 189, 0.8) inset;
  background-color: #478ce0;
  *zoom: 1;
  filter: progid:DXImageTransform.Microsoft.gradient(gradientType=0, startColorstr='#FF478CE0', endColorstr='#FF0263DB');
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzQ3OGNlMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzExNjhkYiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAyNjNkYiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==');
  background-size: 100%;
  background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #478ce0), color-stop(100%, #1168db), color-stop(100%, #0263db));
  background-image: -moz-linear-gradient(top, #478ce0 0%, #1168db 100%, #0263db 100%);
  background-image: -webkit-linear-gradient(top, #478ce0 0%, #1168db 100%, #0263db 100%);
  background-image: linear-gradient(to bottom, #478ce0 0%, #1168db 100%, #0263db 100%);
}

/*body {
  background-color: #e6f2f7;
  *zoom: 1;
  filter: progid:DXImageTransform.Microsoft.gradient(gradientType=1, startColorstr='#FFE6F2F7', endColorstr='#FFA0D8EF');
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY3g9IjUwJSIgY3k9IiIgcj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2U2ZjJmNyIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2EwZDhlZiIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==');
  background-size: 100%;
  background-image: -moz-radial-gradient(center, circle cover, #e6f2f7 0%, #a0d8ef 100%);
  background-image: -webkit-radial-gradient(center, circle cover, #e6f2f7 0%, #a0d8ef 100%);
  background-image: radial-gradient(circle cover at center, #e6f2f7 0%, #a0d8ef 100%);
}*/

/*.viewport {
  margin: 10px auto 0;
  width: 500px;
}*/
</style>
<div class="viewport container">
  <div class="row flash_card" >
  	<div class="col-md-3 ">
  		 <div class="flip-card">
		    <div class="card-front">
		      Flash card
		    </div>
		    <div class="card-back">
		      Back!
		    </div>
		  </div>
  	</div>
  </div>
 
  
</div>
