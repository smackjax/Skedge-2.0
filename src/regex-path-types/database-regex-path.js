// Firebase technically allows more, but this is easier
const validDataBasePath = /^[a-zA-Z0-9-_]+$/;

// Tests whether string is valid database path
export default (stringToTest)=>validDataBasePath.test(stringToTest);
    