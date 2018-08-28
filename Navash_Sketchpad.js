//=============================================================================
// Navash Plugins - Sketchpad
// Navash_Sketchpad.js
//=============================================================================

var Imported = Imported || {};
Imported.Navash_Sketchpad = true;

var Navash = Navash || {};
Navash.SKP = Navash.SKP || {};
Navash.SKP.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 Creates a sketchpad that allows the player to freely
 * draw using touch controls
 * @author Navash
 *
 * @param Background Image
 * @type file
 * @dir img/system/
 * @desc The background image for the sketchpad scene. Leave blank to not use.
 * @default
 *
 * @param ---Page Settings---
 * @default
 *
 * @param Max Pages
 * @parent ---Page Settings---
 * @type number
 * @min 1
 * @desc How many pages on the sketchpad? Having 1 page will not show the page window.
 * @default 3
 *
 * @param Page Display Text
 * @parent ---Page Settings---
 * @desc Text displayed to indicate page number. %1 - Current Page, %2 - Max Page
 * @default <<            Page %1/%2            >>
 *
 * @param Page Window Position
 * @parent ---Page Settings---
 * @desc Display the page number at the top or bottom of the sketch window?
 * @type select
 * @option Top
 * @option Bottom
 * @default Bottom
 *
 * @param Page Change Touch Threshold
 * @parent ---Page Settings---
 * @desc Amount of pixels from either boundary to touch in order to change page.
 * @default this.width / 4
 *
 * @param Tool Window Position
 * @desc Display tools at the left or right of the sketch window?
 * @type select
 * @option Left
 * @option Right
 * @default Right
 *
 * @param Sketch Window Width
 * @desc Width of the sketch window. This can be a formula or a number.
 * @default Graphics.boxWidth * 3/4
 *
 * @param --- Window Opacities ---
 * @default
 *
 * @param Sketch Window Opacity
 * @parent --- Window Opacities ---
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of the sketch window.
 * @default 255
 *
 * @param Tool Window Opacity
 * @parent --- Window Opacities ---
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of the tool window.
 * @default 255
 *
 * @param Page Window Opacity
 * @parent --- Window Opacities ---
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of the page window.
 * @default 255
 *
 * @param Pen Setup
 * @type struct<PenSetup>[]
 * @desc Create pen settings.
 * @default ["{\"Display Setup\":\"{\\\"Name\\\":\\\"Red\\\",\\\"Icon\\\":\\\"\\\",\\\"Image\\\":\\\"\\\",\\\"Scale Image\\\":\\\"true\\\"}\",\"Size\":\"8\",\"Color\":\"10\"}","{\"Display Setup\":\"{\\\"Name\\\":\\\"Green\\\",\\\"Icon\\\":\\\"\\\",\\\"Image\\\":\\\"\\\",\\\"Scale Image\\\":\\\"true\\\"}\",\"Size\":\"8\",\"Color\":\"rgba(0,255,0,1)\"}","{\"Display Setup\":\"{\\\"Name\\\":\\\"Blue\\\",\\\"Icon\\\":\\\"\\\",\\\"Image\\\":\\\"\\\",\\\"Scale Image\\\":\\\"true\\\"}\",\"Size\":\"8\",\"Color\":\"rgba(0, 0, 255, 1)\"}","{\"Display Setup\":\"{\\\"Name\\\":\\\"White\\\",\\\"Icon\\\":\\\"\\\",\\\"Image\\\":\\\"\\\",\\\"Scale Image\\\":\\\"true\\\"}\",\"Size\":\"8\",\"Color\":\"\"}","{\"Display Setup\":\"{\\\"Name\\\":\\\"Black\\\",\\\"Icon\\\":\\\"\\\",\\\"Image\\\":\\\"\\\",\\\"Scale Image\\\":\\\"true\\\"}\",\"Size\":\"8\",\"Color\":\"rgba(0,0,0,1)\"}","{\"Display Setup\":\"{\\\"Name\\\":\\\"Thick\\\",\\\"Icon\\\":\\\"\\\",\\\"Image\\\":\\\"\\\",\\\"Scale Image\\\":\\\"true\\\"}\",\"Size\":\"24\",\"Color\":\"rgba(255,0,255,1)\"}","{\"Display Setup\":\"{\\\"Name\\\":\\\"Thin\\\",\\\"Icon\\\":\\\"\\\",\\\"Image\\\":\\\"\\\",\\\"Scale Image\\\":\\\"true\\\"}\",\"Size\":\"2\",\"Color\":\"rgba(0,255,255,1)\"}"]
 *
 * @param Eraser Setup
 * @type struct<EraserSetup>
 * @desc Create eraser settings.
 * @default {"Display Setup":"{\"Name\":\"Eraser\",\"Icon\":\"\",\"Image\":\"\",\"Scale Image\":\"true\"}","Size":"20"}
 *
 * @param --- Sound Effect Settings ---
 * @default
 *
 * @param Pen Select Sound
 * @parent --- Sound Effect Settings ---
 * @desc Sound effect when a pen is selected.
 * @type struct<SoundEffect>
 * @default {"name":"Cursor2","volume":"90","pitch":"100","pan":"0"}
 *
 * @param Eraser Select Sound
 * @parent --- Sound Effect Settings ---
 * @desc Sound effect when the eraser is selected.
 * @type struct<SoundEffect>
 * @default {"name":"Cursor2","volume":"90","pitch":"100","pan":"0"}
 *
 * @param Clear Select Sound
 * @parent --- Sound Effect Settings ---
 * @desc Sound effect when sketchpad is cleared.
 * @type struct<SoundEffect>
 * @default {"Name":"Clear","Icon":"","Image":"","Scale Image":"true"}
 *
 * @param Accept Select Sound
 * @parent --- Sound Effect Settings ---
 * @desc Sound effect when accept is selected.
 * @type struct<SoundEffect>
 * @default {"Name":"Accept","Icon":"","Image":"","Scale Image":"true"}
 *
 * @param Page Change Sound
 * @parent --- Sound Effect Settings ---
 * @desc Sound effect when page is changed.
 * @type struct<SoundEffect>
 * @default {"name":"Equip1","volume":"90","pitch":"100","pan":"0"}
 *
 * @param --- Button Settings ---
 * @default
 *
 * @param Button Width
 * @parent --- Button Settings ---
 * @desc The width of the buttons. By default is the size of the window.
 * @default this.windowWidth()
 *
 * @param Button Height
 * @parent --- Button Settings ---
 * @desc The height of the buttons. By default is line height.
 * @default this.lineHeight()
 *
 * @param Clear Button Display Setup
 * @desc How the clear button is displayed.
 * @type struct<DisplaySetup>
 * @default {"Display Type":"3","Name":"Clear","Icon":"","Image":"","Scale Image":"true"}
 *
 * @param Accept Button Display Setup
 * @desc How the accept button is displayed.
 * @type struct<DisplaySetup>
 * @default {"Display Type":"3","Name":"Accept","Icon":"","Image":"","Scale Image":"true"}
 *
 * @help
 * ============================================================================
 *  Introduction
 * ============================================================================
 *
 * This plugin introduces a new Sketchpad scene. This scene allows the player
 * to freely draw on the screen using touch controls. As the expected use is
 * with a touch interface, the entire scene uses only touch controls to
 * operate.
 *
 * Anything drawn by the player is saved automatically.
 *
 * The sketchpad allows the use of multiple different pen styles, each
 * customizable with its own size and color. The sketchpad also allows 
 * multiple pages of the sketchpad, each saved seperately.
 *
 *
 * ============================================================================
 *  Usage
 * ============================================================================
 *
 * To open the scene, you can use either the Plugin Command:
 *
 *     Sketchpad
 *
 * or the script call:
 *
 *     SceneManager.push(Scene_Sketchpad)
 *
 * The sketchpad will open with the last page that was used.
 *
 * Players can draw freely on the sketchpad window. The tools window holds
 * all the available pens, as well as the eraser and clear/accept buttons.
 * Interaction with the tools window is purely touch based.
 * Shifting between pages of the sketchpad can be done by touching the page
 * number window at the left or right end.
 *
 *
 * ============================================================================
 *  Parameters
 * ============================================================================
 *
 *      ----------------------------------------------------------------
 *
 *    Background Image
 *
 * The background image to use for the sketchpad scene. Image should be in
 * img/system/ and will not be scaled. Leave blank to not use an image.
 *
 *      ----------------------------------------------------------------
 *
 *     Max Pages
 *
 * The maximum number of pages in the sketchpad. If set to 1, functionality
 * with pages will be removed (obviously).
 *
 *
 *     Page Display Text
 *
 * The text format to display the current active page number.
 *
 *
 *     Page Window Position
 *
 * The position of the page display window. This can be either at the top or
 * the bottom.
 *
 *
 *     Page Change Touch Threshold
 *
 * The amount of pixels from either end of the page display window that the
 * player needs to click on to trigger a page change. This can be a number
 * or a formula.
 *
 *      ----------------------------------------------------------------
 *
 *     Sketch Window Width
 *
 * The width of the sketch window. The tool window will automatically
 * adjust its width to fit the screen. Can be a number or a formula.
 *
 *
 *     Tool Window Position
 *
 * The position of the tools window. This can be either at the left or
 * the right.
 *
 *
 *      ----------------------------------------------------------------
 *
 *     Sketch Window Opacity    Tool Window Opacity    Page Window Opacity
 *
 * Set the opacities for each window in the sketchpad scene.
 *
 *
 *      ----------------------------------------------------------------
 *
 *     Sound Effects
 *
 * The sound effects to play when the different commands are clicked. Each
 * sound needs a filename, volume, pitch and pan.
 *
 *      ----------------------------------------------------------------
 *
 *     Pen Setup
 *
 * This is a list of the pens that can be used in the sketchpad. Each pen
 * has the following properties:
 *
 *        Display Setup
 *
 *    See 'Display Setup' below.
 *
 *        Size
 *
 *    This is the width of the line that the pen will draw. This is a number.
 *
 *        Color
 *
 *    This is the color of the line the pen will draw. 
 *    You can simply input a number to use the window text color of that number.
 *    eg - 10 would give window text color 10, which is red.
 *    You can also input the value as an rgba value by typing 'rgba(r, g, b, a)'
 *    without the quotes, where 'r', 'g' and 'b' are the red, green and blue 
 *    values and 'a' is the alpha value.
 *    (It is recommended to always keep the alpha value as 1).
 *
 *      ----------------------------------------------------------------
 *
 *     Eraser Setup
 *
 * This is the settings for the eraser that is used in the sketchpad.
 * It has the following properties:
 *
 *        Display Setup
 *
 *    See 'Display Setup' below.
 *
 *        Size
 *
 *    This is the radius of influence of the eraser, ie the size around the 
 *    eraser that will be erased.
 *
 *      ----------------------------------------------------------------
 *
 *     Button Width        Button Height
 *
 * These determine the width and height of each tool button in the tools window.
 * They can be a number or a formula.
 * By default, the width is the width of the tools window and the height is
 * the standard line height.
 *
 *      ----------------------------------------------------------------
 *
 *     Clear Button Display Setup         Accept Button Display Setup
 *
 * These are the Display Settings for the 'Clear' and 'Accept' buttons in the
 * tools window. See 'Display Type' below.
 *
 *      ----------------------------------------------------------------
 *
 *     Display Setup
 *
 * This is the setting for how a command in the tools window appears. It has
 * the following properties:
 *
 *        Name
 *
 *     The name of the command to display. Not used if left blank or an 
 *     image is specified.
 *
 *        Icon
 *
 *     The icon of the command to display. Not used if left blank or 0 
 *     or an image is specified.
 *
 *        Image
 *
 *     The image file of the command to display. Using an image will not
 *     display any name or icon specified. Image file should be in img/system.
 *
 *        Scale Image
 *
 *     Whether or not to scale image to button size. Only used when an image 
 *     is used.
 *
 *      ----------------------------------------------------------------
 *
 * ============================================================================
 *  Plugin Commands and Script Calls
 * ============================================================================
 *
 * The only Plugin Command available to use is for opening
 * the sketchpad scene:
 *
 *    Plugin Command:    Sketchpad
 *    (  equivalent script call: SceneManager.push(Scene_Sketchpad)  )
 *
 *
 * Although there aren't many available script calls that are useful, some
 * calls that you may find a use for:
 *
 *   $gameSystem.initSketchPageStates()
 *        - Resets all sketchpad pages into blank canvases.
 *
 *   $gameSystem.currentSketchPage()
 *        - Returns the most recent active sketchpad page.
 *
 *   $gameSystem.setSketchPage(n)
 *        - Sets the active sketchpad page to page number n (0 based, so
 *            page number 1 would be 0)
 *
 *
 * ============================================================================
 *  Terms of Use
 * ============================================================================
 *
 *  - Free to use in non-commercial and commercial projects as long as credit
 *     is given
 *  - Credit me as "Navash".
 *  - Edits/Extension plugins are allowed to be shared publicly as long as 
 *     I'm notified.
 *
 * ============================================================================
 *  Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Initial Release!
 *
 */
