import { Component, AfterViewInit } from '@angular/core';
import cytoscape, { Singular } from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
// @ts-expect-error: library doesn't support ts
import coseBilkent from 'cytoscape-cose-bilkent';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
})
export class GraphComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    cytoscape.use(cxtmenu);
    cytoscape.use(coseBilkent);

    // Initialize Cytoscape graph
    const cy = cytoscape({
      container: document.getElementById('cy'),
      elements: [
        { data: { id: '6534454617', label: 'Afsar Tabatabaei' } }, // Node for SourceAccount 6534454617
        { data: { id: '6039548046', label: 'Arzhang Mortezavi' } }, // Node for DestinationAccount 6039548046
        { data: { id: '5287517379', label: 'Darya Hosseinzadeh' } },
        { data: { id: '5718373092', label: 'Kianoush Ghazi' } },
        { data: { id: '9862369812', label: 'Kamran Rezaei' } },
        { data: { id: '1205418051', label: 'Jila Zaman Zadeh' } },
        { data: { id: '3714493428', label: 'Setayesh Salari' } },
        { data: { id: '7434776097', label: 'Bamdad Barzegari' } },
        { data: { id: '4727992815', label: 'Negar Ahmadi' } },
        { data: { id: '3084026274', label: 'Anoush Ebrahimi' } },

        // Edges representing transactions
        {
          data: {
            id: 't1',
            source: '6534454617',
            target: '6039548046',
            label: '500,000,000',
          },
        }, // Transaction from 6534454617 to 6039548046
        {
          data: {
            id: 't1',
            source: '6534454617',
            target: '6039548046',
            label: '500,000,000',
          },
        }, // Transaction from 6534454617 to 6039548046
        {
          data: {
            id: 't2',
            source: '6039548046',
            target: '5287517379',
            label: '100,000,000',
          },
        }, // Transaction from 6039548046 to 5287517379
        {
          data: {
            id: 't3',
            source: '6039548046',
            target: '5718373092',
            label: '200,000,000',
          },
        }, // Transaction from 6039548046 to 5718373092
        {
          data: {
            id: 't4',
            source: '6039548046',
            target: '9862369812',
            label: '300,000,000',
          },
        }, // Transaction from 6039548046 to 9862369812
        {
          data: {
            id: 't5',
            source: '5287517379',
            target: '1205418051',
            label: '50,000,000',
          },
        }, // Transaction from 5287517379 to 1205418051
        {
          data: {
            id: 't6',
            source: '9862369812',
            target: '3714493428',
            label: '350,000,000',
          },
        }, // Transaction from 9862369812 to 3714493428
        {
          data: {
            id: 't7',
            source: '5718373092',
            target: '3714493428',
            label: '2,000,000,000',
          },
        }, // Transaction from 5718373092 to 3714493428
        {
          data: {
            id: 't8',
            source: '1205418051',
            target: '7434776097',
            label: '800,000,000',
          },
        }, // Transaction from 1205418051 to 7434776097
        {
          data: {
            id: 't9',
            source: '3714493428',
            target: '7434776097',
            label: '1,000,000,000',
          },
        }, // Transaction from 3714493428 to 7434776097
        {
          data: {
            id: 't10',
            source: '4727992815',
            target: '7434776097',
            label: '2,000,000,000',
          },
        }, // Transaction from 4727992815 to 7434776097
        {
          data: {
            id: 't11',
            source: '7434776097',
            target: '3084026274',
            label: '4,000,000,000',
          },
        }, // Transaction from 7434776097 to 3084026274
        {
          data: {
            id: 't12',
            source: '4727992815',
            target: '3084026274',
            label: '200,000,000',
          },
        }, // Transaction from 4727992815 to 3084026274
      ],

      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#526ed3',
            label: 'data(label)',
          },
        },
        {
          selector: 'edge',
          style: {
            width: 3,
            'line-color': '#4056a5',
            'target-arrow-color': '#4056a5',
            color: '#2d3c73',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            label: 'data(label)',
          },
        },
      ],

      layout: {
        name: 'cose-bilkent',
        quality: 'default',
        // Whether to include labels in node dimensions. Useful for avoiding label overlap
        nodeDimensionsIncludeLabels: true,
        // number of ticks per frame; higher is faster but more jerky
        refresh: 30,
        // Whether to fit the network view after when done
        fit: true,
        // Padding on fit
        padding: 50,
        // Whether to enable incremental mode
        randomize: true,
        // Node repulsion (non overlapping) multiplier
        nodeRepulsion: 8000,
        // Ideal (intra-graph) edge length
        idealEdgeLength: 120,
        // Divisor to compute edge forces
        edgeElasticity: 0.45,
        // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
        nestingFactor: 0.1,
        // Gravity force (constant)
        gravity: 0.1,
        // Maximum number of iterations to perform
        numIter: 2500,
        // Whether to tile disconnected nodes
        tile: true,
        // Type of layout animation. The option set is {'during', 'end', false}
        animate: 'end',
        // Duration for animate:end
        animationDuration: 500,
        // Amount of vertical space to put between degree zero nodes during tiling (can also be a function)
        tilingPaddingVertical: 10,
        // Amount of horizontal space to put between degree zero nodes during tiling (can also be a function)
        tilingPaddingHorizontal: 10,
        // Gravity range (constant) for compounds
        gravityRangeCompound: 1.5,
        // Gravity force (constant) for compounds
        gravityCompound: 1.0,
        // Gravity range (constant)
        gravityRange: 3.8,
        // Initial cooling factor for incremental layout
        initialEnergyOnIncremental: 0.5,
      } as never,
    });

    // The default values of each option are outlined below:
    const defaults = {
      menuRadius: function (ele: Singular) {
        console.log(ele);
        return 100;
      }, // Updated to use the more generic Singular type
      selector: 'node', // Elements matching this Cytoscape.js selector will trigger cxtmenus
      commands: [
        {
          fillColor: 'rgba(255, 111, 97, 0.7)', // Optional: custom background color for the item
          content: 'Expand', // HTML/text content to be displayed in the menu
          contentStyle: {}, // CSS key:value pairs to set the command's CSS in JS if you want
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
          content: 'Details', // HTML/text content to be displayed in the menu
          contentStyle: {}, // CSS key:value pairs to set the command's CSS in JS if you want
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
          content: 'Settings', // HTML/text content to be displayed in the menu
          contentStyle: {}, // CSS key:value pairs to set the command's CSS in JS if you want
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
      ],
      fillColor: 'rgba(0, 0, 0, 0.75)', // The background color of the menu
      activeFillColor: 'rgba(1, 105, 217, 0.75)', // The color used to indicate the selected command
      activePadding: 20, // Additional size in pixels for the active command
      indicatorSize: 24, // The size in pixels of the pointer to the active command
      separatorWidth: 3, // The empty spacing in pixels between successive commands
      spotlightPadding: 4, // Extra spacing in pixels between the element and the spotlight
      adaptativeNodeSpotlightRadius: false, // Specify whether the spotlight radius should adapt to the node size
      minSpotlightRadius: 24, // The minimum radius in pixels of the spotlight
      maxSpotlightRadius: 38, // The maximum radius in pixels of the spotlight
      openMenuEvents: 'cxttapstart taphold', // Events that will open the menu
      itemColor: 'white', // The color of text in the command's content
      itemTextShadowColor: 'transparent', // The text shadow color of the command's content
      zIndex: 9999, // The z-index of the UI div
      atMouse: false, // Draw menu at mouse position
      outsideMenuCancel: false as number | false | undefined, // Use the correct type
    };

    const menu = cy.cxtmenu(defaults);

    console.log(menu);
  }
}
