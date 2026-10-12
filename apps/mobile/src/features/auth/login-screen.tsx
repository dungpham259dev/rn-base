import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ApiError, useLogin } from "@rnbase/api";
import { useTranslation } from "@rnbase/i18n";
import { useSessionStore } from "@rnbase/store";

import { Button } from "~/components/button";
import { TextField } from "~/components/text-field";

export function LoginScreen() {
  const { t } = useTranslation();
  const signIn = useSessionStore((s) => s.signIn);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = useLogin(({ accessToken, ...user }) =>
    signIn(accessToken, user),
  );

  const errorMessage =
    login.error instanceof ApiError && login.error.kind !== "network"
      ? t("auth.invalid")
      : login.error && t("common.error");

  return (
    <SafeAreaView className="bg-background flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 justify-center gap-6 p-6"
      >
        <View className="gap-1">
          <Text className="text-foreground text-3xl font-bold">
            {t("auth.title")}
          </Text>
          <Text className="text-muted-foreground">{t("auth.subtitle")}</Text>
        </View>
        <View className="gap-4">
          <TextField
            label={t("auth.username")}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoComplete="username"
          />
          <TextField
            label={t("auth.password")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />
          {errorMessage && (
            <Text className="text-destructive">{errorMessage}</Text>
          )}
          <Button
            label={t("auth.submit")}
            loading={login.isPending}
            onPress={() => login.mutate({ username, password })}
          />
          <Text className="text-muted-foreground text-center text-sm">
            {t("auth.demoHint")}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
