import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  size: number;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  color,
  size,
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default IconButton;
