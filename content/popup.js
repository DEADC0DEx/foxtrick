'use strict';
/**
 * popup.js
 *
 * @author LA-MJ
 */

/* global chrome */

// MV3: chrome.extension.getBackgroundPage() is removed.
// Communicate with the background service worker via chrome.runtime.sendMessage.

chrome.runtime.sendMessage({ req: 'popupInit' }, function(data) {
	if (!data)
		return;

	var disableEl = document.getElementById('foxtrick-toolbar-deactivate');
	disableEl.checked = data.disableTemporary;
	disableEl.addEventListener('click', function() {
		chrome.runtime.sendMessage({
			req: 'setValue',
			key: 'disableTemporary',
			value: this.checked,
			type: 'Bool',
		});
		window.close();
	});

	var highlightEl = document.getElementById('foxtrick-toolbar-highlight');
	highlightEl.checked = data.featureHighlight;
	highlightEl.addEventListener('click', function() {
		chrome.runtime.sendMessage({
			req: 'setValue',
			key: 'featureHighlight',
			value: this.checked,
			type: 'Bool',
		});
		window.close();
	});

	var translKeysEl = document.getElementById('foxtrick-toolbar-translationKeys');
	translKeysEl.checked = data.translationKeys;
	translKeysEl.addEventListener('click', function() {
		chrome.runtime.sendMessage({
			req: 'setValue',
			key: 'translationKeys',
			value: this.checked,
			type: 'Bool',
		});
		window.close();
	});

	var strings = data.strings || {};

	document.getElementById('foxtrick-toolbar-deactivate-label').textContent =
		strings['toolbar.disableTemporary'] || 'Temporarily deactivate';
	document.getElementById('foxtrick-toolbar-highlight-label').textContent =
		strings['toolbar.featureHighlight'] || 'Highlight features';
	document.getElementById('foxtrick-toolbar-translationKeys-label').textContent =
		strings['toolbar.translationKeys'] || 'Show translation keys';

	var optLabel = document.getElementById('foxtrick-toolbar-options-label');
	optLabel.textContent = strings['toolbar.preferences'] || 'Options';
	optLabel.addEventListener('click', function(ev) {
		ev.preventDefault();
		document.location.href = 'preferences.html?width=700#tab=on_page';
	});

	var homepageLabel = document.getElementById('foxtrick-toolbar-homepage-label');
	homepageLabel.textContent = strings['link.homepage'] || 'Homepage';
	homepageLabel.addEventListener('click', function(ev) {
		ev.preventDefault();
		chrome.tabs.create({ url: this.href });
		window.close();
	});

	var contributeLabel = document.getElementById('foxtrick-toolbar-contribute-label');
	if (strings['changes.support'])
		contributeLabel.textContent = strings['changes.support'];
	contributeLabel.addEventListener('click', function(ev) {
		ev.preventDefault();
		chrome.tabs.create({ url: this.href });
		window.close();
	});

	var clearCacheLabel = document.getElementById('foxtrick-toolbar-clearCache-label');
	clearCacheLabel.textContent = strings['api.clearCache'] || 'Clear cache';
	clearCacheLabel.title = strings['api.clearCache.title'] || '';
	clearCacheLabel.addEventListener('click', function(ev) {
		ev.preventDefault();
		chrome.runtime.sendMessage({ req: 'clearCaches' });
		window.close();
	});
});
