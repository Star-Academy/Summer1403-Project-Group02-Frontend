export const cytoStyles = [
  {
    selector: 'node',
    style: {
      // Text Styles
      label: 'data(label)',
      'font-family': 'Roboto, Arial',
      'font-size': '12px',
      'line-height': 1.2,
      'text-valign': 'center',
      'text-halign': 'center',
      'text-overflow-wrap': 'whitespace',
      'text-wrap': 'wrap',
      'text-max-width': '10ch',
      'text-justification': 'center',
      color: '#fff',

      // Size & Shape
      width: 70,
      height: 70,
      shape: 'ellipse',

      // Colors
      'background-color': '#116DFF',

      // Positioning & Layout
      'padding-top': '12px',
      'padding-left': '12px',
      'padding-right': '12px',
      'padding-bottom': '12px',
      'text-background-padding': '1px',
      'overlay-opacity': 0,
    },
  },
  {
    selector: 'edge',
    style: {
      // Text Styles
      label: 'data(label)',
      'font-family': 'Roboto',
      'font-size': '10px',
      'font-weight': '400',
      color: '#131720',
      'text-background-padding': '3px',
      'text-background-shape': 'roundrectangle',
      'text-halign': 'center',
      'text-valign': 'top',
      'text-rotation': 'autorotate',
      'text-background-color': '#FFD527',
      'text-background-opacity': 0.7,
      'text-border-width': '1px',
      'text-border-opacity': 0.1,

      // Size & Shape
      width: 2.5,
      'target-arrow-shape': 'triangle-backcurve',
      'arrow-scale': 1.8,

      // Colors
      'line-color': '#FFD527',
      'target-arrow-color': '#FFD527',

      // Positioning & Layout
      'curve-style': 'bezier',
      'source-distance-from-node': '4px',
      'target-distance-from-node': '4px',
    },
  },
] as cytoscape.Stylesheet[];
