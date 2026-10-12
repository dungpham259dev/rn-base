import type { TextInputProps } from "react-native";
import { Text, TextInput, View } from "react-native";

interface TextFieldProps extends TextInputProps {
  label: string;
}

export function TextField({ label, ...props }: TextFieldProps) {
  return (
    <View className="gap-1.5">
      <Text className="text-foreground text-sm font-medium">{label}</Text>
      <TextInput
        className="border-input bg-background text-foreground h-12 rounded-lg border px-3 text-base"
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  );
}
