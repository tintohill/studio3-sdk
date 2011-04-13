/**
 * The Portal class
 */
var Portal = Class.create({
  initialize: function() {
    this.preferences  = new Preferences();
    // Render any preferences-related items.
    this.preferences.render();
  }
});

var portal;

function loadPortal() {
  if (typeof(portal) === 'undefined') {
    portal = new Portal();
  }
}

// Returns an element that contains informative text about running this portal outside the studio
function _studioOnlyContent() {
	var resultDiv;
	with(Elements.Builder) {
	   var showInfo;
	   resultDiv = div(
	     div({'class' : 'unavailable'}, 'Content Unavailable'),
	     div(showInfo = a({'href' : '#'}, 'about'))
	   );
	   showInfo.observe('click', function(event) {
	     DialogHelper.createInfoBox("Content Unavailable", "This portal element interacts with Aptana Studio and only available when running within the Studio", "back to portal");
	     event.stop();
	   });
	}
	return resultDiv;
}

// Remove all the descendants from the parent element
function _clearDescendants(parentElement) {
	if (parentElement) {
		var descendants = parentElement.descendants();
		var items_count = descendants.size();
        for( var i = 0; i < items_count; i++ ) {
			descendants[i].remove();
		}
	}
}
function _isErrorStatus(jsonContent) {
	return jsonContent.event == Events.ERROR;
}

/**
 * Returns a DIV with an error details. 
 * The error details will appear only if the jsonError contains an errorDetails in its data hash.
 */
function _errorStatus(jsonError) {
	var d;
	with(Elements.Builder) {
		d = div({'class' : 'errorStatus'}, div({'class' : 'errorTitle'}, 'An error occured'));
		if (jsonError.data.errorDetails) {
			d.appendChild(div({'class' : 'errorDetails'}, jsonError.data.errorDetails));
		}
	}
	return d;
}
 