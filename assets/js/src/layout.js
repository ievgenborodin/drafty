
export function sideBar() {
	return `
		<div class="sidebar-wrap" id="sidebar">
			<div>

				<div class="colors-wrap" id="color-holder">
					<div></div>
					<div></div>
					<span id="color-pointer"></span>
				</div>

				<div class="size-wrap">
					<div id="size-holder"></div>
					<span id="size-pointer"></span>
				</div>

			</div>
		</div>
	`;
}


export function topBar() {
	return `
		<div class="topbar-wrap">
			<div>
			
				<div class="tool-btn" id="new-page-btn"></div>
				<div class="tool-btn" id="save-btn"></div>

			</div>
		</div>
	`;
}


export function bottomControl() {
	return `
		<div id="bottom-control-wrap">
			<div id="bottom-slider" style="left:0px">
				<div class="round-button" id="current-color-wrap">
					<span id="current-color"></span>
				</div>
				<div class="round-button" id="c-grey"></div>
				<div class="round-button" id="c-black"></div>
				<div class="round-button" id="c-brown"></div>
				<div class="round-button" id="c-red"></div>
				<div class="round-button" id="c-pink"></div>
				<div class="round-button" id="c-orange"></div>
				<div class="round-button" id="c-yellow"></div>
				<div class="round-button" id="c-white"></div>
				<div class="round-button" id="c-green"></div>
				<div class="round-button" id="c-teal"></div>
				<div class="round-button" id="c-blue"></div>
				<div class="round-button" id="c-purple"></div>
			</div>
		</div>
	`;
}