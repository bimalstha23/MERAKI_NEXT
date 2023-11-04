import DesktopNav from "./components/DesktopNav"

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            <section className="flex flex-row container mx-auto mt-40 gap-24">
                <DesktopNav />
                {children}
            </section>
        </main>
    )
}