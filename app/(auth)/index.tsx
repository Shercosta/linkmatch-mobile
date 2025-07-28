import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { baseStyles } from "@/constants/BaseStyles";

const fakeUsers = [
    {
        username: 'sakuramiyawaki',
        name: 'Sakura Miyawaki',
        professional_title: 'Idol 1',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/20230630_Miyawaki_Sakura_%28LE_SSERAFIM%29.jpg/500px-20230630_Miyawaki_Sakura_%28LE_SSERAFIM%29.jpg',
    },
    {
        username: 'hong_eun_chae',
        name: 'Hong Eun-chae',
        professional_title: 'Idol 2',
        image_url: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTOwhNwY95mR95DyX2egndnqZFr4ju0RvEtDe9H007LA71pfRofzhrIn1HSy8g3gXMaY1yMAe4BRfS0U9OGnBD2KQ',
    },
]

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