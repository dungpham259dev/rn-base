import { Pressable, Text, View } from "react-native";

interface Option<T extends string> {
  value: T;
  label: string;
}

interface OptionGroupProps<T extends string> {
  title: string;
  options: Option<T>[];
  selected: T;
  onSelect: (value: T) => void;
}

export function OptionGroup<T extends string>({
  title,
  options,
  selected,
  onSelect,
}: OptionGroupProps<T>) {
  return (
    <View className="gap-2">
      <Text className="text-muted-foreground text-sm font-medium uppercase">
        {title}
      </Text>
      <View className="bg-card border-border overflow-hidden rounded-xl border">
        {options.map((option) => (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ selected: option.value === selected }}
            onPress={() => onSelect(option.value)}
            className="border-border flex-row items-center justify-between border-b px-4 py-3 last:border-b-0 active:opacity-70"
          >
            <Text className="text-card-foreground">{option.label}</Text>
            {option.value === selected && (
              <Text className="text-primary font-bold">✓</Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}