//=============================================================================

/*~struct~PenSetup:
 *
 * @param Display Setup
 * @desc How the pen button is displayed.
 * @type struct<DisplaySetup>
 *
 * @param Size
 * @type number
 * @min 1
 * @desc Size at which pen is drawn. This is the line width.
 * @default 8
 *
 * @param Color
 * @desc Color of pen. Can use 'rgba(r,g,b,a)' values or a number to use text color
 * @default 0
 *
 */

 /*~struct~EraserSetup:
 *
 * @param Display Setup
 * @desc How the eraser button is displayed.
 * @type struct<DisplaySetup>
 *
 * @param Size
 * @type number
 * @min 1
 * @desc The radius of effect of the eraser.
 * @default 20
 *
 */

 /*~struct~DisplaySetup:
 *
 * @param Name
 * @desc Name of button to display. Leave blank to not display a name.
 *
 * @param Icon
 * @desc Icon of button to display. Leave blank or 0 to not display an icon.
 *
 * @param Image
 * @type file
 * @dir img/system/
 * @desc Picture of button to display. Leave blank to not use. Picture should be in img/system. Using an image will not display name or icon.
 *
 * @param Scale Image
 * @type boolean
 * @on Scale
 * @off Do Not Scale
 * @desc Scale image (if used) to button size?
 * @default true
 *
 */

  /*~struct~SoundEffect:
 *
 * @param name
 * @text Sound Effect
 * @desc The sound effect to play.
 * @type file
 * @dir audio/se/
 * @default 
 *
 * @param volume
 * @text Volume
 * @desc Volume of sound effect.
 * @type number
 * @min 0
 * @max 100
 * @default 90
 *
 * @param pitch
 * @text Pitch
 * @desc Pitch of sound effect.
 * @type number
 * @min 50
 * @max 150
 * @default 100
 *
 * @param pan
 * @text Pan
 * @desc Pan of sound effect.
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 */

