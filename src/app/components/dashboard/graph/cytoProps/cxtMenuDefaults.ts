import { cxtCommands } from './cxtCommands';

export const cxtMenuDefaults = {
  selector: 'node', // Elements matching this Cytoscape.js selector will trigger cxtmenus
  commands: cxtCommands,
  menuRadius: 60,
  fillColor: 'rgba(0, 0, 0, 0.75)', // The background color of the menu
  activeFillColor: 'rgba(1, 105, 217, 0.75)', // The color used to indicate the selected command
  activePadding: 12, // Additional size in pixels for the active command
  indicatorSize: 16, // The size in pixels of the pointer to the active command
  separatorWidth: 4, // The empty spacing in pixels between successive commands
  spotlightPadding: 10, // Extra spacing in pixels between the element and the spotlight
  adaptativeNodeSpotlightRadius: true, // Specify whether the spotlight radius should adapt to the node size
  minSpotlightRadius: 40, // The minimum radius in pixels of the spotlight
  maxSpotlightRadius: 100, // The maximum radius in pixels of the spotlight
  openMenuEvents: 'cxttapstart taphold', // Events that will open the menu
  itemColor: 'white', // The color of text in the command's content
  itemTextShadowColor: 'transparent',
  zIndex: 9999,
  atMouse: false,
  outsideMenuCancel: false as number | false | undefined, // Use the correct type
};
