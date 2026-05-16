import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ReceiptScreen from "./src/ReceiptScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#070707" />
      <ReceiptScreen />
    </SafeAreaProvider>
  );
}