//=============================================================================
// Parameter Variables
//=============================================================================

Navash.Parameters = PluginManager.parameters('Navash_Sketchpad');
Navash.Param = Navash.Param || {};

Navash.Param.SKPBackgroundImg = Navash.Parameters['Background Image'] || '';

Navash.Param.SKPMaxPages = parseInt(Navash.Parameters['Max Pages']) || 1;
Navash.Param.SKPPageText = Navash.Parameters['Page Display Text'] || '';
Navash.Param.SKPPagePosition = Navash.Parameters['Page Window Position'] || 'Bottom';
Navash.Param.SKPPageTouch = Navash.Parameters['Page Change Touch Threshold'] || 'this.width / 4';

Navash.Param.SKPSketchWidth = String(Navash.Parameters['Sketch Window Width']) || Graphics.boxWidth * 7/8;
Navash.Param.SKPToolPosition = Navash.Parameters['Tool Window Position'] || 'Right';

Navash.Param.SKPSketchOpacity = parseInt(Navash.Parameters['Sketch Window Opacity']);
Navash.Param.SKPToolOpacity = parseInt(Navash.Parameters['Tool Window Opacity']);
Navash.Param.SKPPageOpacity = parseInt(Navash.Parameters['Page Window Opacity']);

Navash.Param.SKPPenSound = Navash.Parameters['Pen Select Sound'] || '';
Navash.Param.SKPEraserSound = Navash.Parameters['Eraser Select Sound'] || '';
Navash.Param.SKPClearSound = Navash.Parameters['Clear Select Sound'] || '';
Navash.Param.SKPAcceptSound = Navash.Parameters['Accept Select Sound'] || '';
Navash.Param.SKPPageSound = Navash.Parameters['Page Change Sound'] || '';

