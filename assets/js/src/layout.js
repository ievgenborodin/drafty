
export function sideBar() {
	return `
		<div class="sidebar-wrap">
			<div>

				<div class="current-color-wrap">
					<span id="current-color"></span>
				</div>

				<div class="colors-wrap">
					<div id="color-holder"></div>
					<div id="blackwhite-holder"></div>
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
			
				<div class="tool-btn" id="save-btn"></div>

			</div>
		</div>
	`;
}