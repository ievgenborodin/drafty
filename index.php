<?php include("html/_header.php");  ?>

<div class="container">
    <div class="row">
        <div id="header" class="col-xs-12">
            <div class="row">
                <div id="title" class="col-xs-1 col-sm-3 col-md-3">
                    <div id="title-text" class="hidden-xs visible-sm visible-md visible-lg">
                        <span id="word-live">Live</span><span id="word-brush">Brush</span>
                    </div>
                    <div id="title-img" class="visible-xs hidden-sm hidden-md hidden-lg">
                        <img src="img/title.png" class="img-responsive">
                    </div>
                </div>
                <div id="undo-redo" class="col-xs-3 col-sm-2">
                    <span id="undo">&#x021A9;</span>
                    <span id="redo">&#x021AA;</span>
                </div>
                <div id="color" class="col-xs-2 col-sm-1 col-md-2 color">
                    <span id="color-span" class="colorSpot"></span>
                </div> 
                <div id="size-div" class="col-xs-6 col-sm-5 col-md-5 size">
                    <input type="range" id="size" min="1" max="20" step="0.1" value="1"> 
                </div>
            </div>
        </div>
    </div>
  <div class="row">
    <div id="edit-left" class="col-xs-12 col-md-2">
      <div class="row tool-cols">
          <div id="hand" class="col-xs-1 col-md-6">
              <img src="img/hand.png" class="img-responsive" />
          </div>
          <div id="brush" class="col-xs-1 col-md-6">
              <img src="img/brush.png" class="img-responsive" />
          </div>
          <div id="line" class="col-xs-1 col-md-6">
              <img src="img/line.png" class="img-responsive" />
          </div>
          <div id="pencil" class="col-xs-1 col-md-6">
              <img src="img/pencil.png" class="img-responsive" />
          </div>
          <div id="circle" class="col-xs-1 col-md-6">
              <img src="img/circle.png" class="img-responsive" />
          </div>
          <div id="bucket" class="col-xs-1 col-md-6">
              <img src="img/bucket.png" class="img-responsive" />
          </div>
          <div id="box" class="col-xs-1 col-md-6">
              <img src="img/box.png" class="img-responsive" />
          </div>
          <div id="text" class="col-xs-1 col-md-6">
              <img src="img/text.png" class="img-responsive" />
          </div>
          <div id="eraser" class="col-xs-1 col-md-6">
              <img src="img/eraser.png" class="img-responsive" />
          </div>
          <div id="star" class="col-xs-1 col-md-6">
              <img src="img/star.png" class="img-responsive" />
          </div>
          <div id="save" class="col-xs-1 col-md-6">
              <img src="img/save.png" class="img-responsive" />
          </div>
          <div id="cleanew" class="col-xs-1 col-md-6">
              <img src="img/new.png" class="img-responsive" />
          </div>
        </div>
    </div>  
    <div id="edit-right" class="col-xs-12 col-md-10">
        <canvas id="canvas">Doesn't support.</canvas>
        <input type="text" id="tiny-text">
        <div id="message"></div>
        
    </div>
  </div>
</div>

<div id="greyIsh"></div>
<div id="divPickerHolder">
    <div id="divPicker">
        <div id="pickerWorkingSpace">
            <div id="divPickerBG">
                <img src="img/picker-bg.png" id="pickerBG" class="img-responsive" />
                <span id="pointerBG"></span>
            </div>
            <div id="divPickerColor">
                <img src="img/picker-color.png" id="pickerColor" />
                <span id="pointerColor"></span>
            </div>
        </div>
        <div class="clear"></div>
        <div id="divPickerControls">
            <div class="buttons">
                <span class="btn btn-default" id="btnOk">Ok</span>
            </div>
            <div class="buttons">
                <span id="colorSpot" class="colorSpot"></span>
            </div>
            <div class="buttons">
                #<input type="text" id="colorHash" />;
            </div>
            
        </div>
    </div>
</div> 
  



</body>
</html>