Navash.Param.SKPEraserSettings = JSON.parse(Navash.Parameters['Eraser Setup']) || {};
Navash.Param.SKPEraserSettings['Display Setup'] = JSON.parse(Navash.Param.SKPEraserSettings['Display Setup']) || {};

Navash.Param.SKPButtonWidth = String(Navash.Parameters['Button Width']) || 'this.windowWidth()';
Navash.Param.SKPButtonHeight = String(Navash.Parameters['Button Height']) || 'this.lineHeight()';

Navash.Param.SKPClearDisplay = JSON.parse(Navash.Parameters['Clear Button Display Setup']) || {};
Navash.Param.SKPAcceptDisplay = JSON.parse(Navash.Parameters['Accept Button Display Setup']) || {};

Navash.Param.SKPPenSettings = [];
var penSettings = JSON.parse(Navash.Parameters['Pen Setup']) || [];
for (var i=0; i<penSettings.length; i++) {
	var setting = JSON.parse(penSettings[i]);
	if (setting) {
		setting['Display Setup'] = JSON.parse(setting['Display Setup']) || {};
		Navash.Param.SKPPenSettings.push(setting);
	}
}


//=============================================================================
// Bitmap
//=============================================================================

Bitmap.prototype.drawLine = function(x1, y1, x2, y2, color, lineWidth) {
	if (x1 == x2 && y1 == y2) {
		this.drawCircle(x1, y1, lineWidth/2, color);
		return;
	}
    var context = this._context;
    context.save();
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.lineWidth = lineWidth;
    context.stroke();
    context.restore();

    this.drawCircle(x1, y1, lineWidth/2, color);
    this.drawCircle(x2, y2, lineWidth/2, color);

    this._setDirty();
};

Bitmap.prototype.eraseCircle = function(x, y, radius) {
	var context = this._context;
	context.save();
	context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.clip();
    context.clearRect(x - radius - 1, y - radius - 1,
                      radius * 2 + 2, radius * 2 + 2);
    context.restore();
    this._setDirty();
};

Bitmap.prototype.eraseLine = function(x1, y1, x2, y2, radius) {
	var context = this._context;
	var lineWidth = radius * 2;
	var PI15 = 1.5 * Math.PI, PI05 = 0.5 * Math.PI;

	var temp;
	if (x2 < x1) {
		temp = x1; x1 = x2; x2 = temp;
		temp = y1; y1 = y2; y2 = temp;
	}
	var length = Math.sqrt( Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2) );

	context.save();
	context.translate(x1,y1);
	context.rotate(Math.atan2(y2-y1,x2-x1));
	x1 = 0; y1 = 0;
	x2 = length - 1; y2 = 0;

	context.moveTo(x1, y1-radius);
	context.lineTo(x2, y2-radius);
	context.arc(x2, y2, radius, PI15, PI05, false);
	context.lineTo(x1, y1-radius+lineWidth);
	context.arc(x1, y1, radius, PI05, PI15, false);
	context.closePath();
	x1 -= radius;
	y1 -= radius;

	context.clip();
	context.clearRect(x1, y1, length+lineWidth, lineWidth);
	context.restore();
	this._setDirty();
};

//=============================================================================
// Game_System
//=============================================================================

Navash.SKP.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Navash.SKP.Game_System_initialize.call(this);
	this.initSketchpadPages();
};

Game_System.prototype.initSketchpadPages = function() {
	this._currentSketchPage = 0;
	this.initSketchPageStates();
};

Game_System.prototype.initSketchPageStates = function() {
	this._sketchPageStates = [];
	var max = Navash.Param.SKPMaxPages;
	var sketch = Window_SketchCanvas.prototype;
	var w = sketch.windowWidth.call(sketch);
	var h = sketch.windowHeight.call(sketch);
	for (var i=0; i<max; i++) {
		var bitmap = new Bitmap(w, h);
		this._sketchPageStates.push(bitmap);
	}
};

Game_System.prototype.needsPageWindow = function() {
	return Navash.Param.SKPMaxPages > 1;
};

Game_System.prototype.currentSketchPage = function() {
	return this._currentSketchPage;
};

Game_System.prototype.getCurrentSketchPageState = function() {
	var index = this.currentSketchPage();
	return this.getSketchPageState(index);
};

