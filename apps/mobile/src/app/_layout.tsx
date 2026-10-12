import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useSessionStore } from "@rnbase/store";

import { LoadingView } from "~/components/state-views";
import { AppProviders } from "~/core/providers";

import "../styles.css";

function RootNavigator() {
  const hydrated = useSessionStore((s) => s.hydrated);
  const signedIn = useSessionStore((s) => s.token !== null);

  if (!hydrated) return <LoadingView />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={signedIn}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!signedIn}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigator />
      <StatusBar style="auto" />
    </AppProviders>
  );
}
