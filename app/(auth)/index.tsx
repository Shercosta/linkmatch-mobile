import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { baseStyles } from "@/constants/BaseStyles";

export default function Profile() {
    return (
        <ThemedView style={baseStyles.container}>
            <ThemedView style={baseStyles.headerContainer}>
                <ThemedText>
                    Profile
                </ThemedText>
            </ThemedView>
        </ThemedView>
    )
}