Game_System.prototype.getSketchPageState = function(index) {
	if (index === undefined) index = this.currentSketchPage();
	if (index < 0 || index >= this._sketchPageStates.length) return undefined;
	return this._sketchPageStates[index];
};

Game_System.prototype.shiftSketchPage = function(value) {
	var maxPages = Navash.Param.SKPMaxPages;
	value = Math.floor(value);
	if (value < 0) {
		value *= -1;
		value %= maxPages;
		value *= -1;
	} else value %= maxPages;
	var newVal = this._currentSketchPage + value;
	if (newVal < 0) newVal = maxPages - newVal;
	else newVal %= maxPages;
	newVal = newVal.clamp(0, maxPages-1); // failsafe
	this._currentSketchPage = newVal;
};

Game_System.prototype.setSketchPage = function(value) {
	var maxPages = Navash.Param.SKPMaxPages;
	value = Math.floor(value);
	value = value.clamp(0, maxPages-1);
	this._currentSketchPage = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Navash.SKP.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Navash.SKP.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command.toLowerCase() === 'sketchpad') SceneManager.push(Scene_Sketchpad);
};

//=============================================================================
// Window_SketchPage
//=============================================================================

function Window_SketchPage() {
    this.initialize.apply(this, arguments);
}

Window_SketchPage.prototype = Object.create(Window_Base.prototype);
Window_SketchPage.prototype.constructor = Window_SketchPage;

Window_SketchPage.prototype.initialize = function() {
	var sketch = SceneManager._scene._sketchWindow;
	var x = sketch.x;
	var y = 0;
	if (Navash.Param.SKPPagePosition == 'Bottom')
		y = sketch.y + sketch.height;
	var w = sketch.width;
	var h = this.fittingHeight(1);
	Window_Base.prototype.initialize.call(this, x, y, w, h);
	var th;
	try {
		th = eval(Navash.Param.SKPPageTouch);
	} catch (e) {
		console.log(e);
		th = this.width / 4;
	}
	this._threshold = th;
	var opac = Navash.Param.SKPPageOpacity;
	if (opac === NaN) opac = 255;
	this.opacity = opac;
	this.drawPageNumber();
};

Window_SketchPage.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	if (!$gameSystem.needsPageWindow()) return;
	this.updateTouchInput();
};

Window_SketchPage.prototype.updateTouchInput = function() {
	if (!TouchInput.isTriggered()) return;
	var x = TouchInput.x;
	var y = TouchInput.y;
	if (!this.inBounds(x, y)) return;
	x = this.toLocalX(x);
	y = this.toLocalY(y);
	var left = this._threshold;
	var right = this.width - this._threshold;
	if (x < left) SceneManager._scene.shiftPage(-1);
	else if (x > right) SceneManager._scene.shiftPage(1);
};

Window_SketchPage.prototype.inBounds = function(x, y) {
	if (x < this.x || x > this.x + this.width) return false;
	if (y < this.y || y > this.y + this.height) return false;
	return true;
};

Window_SketchPage.prototype.toLocalX = function(x) {
	return x - this.x - this.standardPadding();
};

Window_SketchPage.prototype.toLocalY = function(y) {
	return y - this.y - this.standardPadding();
};

Window_SketchPage.prototype.refresh = function() {
	this.contents.clear();
	this.drawPageNumber();
};

Window_SketchPage.prototype.drawPageNumber = function() {
	var maxPage = Navash.Param.SKPMaxPages;
	if (maxPage < 2) return;
	var currentPage = $gameSystem.currentSketchPage() + 1;
	var fmt = Navash.Param.SKPPageText;
	var text = fmt.format(currentPage, maxPage);
	var tw = this.drawTextEx(text, 0, 0);
	this.contents.clear();
	var x = (this.width - tw) / 2;
	x -= this.standardPadding();
	this.drawTextEx(text, x, 0);
};

//=============================================================================
// Window_SketchCanvas
//=============================================================================

function Window_SketchCanvas() {
    this.initialize.apply(this, arguments);
}

Window_SketchCanvas.prototype = Object.create(Window_Base.prototype);
Window_SketchCanvas.prototype.constructor = Window_SketchCanvas;

Window_SketchCanvas.prototype.initialize = function() {
	var pagePos = Navash.Param.SKPPagePosition;
	var toolPos = Navash.Param.SKPToolPosition;
	var w = this.windowWidth();
	var h = this.windowHeight();
	var x = 0;
	if (toolPos == 'Left') x = Graphics.boxWidth - w;
	var y = 0;
	if (pagePos == 'Top') y = Graphics.boxHeight - h;
	Window_Base.prototype.initialize.call(this, x, y, w, h);
	this.initSetup();
	var opac = Navash.Param.SKPSketchOpacity;
	if (opac === NaN) opac = 255;
	this.opacity = opac;
};

Window_SketchCanvas.prototype.initSetup = function() {
	this._touchX = null;
	this._touchY = null;
	this._dotDist = 0;
	this._draw = false;
	this._erase = false;
	this._mode = "line";
	this._pen = Navash.Param.SKPPenSettings[0];
	this._eraser = Navash.Param.SKPEraserSettings;
	this.restoreCanvas();
};

Window_SketchCanvas.prototype.windowWidth = function() {
	var w;
	try {
		w = eval(Navash.Param.SKPSketchWidth);
	} catch (e) {
		console.log(e);
		w = Graphics.boxWidth * (7/8);
	}
	return w;
};

