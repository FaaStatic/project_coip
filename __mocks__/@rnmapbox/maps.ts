import { jest } from '@jest/globals';

const Mapbox = {
  // Mock methods and properties as needed
  setAccessToken: jest.fn(),
  MapView: jest.fn(() => null), // Mock component rendering
};

export default Mapbox;
