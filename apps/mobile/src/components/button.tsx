import type { PressableProps } from "react-native";
import { ActivityIndicator, Pressable, Text } from "react-native";

type Variant = "primary" | "outline" | "destructive";

const containerClass: Record<Variant, string> = {
  primary: "bg-primary",
  outline: "border border-border bg-background",
  destructive: "bg-destructive",
};

const labelClass: Record<Variant, string> = {
  primary: "text-primary-foreground",
  outline: "text-foreground",
  destructive: "text-destructive-foreground",
};

interface ButtonProps extends Omit<PressableProps, "children"> {
  label: string;
  variant?: Variant;
  loading?: boolean;
}

export function Button({
  label,
  variant = "primary",
  loading,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled ?? loading;
  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={`h-12 flex-row items-center justify-center rounded-lg px-4 active:opacity-80 ${containerClass[variant]} ${isDisabled ? "opacity-50" : ""}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text className={`text-base font-semibold ${labelClass[variant]}`}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
