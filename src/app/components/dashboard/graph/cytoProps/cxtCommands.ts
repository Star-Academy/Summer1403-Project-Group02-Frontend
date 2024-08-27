import { Singular } from 'cytoscape';

export const cxtCommands = [
  {
    fillColor: 'rgba(255, 111, 97, 0.7)', // Optional: custom background color for the item
    content: `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    </div>`, // HTML/text content to be displayed in the menu
    contentStyle: {
      'font-family': 'Roboto, Arial',
      'font-size': '10',
      'text-align': 'center',
    }, // CSS key:value pairs to set the command's CSS in JS if you want
    select: function (ele: Singular) {
      // A function to execute when the command is selected
      console.log(ele.id()); // `ele` holds the reference to the active element
    },
    hover: function (ele: Singular) {
      // A function to execute when the command is hovered
      console.log(ele.id()); // `ele` holds the reference to the active element
    },
    enabled: true, // Whether the command is selectable
  },
  {
    fillColor: 'rgba(107, 91, 149, 0.7)', // Optional: custom background color for the item
    content: `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
    </div>`, // HTML/text content to be displayed in the menu
    contentStyle: { 'font-family': 'Roboto, Arial', 'font-size': '10' }, // CSS key:value pairs to set the command's CSS in JS if you want
    select: function (ele: Singular) {
      // A function to execute when the command is selected
      console.log(ele.id()); // `ele` holds the reference to the active element
    },
    hover: function (ele: Singular) {
      // A function to execute when the command is hovered
      console.log(ele.id()); // `ele` holds the reference to the active element
    },
    enabled: true, // Whether the command is selectable
  },
  {
    fillColor: 'rgba(136, 176, 75, 0.7)', // Optional: custom background color for the item
    content: `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-expand"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>
          </div>`, // HTML/text content to be displayed in the menu
    contentStyle: {
      'font-family': 'Roboto, Arial',
      'font-size': '10',
    }, // CSS key:value pairs to set the command's CSS in JS if you want
    select: function (ele: Singular) {
      // A function to execute when the command is selected
      console.log(ele.id()); // `ele` holds the reference to the active element
    },
    hover: function (ele: Singular) {
      // A function to execute when the command is hovered
      console.log(ele.id()); // `ele` holds the reference to the active element
    },
    enabled: true, // Whether the command is selectable
  },
];
