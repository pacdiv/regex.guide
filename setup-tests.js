import "@testing-library/jest-dom/extend-expect"

global.json = JSON.stringify
global.document.execCommand = arg => arg
