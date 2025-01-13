const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addComponents, theme }) {
  // Add base button styles
  addComponents({
    '.btn': {
      display: 'inline-block',
      cursor: 'pointer',
      fontWeight: 'bold',
      padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
      borderRadius: theme('borderRadius.lg'),
    },
  });

  // Generate dynamic button color classes
  const buttonColorClasses = {};
  for (const colorName in theme('colors')) {
    const colorValue = theme('colors')[colorName];

    // Handle color shades
    if (typeof colorValue === 'object') {
      for (const shadeName in colorValue) {
        const shadeValue = colorValue[shadeName];
        buttonColorClasses[`.btn-${colorName}-${shadeName}`] = {
          backgroundColor: shadeValue,
          color: isDarkColor(shadeValue) ? 'white' : 'black',
        };
      }
    } else {
      // Handle single color values
      buttonColorClasses[`.btn-${colorName}`] = {
        backgroundColor: colorValue,
        color: isDarkColor(colorName) ? 'white' : 'black',
      };
    }
  }

  addComponents(buttonColorClasses);

  // Improved dark color detection
  function isDarkColor(colorName) {
    // Check if the color name ends with a high number, indicating a dark color
    return colorName.endsWith('900') || colorName.endsWith('800') || colorName.endsWith('700');
  }

  // Helper function to convert hex color to RGB
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
});