Window_SketchCanvas.prototype.windowHeight = function() {
	var h = Graphics.boxHeight;
	if (Navash.Param.SKPMaxPages > 1) h -= this.fittingHeight(1);
	return h;
};

Window_SketchCanvas.prototype.refresh = function(canvas) {
	this.restoreCanvas();
};

Window_SketchCanvas.prototype.setCanvas = function(canvas) {
	if (canvas === undefined) return;
	this.contents = canvas;
};

Window_SketchCanvas.prototype.restoreCanvas = function() {
	this.setCanvas($gameSystem.getCurrentSketchPageState());
};

Window_SketchCanvas.prototype.setPen = function(pen) {
	if (pen) this._pen = pen;
};

Window_SketchCanvas.prototype.setErase = function(value) {
	this._erase = value;
};

Window_SketchCanvas.prototype.isEraser = function() {
	return this._erase;
};

Window_SketchCanvas.prototype.clearCanvas = function() {
	this.contents.clear();
};

Window_SketchCanvas.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.updateTouchInput();
};

Window_SketchCanvas.prototype.inBounds = function(x, y) {
	if (x < this.x || x > this.x + this.width) return false;
	if (y < this.y || y > this.y + this.height) return false;
	return true;
};

Window_SketchCanvas.prototype.toLocalX = function(x) {
	return x - this.x - this.standardPadding();
};

Window_SketchCanvas.prototype.toLocalY = function(y) {
	return y - this.y - this.standardPadding();
};

Window_SketchCanvas.prototype.updateTouchValues = function() {
	this._touchX = this.toLocalX(TouchInput.x);
	this._touchY = this.toLocalY(TouchInput.y);
};

Window_SketchCanvas.prototype.updateTouchInput = function() {
	if (TouchInput.isTriggered()) {
		if (this.inBounds(TouchInput.x, TouchInput.y)) {
			this._draw = true;
			this.updateTouchValues();
			if (!this.isEraser()) this.drawLine(TouchInput.x, TouchInput.y, true);
		}
	}
	else if (TouchInput.isReleased()) {
		this._draw = false;
	}

	if (this.isEraser()) this.erase();
	else this.drawLine();
};

Window_SketchCanvas.prototype.getColor = function() {
	var def = this.textColor(0);
	var pen = this._pen;
	if (!pen) return def;
	var color = pen['Color'];
	if (!color) return def;
	if (color.includes('rgba')) return color;
	if (color.includes('textColor')) {
		var col;
		try {
			col = eval(color);
		} catch (e) {
			console.log(e);
			col = def;
		}
		return col;
	}
	var n = parseInt(color);
	if (n !== NaN) return this.textColor(n);
	return def;
};

Window_SketchCanvas.prototype.erase = function(x, y) {
	if (!this._draw) return;
	x = x || TouchInput.x;
	y = y || TouchInput.y;
	if (!this.inBounds(x, y)) {
		this.updateTouchValues();
		return;
	}
	x = this.toLocalX(x);
	y = this.toLocalY(y);
	//if (x == this._touchX && y == this._touchY) return;
	var r = Number(this._eraser['Size']);

	this.contents.eraseLine(this._touchX, this._touchY, x, y, r);
	this.updateTouchValues();
};

Window_SketchCanvas.prototype.drawLine = function(x, y, force) {
	if (!this._draw) return;
	x = x || TouchInput.x;
	y = y || TouchInput.y;
	if (!this.inBounds(x, y)) {
		this.updateTouchValues();
		return;
	}
	x = this.toLocalX(x);
	y = this.toLocalY(y);
	if (!force && x == this._touchX && y == this._touchY) return;
	
	var color = this.getColor();
	var size = this._pen['Size'] || 5;
	
	this.contents.drawLine(this._touchX, this._touchY, x, y, color, size);
	
	this.updateTouchValues();
};

/* Not implemented as not fully completed or tested. May implement later
   if it turns out to be useful */
Window_SketchCanvas.prototype.drawDottedLine = function(x, y) {
	if (!this._draw) return;
	x = x || TouchInput.x;
	y = y || TouchInput.y;
	if (!this.inBounds(x, y)) {
		this.updateTouchValues();
		return;
	}
	x = this.toLocalX(x);
	y = this.toLocalY(y);
	if (x == this._touchX && y == this._touchY) return;
	if (this._dotDist < 10) {
		this.incrementDotDist(x, y);
		this.updateTouchValues();
		return;
	}
	this._dotDist = 0;

	this.contents.drawCircle(x, y, 3, this.textColor(10));
	this.updateTouchValues();
};

// Required only for drawing dotted line
Window_SketchCanvas.prototype.incrementDotDist = function(x, y) {
	var h = Math.pow((x - this._touchX), 2);
	var v = Math.pow((y - this._touchY), 2);
	var dist = Math.sqrt(h + v);
	this._dotDist += dist;
};

//=============================================================================
// Window_SketchTools
//=============================================================================

function Window_SketchTools() {
	this.initialize.apply(this, arguments);
}

Window_SketchTools.prototype = Object.create(Window_Command.prototype);
Window_SketchTools.prototype.constructor = Window_SketchTools;

