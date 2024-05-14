import { Container } from "../index.js"
import { FadeIn } from "../index.js"

export const Usps = () => {
    return (
    <Container className="text-3xl md:text-4xl font-bold space-y-12 max-w-[692px] py-36 z-10 relative text-textBlack dark:text-white">
        <FadeIn>Seamlessly upload and share your videos with the world.</FadeIn>
        <FadeIn>Discover and subscribe to a diverse range of channels and creators.</FadeIn>
        <FadeIn>Create personalized playlists tailored to your unique tastes.</FadeIn>
        <FadeIn>Engage with the community through likes, comments, and social sharing</FadeIn>
    </Container>
    )
}