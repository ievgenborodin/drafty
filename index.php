<!DOCTYPE html>
<html>
<head>
  <title>My Brush</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
  <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
  <link href="css/bootstrap.min.css" rel="stylesheet" />
  <link href="css/style.css" rel="stylesheet" />
  <script src="js/jquery.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/functions.js"></script>
  <script src="js/objects.js"></script>
  <script src="js/functions.js"></script>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-xs-12 title">
            <div class="row">
                <div class="col-xs-4  col-sm-3 col-md-2">
                    <h2>My brush</h2>
                </div>
                <div class="col-xs-4 col-md-2">
                    <div id="undo-redo">
                        <span id="undo">&#x021A9;</span>
                        <span id="redo">&#x021AA;</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <div class="row">
    <div id="edit-left" class="col-xs-2">
      <div class="row tool-cols">
          <div id="brush" class="col-xs-6">
              <img src="img/brush.png" class="img-responsive" />
          </div>
          <div id="pencil" class="col-xs-6">
              <img src="img/pencil.png" class="img-responsive" />
          </div>
          <div id="line" class="col-xs-6">
              <img src="img/line.png" class="img-responsive" />
          </div>
          <div id="star" class="col-xs-6">
              <img src="img/star.png" class="img-responsive" />
          </div>
          <div id="circle" class="col-xs-6">
              <img src="img/circle.png" class="img-responsive" />
          </div>
          <div id="bucket" class="col-xs-6">
              <img src="img/bucket.png" class="img-responsive" />
          </div>
          <div id="box" class="col-xs-6">
              <img src="img/box.png" class="img-responsive" />
          </div>
          <div id="text" class="col-xs-6">
              <img src="img/text.png" class="img-responsive" />
          </div>
          <div id="eraser" class="col-xs-6">
              <img src="img/eraser.png" class="img-responsive" />
          </div>
          <div id="save" class="col-xs-6">
              <img src="img/save.png" class="img-responsive" />
          </div>
          <div id="cleanew" class="col-xs-6">
              <img src="img/new.png" class="img-responsive" />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 tpad">
                <input type="color" id="color">
          </div> 
          <div class="col-xs-12 tpad">
                <input type="range" id="size" min="1" max="20" step="0.1" value="1"> 
          </div>
        </div>
    </div>  
    <div id="edit-right" class="col-xs-9 edit-right">
            <img id="saveImg">
            <canvas id="canvas">Doesn't support.</canvas>
    </div>
  </div>
</div>            
</body>
</html>
