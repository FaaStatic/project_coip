import { ExpoRoot } from 'expo-router';
import { enableScreens } from 'react-native-screens';
const App = () => {
  enableScreens(false);
  const ctx = require.context('./app');

  return <ExpoRoot context={ctx} />;
};

export default App;
