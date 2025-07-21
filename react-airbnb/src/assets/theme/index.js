const lightTheme = {
  color: {
    primaryColor: "var(--primary-color)",
  },

  theme: {
    boxShadow: `
      transition: all 0.3s ease;
      &: hover{
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    `,
  }
};

export { lightTheme };