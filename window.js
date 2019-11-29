// GNU LESSER GENERAL PUBLIC LICENSE Version 3
console.log('Welcome to Perfide')

const electron = require('electron').remote
const { Menu, MenuItem } = electron
const url = require('url')
const path = require('path')
const fs = require('fs')

console.log('process.versions.node', process.versions.node)
console.log('process.versions.chrome', process.versions.chrome)
console.log('process.versions.electron', process.versions.electron)

const template = [{
		label: '&File', // TODO &
		submenu: [
			{ label: 'New File', accelerator: 'CommandOrControl+N' }, // TODO Ctrl+N
			{ label: 'Open File...' },
			{ label: 'Open Folder...' },
			{ label: 'Open Recent' }, // TODO >
			{ label: 'Reopen with Encoding' },
			{ label: 'New View into File (Duplicate Tab)' },
			{ label: 'Save' },
			{ label: 'Save with Encoding' },
			{ label: 'Save As...' },
			{ label: 'Save All' },
			{ type: 'separator' },
			{ label: 'New Window' },
			{ label: 'Close Window' },
			{ type: 'separator' },
			{ label: 'Close File' },
			{ label: 'Revert File' },
			{ label: 'Close All Files' },
			{ type: 'separator' },
			{ label: 'Exit' },
		]
	},

	{
		label: 'Edit',
		submenu: [
			{ label: '?' },
			{ type: 'separator' },
			{ type: 'separator' },
			{ type: 'separator' },
		]
	},

	{
		label: 'Selection',
		submenu: [
			{ label: '?' },
			{ type: 'separator' },
		]
	},

	{
		label: 'Find',
		submenu: [
			{ label: '?' },
			{ type: 'separator' },
			{ type: 'separator' },
			{ type: 'separator' },
			{ type: 'separator' },
		]
	},

	{
		label: 'View',
		submenu: [
			{ label: '?' },
			{ type: 'separator' },
			{ type: 'separator' },
			{ type: 'separator' },
			{ type: 'separator' },
			{ type: 'separator' },
		]
	},

	{
		label: 'Goto',
		submenu: [
			{ label: '?' },
			{ type: 'separator' },
			{ type: 'separator' },
			{ type: 'separator' },
			{ type: 'separator' },
			{ type: 'separator' },
			{ type: 'separator' },
		]
	},

	{
		label: 'Tools',
		submenu: [
			{ label: 'Command Palette...' },
			{ label: 'Snippets...' },
			{ type: 'separator' },
			{ label: 'Build System' },
			{ label: 'Build' },
			{ label: 'Build With...' },
			{ label: 'Cancel Build' },
			{ label: 'Build Results' },
			{ label: 'Save All on Build' },
			{ type: 'separator' },
			{ label: 'Record Macro' },
			{ label: 'Playback Macro' },
			{ label: 'Save Macro...' },
			{ label: 'Macros' },
			{ type: 'separator' },
			{ label: 'Developer' }, // TODO toggledevtools here
			{ type: 'separator' },
			{ label: 'Package Tools' }, // TODO >
		]
	},

	{
		label: 'Debug',
		submenu: [
			{ label: '?' },
		]
	},

	{
		label: 'Terminal',
		submenu: [
			{ label: '?' },
		]
	},


	{
		label: 'Project',
		submenu: [
			{ label: 'Open Project...' },
			{ label: 'Switch Project...' },
			{ label: 'Quick Switch Project...' },
			{ label: 'Open Recent' },
			{ type: 'separator' },
			{ label: 'Save Project As...' },
			{ label: 'Close Project' },
			{ label: 'Edit Project' },
			{ type: 'separator' },
			{ label: 'New Workspace for Project' },
			{ label: 'Save Workspace As...' },
			{ type: 'separator' },
			{ label: 'Add Folder to Project...' },
			{ label: 'Remove all Folders from Project' },
			{ label: 'Refresh Folders' },
		]
	},

	{
		label: 'Preferences',
		submenu: [
			{ label: 'Browse Packages...' },
			{ type: 'separator' },
			{ label: 'Settings' },
			{ label: 'Settings — Syntax Specific' },
			{ label: 'Settings — Distraction Free' },
			{ type: 'separator' },
			{ label: 'Key Bindings' },
			{ type: 'separator' },
			{ label: 'Color Scheme...' },
			{ label: 'Theme...' },
			{ label: 'Font' },
			{ label: 'Package Settings' },
			{ label: 'Package Control' },
		]
	},

	{
		label: 'Help',
		submenu: [
			{ label: 'Homepage' },
			{ label: 'GitHub' },
			{ label: 'Twitter' },
			{ label: 'Telegram' },
			{ type: 'separator' },
			{ role: 'toggledevtools' },
			{ role: 'forceReload' },
			{ type: 'separator' },
			{ label: 'Changelog...' },
			{ label: 'About Perfide' },
		]
	},



	/*
	{
			label: 'Edit!',
			submenu: [{
					role: 'undo'
				},
				{
					role: 'redo'
				},
				{
					type: 'separator'
				},
				{
					role: 'cut'
				},
				{
					role: 'copy'
				},
				{
					role: 'paste'
				}
			]
		},

		{
			label: 'View',
			submenu: [{
					role: 'reload'
				},
				{
					role: 'toggledevtools'
				},
				{
					type: 'separator'
				},
				{
					role: 'resetzoom'
				},
				{
					role: 'zoomin'
				},
				{
					role: 'zoomout'
				},
				{
					type: 'separator'
				},
				{
					role: 'togglefullscreen'
				}
			]
		},

		{
			role: 'window',
			submenu: [{
					role: 'minimize'
				},
				{
					role: 'close'
				}
			]
		},

		{
			role: 'help',
			submenu: [{
				label: 'Learn More'
			}]
		}*/
]