Window_SketchTools.prototype.initialize = function(sketchWindow) {
	this._sketchWindow = sketchWindow;
	var x = 0;
	if (Navash.Param.SKPToolPosition == 'Right')
		x = sketchWindow.x + sketchWindow.width;
	var y = sketchWindow.y;
	Window_Command.prototype.initialize.call(this, x, y);
	var opac = Navash.Param.SKPToolOpacity;
	if (opac === NaN) opac = 255;
	this.opacity = opac;
	this.select(0);
	this.deactivate();
};

Window_SketchTools.prototype.update = function() {
	Window_Command.prototype.update.call(this);
	this.updateTouchInput();
};

Window_SketchTools.prototype.updateTouchInput = function() {
	if (!TouchInput.isTriggered()) return;
	var x = TouchInput.x;
	var y = TouchInput.y;
	if (!this.inBounds(x, y)) return;
	this.updateButtonPress(x, y);
};

Window_SketchTools.prototype.updateButtonPress = function(x, y) {
	x = this.toLocalX(x);
	y = this.toLocalY(y);
	var index = this.getButtonIndex(x, y);
	if (index === null) return;
	var button = this._list[index];
	if (!button) return;
	var symbol = button.symbol;
	if (symbol == 'none') return;
	this.playSelectionSound(symbol);
	if (symbol == 'clear') this.onClearOk();
	else if (symbol == 'accept') this.onAcceptOk();
	else if (symbol == 'eraser') this.onEraserOk(index);
	else if (symbol == 'pen') this.onPenOk(index, button);
};

Window_SketchTools.prototype.playSelectionSound = function(symbol) {
	var param = Navash.Param;
	var se = '';
	switch (symbol) {
		case 'pen':
			se = param.SKPPenSound;
			break;
		case 'eraser':
			se = param.SKPEraserSound;
			break;
		case 'clear':
			se = param.SKPClearSound;
			break;
		case 'accept':
			se = param.SKPAcceptSound;
			break;
		default:
			se = '';
			break;
	}
	if (se != '') {
		se = JSON.parse(se);
		AudioManager.playStaticSe(se);
	}
};

Window_SketchTools.prototype.getButtonIndex = function(x, y) {
	for (var i=0; i<this._list.length; i++) {
		var rect = this.itemRectForText(i);
		if (x > rect.x && x < rect.x + rect.width
			&& y > rect.y && y < rect.y + rect.height)
			return i;
	}
	return null;
};

Window_SketchTools.prototype.onClearOk = function() {
	this._sketchWindow.clearCanvas();
};

Window_SketchTools.prototype.onAcceptOk = function() {
	SceneManager._scene.popScene();
};

Window_SketchTools.prototype.onEraserOk = function(index) {
	this._sketchWindow.setErase(true);
	this.select(index);
};

Window_SketchTools.prototype.onPenOk = function(index, button) {
	var pen = button.ext;
	if (!pen) return;
	this._sketchWindow.setErase(false);
	this._sketchWindow.setPen(pen);
	this.select(index);
};

Window_SketchTools.prototype.inBounds = function(x, y) {
	if (x < this.x || x > this.x + this.width) return false;
	if (y < this.y || y > this.y + this.height) return false;
	return true;
};

Window_SketchTools.prototype.toLocalX = function(x) {
	return x - this.x - this.standardPadding();
};

Window_SketchTools.prototype.toLocalY = function(y) {
	return y - this.y - this.standardPadding();
};

Window_SketchTools.prototype.windowWidth = function() {
	var sketchWindow = this._sketchWindow;
	if (Navash.Param.SKPToolPosition == 'Right') {
		var x = sketchWindow.x + sketchWindow.width;
		return Graphics.boxWidth - x;
	} else {
		return sketchWindow.x;
	}
};

Window_SketchTools.prototype.itemWidth = function() {
	if (Navash.Param.SKPButtonWidth) {
		var w;
		try {
			w = eval(Navash.Param.SKPButtonWidth);
		} catch (e) {
			console.log(e);
			w = this.windowWidth();
		}
		return w;
	}
	else return this.windowWidth();
};

Window_SketchTools.prototype.itemHeight = function() {
	if (Navash.Param.SKPButtonHeight) {
		var h;
		try {
			h = eval(Navash.Param.SKPButtonHeight);
		} catch (e) {
			console.log(e);
			h = this.windowHeight() / (this.numButtons() + 1);
		}
		return h;
	}
	else return this.windowHeight() / (this.numButtons() + 1);
};

Window_SketchTools.prototype.numButtons = function() {
	return Navash.Param.SKPPenSettings.length + 4;
};

Window_SketchTools.prototype.makeCommandList = function() {
	this.addPenCommands();
	this.addEraserCommand();
	this.addEmptyCommand();
	this.addClearCommand();
	this.addAcceptCommand();
};

Window_SketchTools.prototype.addPenCommands = function() {
	var pens = Navash.Param.SKPPenSettings;
	if (!pens) return;
	for (var i=0; i<pens.length; i++) {
		var name = 'pen_' + i;
		var symbol = 'pen';
		var enabled = true;
		var ext = pens[i];
		this.addCommand(name, symbol, enabled, ext);
	}
};

Window_SketchTools.prototype.addEraserCommand = function() {
	var eraser = Navash.Param.SKPEraserSettings;
	if (!eraser) return;
	var name = 'Eraser';
	var symbol = 'eraser';
	var enabled = true;
	var ext = eraser;
	this.addCommand(name, symbol, enabled, ext);
};

