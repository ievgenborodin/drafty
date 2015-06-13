<?php include("html/_header.php");  ?>

<div class="container">
    <div class="row">
        <div class="col-xs-12 title">
            <div class="row">
                <div class="col-xs-2 col-sm-3 col-md-2">
                    <h2>
                        <span id="Live">Live</span><span id="Brush">Brush</span>
                    </h2>
                </div>
                <div class="col-xs-3 col-md-2">
                    <div id="undo-redo">
                        <span id="undo">&#x021A9;</span>
                        <span id="redo">&#x021AA;</span>
                    </div>
                </div>
                <div class="col-xs-2 col-md-1 color">
                    <input type="color" value="#00f;" id="color">
                </div> 
                <div class="col-xs-5 col-sm-4 col-md-3 size tpad">
                    <input type="range" id="size" min="1" max="20" step="0.1" value="1"> 
                    <!--<button id="chk">chk</button> -->
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
          <!--
          <div id="star" class="col-xs-6">
              <img src="img/star.png" class="img-responsive" />
          </div>
          -->
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
          <div id="save" class="col-xs-1 col-xs-offset-1 col-md-6">
              <img src="img/save.png" class="img-responsive" />
          </div>
          <div id="cleanew" class="col-xs-1 col-md-6">
              <img src="img/new.png" class="img-responsive" />
          </div>
        </div>
    </div>  
    <div id="edit-right" class="col-xs-12 col-md-10 edit-right">
        <canvas id="canvas">Doesn't support.</canvas>
        <input type="text" id="tiny-text">
        <div id="message"></div>
        
    </div>
  </div>
</div>

<div id="greyIsh"></div>
<div id="divPickerHolder">
    <div id="divPicker">
        <div id="divPickerBG">
            <img src="img/picker-bg.png" id="pickerBG" />
        </div>
        <div id="divPickerColor">
            <img src="img/picker-color.png" id="pickerColor" />
        </div>
        <div class="clear"></div>
        <div id="divPickerControls">
            <div class="buttons">
                <span class="btn btn-default" id="btnOk">Ok</span>
            </div>
            <div class="buttons">
                <span class="btn btn-default" id="btnCancel">Cancel</span>
            </div>
            <div class="buttons">
                #<input type="text" id="hashColor" />;
            </div>
        </div>
    </div>
</div>    



</body>
</html>
