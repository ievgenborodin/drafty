import $ from 'jquery';
//import SideBar from './src/SideBar';
//import TopBar from './src/TopBar';
//import ConfigLayer from './src/ConfigLayer';
import { sideBar, topBar } from './src/layout';

class DrafTouch {
  
  constructor(rootElement) {
    this.rootElement = rootElement;
  }
  
  render() {

  	//let sideBar = (new SideBar()).render();
 // 		topBar = (new TopBar()).render(),
 // 		configLayer = (new ConfigLayer()).render();

  	// define html 
    let html = `
      <div class="draftouch-wrap">
        <div>
          <span id="eraser"></span>
          ${topBar()} 
          ${sideBar()} 
        </div>
      </div>
    `;

    this.rootElement.innerHTML = html;
    
/*    // attach event listeners
    $('#convertEURtoUSD').on('click', function() {
      this.convertEURtoUSD() 
    });
    $('#convertUSDtoEUR').on('click', () => { 
      this.convertUSDtoEUR() 
    });*/
  }
}

export default DrafTouch;