Window_SketchTools.prototype.addEmptyCommand = function() {
	var name = 'Empty';
	var symbol = 'none';
	var enabled = false;
	this.addCommand(name, symbol, enabled);
};

Window_SketchTools.prototype.addClearCommand = function() {
	var name = 'Clear';
	var symbol = 'clear';
	var enabled = true;
	this.addCommand(name, symbol, enabled);
};

Window_SketchTools.prototype.addAcceptCommand = function() {
	var name = 'Accept';
	var symbol = 'accept';
	var enabled = true;
	this.addCommand(name, symbol, enabled);
};

Window_SketchTools.prototype.commandExt = function(index) {
    return this._list[index].ext;
};

Window_SketchTools.prototype.drawItem = function(index) {
	var symbol = this.commandSymbol(index);
	var rect = this.itemRectForText(index);
	var obj = this.commandExt(index);
	if (!obj) {
		if (symbol == 'clear')
			this.drawCommandBox(index, rect, Navash.Param.SKPClearDisplay);
		else if (symbol == 'accept')
			this.drawCommandBox(index, rect, Navash.Param.SKPAcceptDisplay);
	} else {
		this.drawCommandBox(index, rect, obj['Display Setup']);
	}
};

Window_SketchTools.prototype.drawCommandBox = function(index, rect, display) {
	if (display['Image']) this.drawImageCommand(index, display);
	else this.drawNormalCommand(index, rect, display);
};

Window_SketchTools.prototype.drawNormalCommand = function(index, rect, display) {
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    var iconIndex = display['Icon'];
    var name = display['Name'];
    var x = rect.x;
    if (iconIndex) {
    	this.drawIcon(iconIndex, x, rect.y);
    	x += this.textPadding() + Window_Base._iconWidth;
    }
    this.drawText(name, x, rect.y, rect.width - x, align);
};

Window_SketchTools.prototype.drawImageCommand = function(index, display) {
    var filename = display['Image'];
    var rect = this.itemRect(index);
    var t_rect = this.itemRectForText(index);
    if (!filename) {
    	this.drawNormalCommand(index, t_rect, display);
    	return;
    }
    var img = ImageManager.loadSystem(filename);
    if (!img) {
    	this.drawNormalCommand(index, t_rect, display);
    	return;
    }
    img = new Sprite(img);
    var ins = this;
    var scale = display['Scale Image'];
    if (scale.toLowerCase() == 'true') scale = true;
    else scale = false;
    img.bitmap.addLoadListener(function () {
    	img.x = rect.x + ins.standardPadding();
	    img.y = rect.y + ins.standardPadding();
	    if (scale) {
	    	img.scale.x = (rect.width - ins.standardPadding() * 2) / img.width;
	    	img.scale.y = rect.height/ img.height;	
	    }
	    ins.addChild(img);
    });
};

Window_SketchTools.prototype.cursorUp = function(wrap) {
    var index = this.index();
    var symbol = this.currentSymbol();
    if (symbol == 'clear')
    	this.select(index - 2);
    else
    	Window_Selectable.prototype.cursorUp.call(this, wrap);
};

Window_SketchTools.prototype.cursorDown = function(wrap) {
    var index = this.index();
    var symbol = this.currentSymbol();
    if (symbol == 'eraser')
    	this.select(index + 2);
    else
    	Window_Selectable.prototype.cursorDown.call(this, wrap);
};

//=============================================================================
// Scene_Sketchpad
//=============================================================================

function Scene_Sketchpad() {
    this.initialize.apply(this, arguments);
}

Scene_Sketchpad.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Sketchpad.prototype.constructor = Scene_Sketchpad;

Scene_Sketchpad.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Sketchpad.prototype.shiftPage = function(value) {
	value = Math.floor(value).clamp(-1, 1);
	$gameSystem.shiftSketchPage(value);
	this._sketchWindow.refresh();
	if ($gameSystem.needsPageWindow()) this._pageWindow.refresh();
	var se = Navash.Param.SKPPageSound;
	if (se != '') {
		se = JSON.parse(se);
		AudioManager.playStaticSe(se);
	}
};

Scene_Sketchpad.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createWindows();
};

Scene_Sketchpad.prototype.createWindows = function() {
	this.createSketchWindow();
	this.createSketchToolsWindow();
	this.createPageNumberWindow();
};

Scene_Sketchpad.prototype.createBackground = function() {
	var alias = Scene_MenuBase.prototype.createBackground;
	var file = Navash.Param.SKPBackgroundImg;
	if (!file) {
		alias.call(this);
		return;
	}
	var img = ImageManager.loadSystem(file);
	if (!img) {
		alias.call(this);
		return;
	}
	this._backImg = new Sprite(img);
	this.addChild(this._backImg);
};

Scene_Sketchpad.prototype.createSketchWindow = function() {
	this._sketchWindow = new Window_SketchCanvas();
	this.addWindow(this._sketchWindow);
};

Scene_Sketchpad.prototype.createSketchToolsWindow = function() {
	this._sketchTools = new Window_SketchTools(this._sketchWindow);
	this.addWindow(this._sketchTools);
};

Scene_Sketchpad.prototype.createPageNumberWindow = function() {
	this._pageWindow = new Window_SketchPage();
	if ($gameSystem.needsPageWindow()) this.addWindow(this._pageWindow);
};