const menu = Menu.buildFromTemplate(template)
electron.getCurrentWindow().setMenu(menu)

const templateEditor = [
	{ label: 'Show Diff Hunk' },
	{ label: 'Show Unsaved Changes...' },
	{ type: 'separator' },
	{ label: 'Cut' },
	{ label: 'Copy' },
	{ label: 'Paste' },
	{ label: 'Select All' },
	{ type: 'separator' },
	{ label: 'Open Git Repository...' },
	{ label: 'File History...' },
	{ label: 'Folder History...' },
	{ label: 'Blame File...' },
	{ type: 'separator' },
	{ label: 'Open Containing Folder...' },
	{ label: 'Copy File Path' },
	{ label: 'Reveal in Side Bar' },
	{ type: 'separator' },
	{ label: 'Package Tools' },
]
const menuEditor = Menu.buildFromTemplate(templateEditor)

const templateFolder = [
	{ label: 'New File' },
	{ label: 'Rename...' },
	{ type: 'separator' },
	{ label: 'Open Git Repository...' },
	{ label: 'Folder History...' },
	{ type: 'separator' },
	{ label: 'New Folder...' },
	{ label: 'Delete Folder' },
	{ label: 'Find in Folder...' },
	{ label: 'Remove Folder from Project' },
	{ type: 'separator' },
	{ label: 'Package Tools' },
]
const menuFolder = Menu.buildFromTemplate(templateFolder)

const templateFile = [
	{ label: 'Rename...' },
	{ label: 'Delete File' },
	{ label: 'Open Containing Folder...' },
	{ type: 'separator' },
	{ label: 'Open Git Repository...' },
	{ label: 'File History...' },
	{ label: 'Folder History...' },
	{ label: 'Blame File...' },
	{ type: 'separator' },
	{ label: 'Package Tools' },
]
const menuFile = Menu.buildFromTemplate(templateFile)
console.log(menuFile)
menuFile.items[menuFile.items.length - 1].enabled = false

const templateTab = [
	{ label: 'Pin' },
	{ label: 'Duplicate' },
	{ label: 'Split' },
	{ type: 'separator' },
	{ label: 'Close' },
	{ label: 'Close Other Tabs' },
	{ label: 'Close Tabs to the Right' },
	{ label: 'Close Tabs to the Left' },
	{ type: 'separator' },
	{ label: 'New File' }, // TODO Ctrl+N
	{ label: 'Open File' },
	{ type: 'separator' },
	{ label: 'Package Tools' },
]
const menuTab = Menu.buildFromTemplate(templateTab)

//menuEditor.popup({window: electron.getCurrentWindow()})

const canvas = document.getElementById("webgl2")
const gl = canvas.getContext("webgl2")

let mustRender = true
let start = null
let last = -1

function render(timestamp) {
	window.requestAnimationFrame(render)
	if (!start) start = timestamp
	let progress = timestamp - start
	if (last < 0) last = timestamp - 0.01
	let delta = timestamp - last
	last = timestamp

	if (!mustRender) { return }
	mustRender = false
	console.log('render', progress, delta)
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

	// Draw a 1 pixel border around the edge using
	// the scissor test since it's easier than setting up
	// a lot of stuff
	gl.clearColor(1, 0, 0, 1) // red
	gl.disable(gl.SCISSOR_TEST)
	gl.clear(gl.COLOR_BUFFER_BIT)

	gl.enable(gl.SCISSOR_TEST)
	gl.scissor(1, 1, gl.canvas.width - 2, gl.canvas.height - 2)
	gl.clearColor(0.6, 0.6, 0.9, 1) // blue
	gl.clear(gl.COLOR_BUFFER_BIT)
}

function resizeCanvas() {
	console.log('resizeCanvas')
	var width = canvas.clientWidth
	var height = canvas.clientHeight
	if (canvas.width != width ||
		canvas.height != height) {
		canvas.width = width
		canvas.height = height

		// in this case just render when the window is resized.
		//render()
		mustRender = true
	}
}

resizeCanvas()
window.addEventListener('resize', resizeCanvas)
window.requestAnimationFrame(render)
